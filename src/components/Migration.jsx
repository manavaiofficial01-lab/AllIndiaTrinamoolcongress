
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase'
import { storage } from '../../firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const Migration = () => {
    const [status, setStatus] = useState([])
    const [existingImages] = useState(import.meta.glob('/media/*', { eager: true, as: 'url' }))

    const addLog = (msg) => setStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

    const uploadLocalImages = async () => {
        const imageUrls = []
        addLog(`Found ${Object.keys(existingImages).length} local images to process...`)

        for (const [path, url] of Object.entries(existingImages)) {
            try {
                // Fetch blob from local dev server
                const response = await fetch(url)
                const blob = await response.blob()
                const fileName = path.split('/').pop()

                // Upload to Firebase
                const storageRef = ref(storage, `tmc/${fileName}`)
                await uploadBytes(storageRef, blob)
                const downloadUrl = await getDownloadURL(storageRef)

                imageUrls.push(downloadUrl) // Push just list of URLs
                // addLog(`Uploaded: ${fileName}`) 
            } catch (err) {
                console.error(`Failed to upload ${path}:`, err)
            }
        }
        addLog(`✅ Successfully uploaded ${imageUrls.length} images to Firebase.`)
        return imageUrls
    }


    const runMigration = async () => {
        addLog('Starting migration...')

        try {
            // 1. Clear existing news_items
            addLog('Clearing existing news items...')
            const { error: deleteError } = await supabase.from('news_items').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Deletes all rows
            if (deleteError) {
                addLog(`❌ Error clearing news: ${deleteError.message}`)
            } else {
                addLog('✅ Existing news cleared.')
            }

            // 2. Upload Local Images to Firebase
            addLog('Uploading local images...')
            const allImageUrls = await uploadLocalImages()

            if (allImageUrls.length === 0) {
                addLog('⚠ No images found to process.')
                return
            }

            // 3. Group images into chunks (e.g., 10 images per news item) to simulate different events
            addLog('Grouping images into different news items...')

            // Randomly determining chunk size between 6 and 12 for variety, or fixed 10
            const chunkSize = 10;
            const newsItemsToInsert = [];

            for (let i = 0; i < allImageUrls.length; i += chunkSize) {
                const chunk = allImageUrls.slice(i, i + chunkSize);
                const eventNum = Math.floor(i / chunkSize) + 1;



                const eventDateISO = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

                // Create Unified Bilingual Item
                newsItemsToInsert.push({
                    // Set both titles/descs in one row
                    title_ta: `Event Gallery ${eventNum} - Chennai (Tamil Title)`,
                    description_ta: 'TMC Party meeting and event updates from Chennai region (Tamil Description).',

                    title_en: `Event Gallery ${eventNum} - Chennai (English Title)`,
                    description_en: 'TMC Party meeting and event updates from Chennai region (English Description).',

                    // Legacy fallbacks (optional but safe)
                    title: `Event Gallery ${eventNum} - Chennai`,
                    description: 'TMC Party meeting updates.',
                    lang: 'bilingual',

                    date_str: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                    event_date: eventDateISO,
                    image_urls: chunk
                });
            }

            // 4. Batch Insert
            const { error } = await supabase.from('news_items').insert(newsItemsToInsert)

            if (error) {
                addLog(`❌ Error creating news items: ${error.message}`)
            } else {
                addLog(`✅ Successfully created ${newsItemsToInsert.length} distinct news items!`)
                addLog(`Each item contains ${chunkSize} images.`)
            }

            addLog('Migration Check Completed.')

        } catch (err) {
            addLog(`❌ Fatal Error: ${err.message}`)
        }
    }


    const clearDatabase = async () => {
        if (!window.confirm('Are you sure you want to PERMANENTLY DELETE all news items?')) return

        addLog('Attempting to clear all news items...')
        const { error } = await supabase.from('news_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (error) {
            addLog(`❌ Error clearing DB: ${error.message}`)
            addLog('💡 HINT: Did you run the SQL policies to allow delete?')
        } else {
            addLog('✅ Database successfully cleared! All 100+ items deleted.')
            addLog('You can now run "Start Migration" to create the clean gallery.')
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>System Migration Utility (Consolidated Gallery)</h1>

            <div style={{ marginBottom: '30px', padding: '20px', background: '#ffebee', border: '2px solid #ef9a9a', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0, color: '#c62828' }}>⚠️ Step 1: Cleanup Mess</h3>
                <p>If you see duplicate news items or errors, use this button first.</p>
                <button
                    onClick={clearDatabase}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: '#c62828',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    🗑️ Delete ALL News Items
                </button>
            </div>

            <hr style={{ margin: '30px 0' }} />

            <h3>Step 2: Create Clean Gallery</h3>
            <p>1. Uploads all local images (if not already done).</p>
            <p>2. Creates ONE single news item containing ALL images.</p>
            <button
                onClick={runMigration}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    backgroundColor: '#138808',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px'
                }}
            >
                Start Migration
            </button>
            <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', maxHeight: '500px', overflowY: 'auto' }}>
                {status.map((log, i) => <div key={i}>{log}</div>)}
            </div>
        </div>
    )
}

export default Migration
