import React, { useState } from 'react';
import { CreditCard, User, MapPin, Hash, ShieldCheck, Upload, Trash2, CheckCircle, X } from 'lucide-react';
import { supabase } from '../../../supabase';
import { storage } from '../../../firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MemberCardModal from './MemberCardModal';

const CardGenerator = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        district: 'Chennai',
        membership_type: 'member',
        phone: '+91 ',
        membership_id: `TMC-TN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        photo_url: ''
    });

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus('Saving card data...');

        try {
            let uploadedPhotoUrl = formData.photo_url;

            // 1. Upload Photo to Firebase Storage if selected
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const storageRef = ref(storage, `member-photos/${fileName}`);

                // Upload the file
                await uploadBytes(storageRef, file);

                // Get the download URL
                uploadedPhotoUrl = await getDownloadURL(storageRef);
            }

            // 2. Save to card_holders table
            const cardData = {
                ...formData,
                photo_url: uploadedPhotoUrl,
                created_at: new Date().toISOString()
            };

            const { error: dbError } = await supabase
                .from('card_holders')
                .insert([cardData]);

            if (dbError) throw dbError;

            setFormData(prev => ({ ...prev, photo_url: uploadedPhotoUrl }));
            setSaveStatus('Card generated and saved successfully!');
            setTimeout(() => {
                setShowPreview(true);
                setIsSaving(false);
                setSaveStatus(null);
            }, 1000);

        } catch (error) {
            console.error('Error saving card:', error);
            setSaveStatus(`Error: ${error.message}`);
            setIsSaving(false);
        }
    };

    return (
        <div className="card-generator-section">
            <div className="admin-actions-bar">
                <h2 style={{ margin: 0, color: '#138808' }}>Member Card Center</h2>
                <p style={{ margin: 0, color: '#666' }}>Generate & Store premium ID cards for TMC members</p>
            </div>

            <div className="card-gen-container">
                <form className="admin-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className="card-gen-grid">
                        {/* Photo Upload Area */}
                        <div className="photo-upload-wrapper" style={{ minWidth: 0 }}>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', color: '#138808', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Member Photo</label>
                            <div
                                className="photo-upload-container"
                                style={{
                                    padding: '15px',
                                    backgroundColor: '#f9fbf9',
                                    borderRadius: '12px',
                                    border: '2px dashed #13880866',
                                    textAlign: 'center',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                }}
                            >
                                <label style={{ cursor: 'pointer', display: 'block' }}>
                                    {previewUrl ? (
                                        <div style={{ position: 'relative' }}>
                                            <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#ee4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', zIndex: 10 }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ padding: '20px 10px' }}>
                                            <div style={{ width: '45px', height: '45px', backgroundColor: '#13880811', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                                <Upload size={22} color="#138808" />
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#444', fontWeight: '600' }}>Drop photo here</p>
                                            <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: '#888' }}>or click to browse</p>
                                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                        </div>
                                    )}
                                </label>
                            </div>
                            {previewUrl && <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '0.85rem', color: '#138808', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <CheckCircle size={14} /> Photo ready
                            </p>}
                        </div>

                        {/* Details Area */}
                        <div className="details-grid-layout">
                            <div className="admin-form-group">
                                <label><User size={14} color="#138808" /> First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Mamata"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label><User size={14} color="#138808" /> Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Banerjee"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label><MapPin size={14} color="#138808" /> District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label><ShieldCheck size={14} color="#138808" /> Designation</label>
                                <select
                                    name="membership_type"
                                    value={formData.membership_type}
                                    onChange={handleChange}
                                >
                                    <option value="member">Member</option>
                                    <option value="volunteer">Volunteer</option>
                                    <option value="youth-wing">Youth Wing</option>
                                    <option value="it-wing">IT Wing</option>
                                    <option value="women-wing">Women's Wing</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label><Hash size={14} color="#138808" /> Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 XXXX XXXX"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label><CreditCard size={14} color="#138808" /> ID</label>
                                <input
                                    type="text"
                                    name="membership_id"
                                    value={formData.membership_id}
                                    readOnly
                                    style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold', color: '#138808' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-footer" style={{ marginTop: '25px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
                        <button type="submit" className="admin-submit-btn" disabled={isSaving} style={{ padding: '12px 30px', fontSize: '1rem', background: 'linear-gradient(to right, #138808, #0a6e04)', boxShadow: '0 4px 12px rgba(19, 136, 8, 0.2)' }}>
                            {isSaving ? 'Saving...' : (
                                <>
                                    <ShieldCheck size={18} style={{ marginRight: '8px' }} />
                                    Generate ID Card
                                </>
                            )}
                        </button>
                        {saveStatus && <div style={{
                            padding: '8px 15px',
                            borderRadius: '6px',
                            backgroundColor: saveStatus.includes('Error') ? '#fff5f5' : '#f0fff4',
                            borderLeft: `4px solid ${saveStatus.includes('Error') ? '#ee4444' : '#138808'}`,
                            color: saveStatus.includes('Error') ? '#c53030' : '#22543d',
                            fontWeight: '600',
                            fontSize: '0.85rem'
                        }}>{saveStatus}</div>}
                    </div>
                </form>
            </div>

            {showPreview && (
                <MemberCardModal
                    member={{
                        ...formData,
                        id: formData.membership_id, // Pass membership_id as id for the modal display
                        created_at: new Date().toISOString()
                    }}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
};

export default CardGenerator;
