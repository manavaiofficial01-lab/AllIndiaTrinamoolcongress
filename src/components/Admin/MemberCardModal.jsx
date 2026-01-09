import React from 'react';
import { Download, X } from 'lucide-react';
import './IdCard.css';

const MemberCardModal = ({ member, onClose }) => {
    if (!member) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="id-card-modal">
            <div className="id-card-container">
                <div className="tmc-id-card" id="member-id-card">
                    {/* Security Watermark */}
                    <div className="card-watermark">AITC</div>

                    {/* Header Banner */}
                    <div className="card-banner">
                        <div className="banner-left">
                            <div className="leader-circle" style={{ zIndex: 4 }}>
                                <img src="/card/Official_portrait_of_Mamata_Banerjee.jpg" alt="Mamata Banerjee" />
                            </div>
                            <div className="leader-circle" style={{ zIndex: 3 }}>
                                <img src="/card/Abhishek_Banerjee-removebg-preview-1.png" alt="Abhishek Banerjee" />
                            </div>
                        </div>
                        <div className="banner-center">
                            <h2 className="party-name-main">அகில இந்திய திரிணமூல் காங்கிரஸ்</h2>
                            <small style={{ color: 'white', display: 'block', opacity: 0.9, fontWeight: '600', fontSize: '10px', marginTop: '1px' }}>ALL INDIA TRINAMOOL CONGRESS - TAMIL NADU UNIT</small>
                        </div>
                        <div className="banner-right">
                            <img src="/logo.png" className="party-logo-small" alt="TMC Logo" />
                        </div>
                    </div>

                    <div className="card-content-wrapper">
                        {/* Member Side */}
                        <div className="member-side">
                            <div className="member-photo-frame">
                                <img
                                    src={member.photo_url || `https://ui-avatars.com/api/?name=${member.first_name}+${member.last_name}&background=138808&color=fff&size=200`}
                                    alt="Member"
                                />
                            </div>
                            <div className="card-qr-box">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${member.membership_id || member.id}`}
                                    alt="QR Code"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>

                        {/* Data Side */}
                        <div className="data-side">
                            <div className="membership-label-badge">உறுப்பினர் அட்டை / MEMBER CARD</div>

                            <div className="data-grid">
                                <div className="data-row">
                                    <span className="label">Name / பெயர்</span>
                                    <span className="value">{member.first_name} {member.last_name}</span>
                                </div>
                                <div className="data-row">
                                    <span className="label">ID Number</span>
                                    <span className="value" style={{ letterSpacing: '0.5px' }}>
                                        {member.membership_id || `TMC-TN-${member.id.substring(0, 8).toUpperCase()}`}
                                    </span>
                                </div>
                                <div className="data-row">
                                    <span className="label">District / மாவட்டம்</span>
                                    <span className="value">{member.district}</span>
                                </div>
                                <div className="data-row">
                                    <span className="label">Date / தேதி</span>
                                    <span className="value">{formatDate(member.created_at)}</span>
                                </div>
                                <div className="data-row">
                                    <span className="label">Phone / தொலைபேசி</span>
                                    <span className="value">
                                        {member.phone?.startsWith('+91') ? member.phone : `+91 ${member.phone}`}
                                    </span>
                                </div>
                            </div>

                            <div className="member-signature-area">
                                <img src="/card/signature.png" className="signature-img" alt="Signature" />
                                <span className="signature-label">மாநிலத் தலைவர் கையொப்பம் / State President Signature</span>
                            </div>
                        </div>

                        {/* Leader Side */}
                        <div className="leader-side">
                            <img
                                src="/card/leader.png"
                                className="big-leader-portrait"
                                alt="Mamata Banerjee"
                            />
                            <div className="leader-title-card">
                                <span className="leader-name-text">மம்தா பானர்ஜி</span>
                                <span className="leader-role-text">National Chairperson</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-flag-footer"></div>
                </div>

                <div className="card-actions no-print">
                    <button className="btn-download" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#138808', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                        <Download size={16} style={{ marginRight: '8px' }} />
                        Print / Save
                    </button>
                    <button className="btn-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                        <X size={16} style={{ marginRight: '8px' }} />
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberCardModal;
