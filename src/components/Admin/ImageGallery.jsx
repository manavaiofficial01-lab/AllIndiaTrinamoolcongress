
import React, { useState, useEffect } from 'react'
import { storage } from '../../../firebase.config'
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Trash2, Copy, Upload, RefreshCw } from 'lucide-react'

const ImageGallery = () => {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [status, setStatus] = useState({ type: '', msg: '' })

    const fetchImages = async () => {
        setLoading(true)
        try {
            const listRef = ref(storage, 'tmc/')
            const res = await listAll(listRef)

            const imagePromises = res.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef)
                return {
                    name: itemRef.name,
                    fullPath: itemRef.fullPath,
                    url: url,
                    ref: itemRef
                }
            })

            const imageList = await Promise.all(imagePromises)
            setImages(imageList)
        } catch (err) {
            console.error('Error fetching images:', err)
            setStatus({ type: 'error', msg: 'Failed to load images.' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        setStatus({ type: '', msg: '' })

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `tmc/${uuidv4()}.${fileExt}`
            const storageRef = ref(storage, fileName)

            await uploadBytes(storageRef, file)
            setStatus({ type: 'success', msg: 'Image uploaded successfully!' })
            fetchImages() // Refresh list
        } catch (err) {
            console.error('Upload failed:', err)
            setStatus({ type: 'error', msg: `Upload failed: ${err.message}` })
        } finally {
            setUploading(false)
            e.target.value = null // Reset input
        }
    }

    const handleDelete = async (image) => {
        if (!window.confirm('Are you sure you want to delete this image? This cannot be undone.')) return

        try {
            await deleteObject(image.ref)
            setImages(prev => prev.filter(img => img.fullPath !== image.fullPath))
            setStatus({ type: 'success', msg: 'Image deleted.' })
        } catch (err) {
            console.error('Delete failed:', err)
            setStatus({ type: 'error', msg: 'Delete failed.' })
        }
    }

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url)
        setStatus({ type: 'success', msg: 'URL copied to clipboard!' })
        setTimeout(() => setStatus({ type: '', msg: '' }), 2000)
    }

    return (
        <div className="image-gallery-container">
            <div className="gallery-actions">
                <div className="upload-btn-wrapper">
                    <button className="btn-upload" disabled={uploading}>
                        <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload New Image'}
                    </button>
                    <input type="file" onChange={handleUpload} accept="image/*" disabled={uploading} />
                </div>
                <button className="btn-refresh" onClick={fetchImages}>
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>

            {status.msg && (
                <div className={`status-msg ${status.type === 'error' ? 'error-message' : 'success-message'}`}
                    style={{ color: status.type === 'success' ? '#138808' : '#c62828', marginBottom: '1rem', padding: '0.5rem', background: status.type === 'success' ? '#e8f5e9' : '#ffebee', borderRadius: '4px' }}>
                    {status.msg}
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading images...</div>
            ) : images.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>No images found. Upload one to get started.</div>
            ) : (
                <div className="gallery-grid">
                    {images.map((img) => (
                        <div key={img.fullPath} className="gallery-item">
                            <div className="img-wrapper">
                                <img src={img.url} alt={img.name} loading="lazy" />
                            </div>
                            <div className="img-actions">
                                <button
                                    onClick={() => copyToClipboard(img.url)}
                                    title="Copy URL"
                                    className="action-btn copy"
                                >
                                    <Copy size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(img)}
                                    title="Delete"
                                    className="action-btn delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="img-name" title={img.name}>{img.name.substring(0, 20)}...</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageGallery
