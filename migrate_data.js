
import { content } from './src/data/content.js'
import { supabase } from './supabase.js'

// import { storage } from './firebase.config.js'
// import { ref, uploadString } from 'firebase/storage'

async function migrate() {
    console.log('Starting migration...')

    try {

        // 1. Upload JSON to Firebase Storage
        console.log('Skipping Firebase Storage upload (requires browser environment or admin SDK)')
        /*
        const storageRef = ref(storage, 'tmc/data.json')
        const jsonString = JSON.stringify(content, null, 2)
        try {
            await uploadString(storageRef, jsonString)
            console.log('✅ Data uploaded to Firebase Storage: tmc/data.json')
        } catch (firebaseError) {
            console.error('❌ Firebase upload failed:', firebaseError.message)
        }
        */


        // 2. Insert into Supabase
        console.log('Inserting data into Supabase...')

        for (const lang of ['ta', 'en']) {
            const data = content[lang]
            console.log(`Processing language: ${lang}`)

            // 2a. Static Sections
            const staticSections = ['nav', 'hero', 'stats', 'about', 'join', 'contact']
            for (const section of staticSections) {
                if (data[section]) {
                    const { error } = await supabase
                        .from('site_metadata')
                        .insert({
                            section,
                            lang,
                            content: data[section] // Storing the whole object/array as jsonb
                        })

                    if (error) console.error(`Error inserting ${section} (${lang}):`, error.message)
                    else console.log(`Inserted ${section} (${lang})`)
                }
            }

            // 2b. Leaders
            if (data.leadership) {
                // leadership title/subtitle -> static
                const { error: metaError } = await supabase
                    .from('site_metadata')
                    .insert({
                        section: 'leadership_meta',
                        lang,
                        content: { title: data.leadership.title, subtitle: data.leadership.subtitle }
                    })
                if (metaError) console.error(`Error inserting leadership_meta (${lang}):`, metaError.message)

                // leaders list
                if (data.leadership.leaders) {
                    const leadersData = data.leadership.leaders.map(l => ({
                        lang,
                        name: l.name,
                        role: l.role,
                        bio: l.bio,
                        experience: l.experience,
                        district: l.district
                    }))
                    const { error: listError } = await supabase.from('leaders').insert(leadersData)
                    if (listError) console.error(`Error inserting leaders (${lang}):`, listError.message)
                    else console.log(`Inserted leaders (${lang})`)
                }
            }

            // 2c. Vision
            if (data.vision) {
                // vision title/subtitle -> static
                const { error: metaError } = await supabase
                    .from('site_metadata')
                    .insert({
                        section: 'vision_meta',
                        lang,
                        content: { title: data.vision.title, subtitle: data.vision.subtitle }
                    })

                // pillars
                if (data.vision.pillars) {
                    const pillarsData = data.vision.pillars.map(p => ({
                        lang,
                        icon: p.icon,
                        title: p.title,
                        description: p.desc,
                        goals: p.goals // jsonb
                    }))
                    const { error: listError } = await supabase.from('vision_pillars').insert(pillarsData)
                    if (listError) console.error(`Error inserting vision_pillars (${lang}):`, listError.message)
                    else console.log(`Inserted vision pillars (${lang})`)
                }
            }

            // 2d. Initiatives
            if (data.initiatives) {
                // meta
                const { error: metaError } = await supabase
                    .from('site_metadata')
                    .insert({
                        section: 'initiatives_meta',
                        lang,
                        content: { title: data.initiatives.title }
                    })

                // list
                if (data.initiatives.list) {
                    const initData = data.initiatives.list.map(i => ({
                        lang,
                        title: i.title,
                        description: i.desc
                    }))
                    const { error: listError } = await supabase.from('initiatives').insert(initData)
                    if (listError) console.error(`Error inserting initiatives (${lang}):`, listError.message)
                    else console.log(`Inserted initiatives (${lang})`)
                }
            }

            // 2e. News
            if (data.news) {
                // meta
                const { error: metaError } = await supabase
                    .from('site_metadata')
                    .insert({
                        section: 'news_meta',
                        lang,
                        content: { title: data.news.title }
                    })

                // items
                if (data.news.items) {
                    const newsData = data.news.items.map(n => ({
                        lang,
                        date_str: n.date,
                        title: n.title,
                        description: n.desc
                    }))
                    const { error: listError } = await supabase.from('news_items').insert(newsData)
                    if (listError) console.error(`Error inserting news (${lang}):`, listError.message)
                    else console.log(`Inserted news (${lang})`)
                }
            }
        }

        console.log('Migration completed!')

    } catch (err) {
        console.error('Migration failed:', err)
    }
}

migrate()
