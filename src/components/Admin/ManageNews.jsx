
import React, { useState, useEffect } from 'react'
import { supabase } from '../../../supabase'
import { storage } from '../../../firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Edit2, Trash2, X, Plus, Calendar } from 'lucide-react'

const ManageNews = () => {
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)

    const [formData, setFormData] = useState({
        // Common
        event_date: new Date().toISOString().split('T')[0],
        image_urls: [],

        // English
        title_en: '',
        description_en: '',

        // Tamil
        title_ta: '',
        description_ta: ''
    })
    const [files, setFiles] = useState([])
    const [status, setStatus] = useState({ type: '', msg: '' })

    // Fetch news on mount
    const fetchNews = async () => {
        setFetchLoading(true)
        const { data, error } = await supabase
            .from('news_items')
            .select('*')
            .order('event_date', { ascending: false })
            .order('created_at', { ascending: false })

        if (data) setNewsList(data)
        setFetchLoading(false)
    }

    useEffect(() => {
        fetchNews()
    }, [])

    const handleEdit = (news) => {
        setEditingId(news.id)

        // Smart populate: Use specific columns if they exist, otherwise fallback to legacy title/desc based on lang
        const isTa = news.lang === 'ta';
        const isEn = news.lang === 'en';

        setFormData({
            event_date: news.event_date || (news.date_str ? parseDateStr(news.date_str) : new Date().toISOString().split('T')[0]),
            image_urls: news.image_urls || (news.image_url ? [news.image_url] : []),

            title_en: news.title_en || (isEn ? news.title : ''),
            description_en: news.description_en || (isEn ? news.description : ''),

            title_ta: news.title_ta || (isTa ? news.title : ''),
            description_ta: news.description_ta || (isTa ? news.description : '')
        })
        setFiles([])
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Helper to try parsing old string dates if needed
    const parseDateStr = (str) => {
        // Very basic attempt, otherwise return today
        // Assuming user might have typed various things, safest is just leaving it or defaulting if empty
        return new Date().toISOString().split('T')[0]
    }

    const handleCancel = () => {
        setEditingId(null)
        setFormData({
            event_date: new Date().toISOString().split('T')[0],
            image_urls: [],
            title_en: '',
            description_en: '',
            title_ta: '',
            description_ta: ''
        })
        setFiles([])
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this news item?')) return

        const { error } = await supabase.from('news_items').delete().eq('id', id)
        if (!error) {
            setNewsList(prev => prev.filter(n => n.id !== id))
        }
    }

    const handleFilesChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', msg: '' })

        try {
            let newImageUrls = [...formData.image_urls]

            // 1. Upload new Images if selected
            if (files.length > 0) {
                const uploadPromises = files.map(async (file) => {
                    const fileExt = file.name.split('.').pop()
                    const fileName = `tmc/${uuidv4()}.${fileExt}`
                    const storageRef = ref(storage, fileName)
                    const snapshot = await uploadBytes(storageRef, file)
                    return await getDownloadURL(snapshot.ref)
                })
                const uploadedUrls = await Promise.all(uploadPromises)
                newImageUrls = [...newImageUrls, ...uploadedUrls]
            }

            // Create formatted date string for legacy display compatibility (e.g. "12 Jan 2024")
            const dateObj = new Date(formData.event_date);
            const formattedDateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

            const payload = {
                event_date: formData.event_date,
                date_str: formattedDateStr,
                image_urls: newImageUrls,
                // Removed image_url, title, description, lang legacy columns to prevent schema errors

                // New Fields
                title_en: formData.title_en,
                description_en: formData.description_en,
                title_ta: formData.title_ta,
                description_ta: formData.description_ta,
            }

            if (editingId) {
                // Update
                const { error } = await supabase
                    .from('news_items')
                    .update(payload)
                    .eq('id', editingId)
                if (error) throw error
                setStatus({ type: 'success', msg: 'News updated successfully!' })
            } else {
                // Create
                const { error } = await supabase
                    .from('news_items')
                    .insert(payload)
                if (error) throw error
                setStatus({ type: 'success', msg: 'News added successfully!' })
            }

            // Reset
            setFormData({
                event_date: new Date().toISOString().split('T')[0],
                image_urls: [],
                title_en: '',
                description_en: '',
                title_ta: '',
                description_ta: ''
            })
            setFiles([])
            setEditingId(null)
            fetchNews() // Refresh list

        } catch (err) {
            console.error(err)
            setStatus({ type: 'error', msg: `Error: ${err.message}` })
        } finally {
            setLoading(false)
        }
    }

    const removeExistingImage = (urlToRemove) => {
        setFormData(prev => ({
            ...prev,
            image_urls: prev.image_urls.filter(url => url !== urlToRemove)
        }))
    }

    return (
        <div>
            {/* Form Section */}
            <div className="admin-form">
                <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{editingId ? 'Edit News Item (Bilingual)' : 'Add News Item (Bilingual)'}</h2>
                    {editingId && <button onClick={handleCancel} style={{ padding: '8px 16px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel Edit</button>}
                </div>

                {status.msg && (
                    <div className={`status-msg ${status.type === 'error' ? 'error-message' : ''}`} style={{
                        color: status.type === 'success' ? '#138808' : '#c62828',
                        marginBottom: '1rem',
                        padding: '12px',
                        backgroundColor: status.type === 'success' ? '#e8f5e9' : '#ffebee',
                        borderRadius: '6px',
                        border: `1px solid ${status.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
                    }}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Common Data */}
                    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                        <h4 style={{ marginTop: 0, color: '#555' }}>1. Common Details / பொதுவானவை</h4>
                        <div className="form-group">
                            <label className="form-label">Event Date / தேதி</label>
                            <input
                                type="date"
                                value={formData.event_date}
                                onChange={e => setFormData({ ...formData, event_date: e.target.value })}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-upload-section" style={{ marginTop: '10px' }}>
                            <label className="form-label">Images / படங்கள் (Common for both)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFilesChange}
                                className="form-file-input"
                            />
                            <div className="preview-grid">
                                {formData.image_urls.map((url, idx) => (
                                    <div key={idx} className="preview-item">
                                        <img src={url} alt="existing" />
                                        <button type="button" onClick={() => removeExistingImage(url)} className="btn-remove-img">×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="file-status">
                                {files.length > 0 ? `✅ ${files.length} new files selected.` : ''}
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-grid" style={{ gap: '40px' }}>
                        {/* English Section */}
                        <div style={{ paddingRight: '20px', borderRight: '1px solid #eee' }}>
                            <h4 style={{ color: '#138808' }}>2. English Content</h4>
                            <div className="form-group form-group-spaced">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    value={formData.title_en}
                                    placeholder="English Title..."
                                    onChange={e => setFormData({ ...formData, title_en: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group form-group-spaced">
                                <label className="form-label">Description</label>
                                <textarea
                                    value={formData.description_en}
                                    placeholder="English Description..."
                                    onChange={e => setFormData({ ...formData, description_en: e.target.value })}
                                    className="form-textarea"
                                    rows={5}
                                />
                            </div>
                        </div>

                        {/* Tamil Section */}
                        <div>
                            <h4 style={{ color: '#f57f17' }}>3. தமிழ் உள்ளடக்கம்</h4>
                            <div className="form-group form-group-spaced">
                                <label className="form-label">தலைப்பு (Title in Tamil)</label>
                                <input
                                    type="text"
                                    value={formData.title_ta}
                                    placeholder="தமிழ் தலைப்பு..."
                                    onChange={e => setFormData({ ...formData, title_ta: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group form-group-spaced">
                                <label className="form-label">விளக்கம் (Description in Tamil)</label>
                                <textarea
                                    value={formData.description_ta}
                                    placeholder="தமிழ் விளக்கம்..."
                                    onChange={e => setFormData({ ...formData, description_ta: e.target.value })}
                                    className="form-textarea"
                                    rows={5}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn primary">
                        {loading ? (editingId ? 'Updating...' : 'Publishing...') : (editingId ? 'Update News Item' : 'Publish News Item')}
                    </button>
                </form>
            </div>

            {/* List Section */}
            <div className="news-list-section">
                <h3 className="section-title">Manage Existing News</h3>
                {fetchLoading ? (
                    <p className="loading-text">Loading news items...</p>
                ) : (
                    <div className="news-list-container">
                        {newsList.map(news => (
                            <div key={news.id} className="news-item-card">
                                <div className="news-item-content">
                                    {/* Thumbnail Stack */}
                                    <div className="news-item-thumbs">
                                        {(news.image_urls || [news.image_url]).slice(0, 3).map((url, i) => (
                                            <img
                                                key={i}
                                                src={url || 'https://via.placeholder.com/150'}
                                                alt="thumb"
                                                className={`thumb-img stack-${i}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="news-item-details">
                                        <div className="news-meta-badges">
                                            {/* Show badge based on available content */}
                                            {news.title_ta && <span className="lang-badge ta">TA</span>}
                                            {news.title_en && <span className="lang-badge en">EN</span>}
                                            {!news.title_ta && !news.title_en && <span className="lang-badge">{news.lang || '?'}</span>}

                                            <span className="date-badge">
                                                <Calendar size={14} /> {news.event_date || news.date_str}
                                            </span>
                                        </div>

                                        {/* Display titles intelligently */}
                                        <h4 className="news-item-title">
                                            {news.title_en && <div>🇬🇧 {news.title_en}</div>}
                                            {news.title_ta && <div style={{ fontSize: '0.9em', color: '#666' }}>🇮🇳 {news.title_ta}</div>}
                                            {!news.title_en && !news.title_ta && news.title}
                                        </h4>
                                        <p className="news-item-desc">
                                            {news.description_en || news.description_ta || news.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="news-item-actions">
                                    <button
                                        onClick={() => handleEdit(news)}
                                        className="action-btn edit"
                                        title="Edit"
                                        aria-label="Edit"
                                    >
                                        <Edit2 size={18} /> <span className="btn-text">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(news.id)}
                                        className="action-btn delete"
                                        title="Delete"
                                        aria-label="Delete"
                                    >
                                        <Trash2 size={18} /> <span className="btn-text">Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {newsList.length === 0 && <p className="empty-text">No news items found. Add one above!</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageNews
