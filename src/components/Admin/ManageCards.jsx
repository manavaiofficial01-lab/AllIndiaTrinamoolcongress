import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import { Trash2, CreditCard, Search, Download, UserPlus } from 'lucide-react';
import MemberCardModal from './MemberCardModal';

const ManageCards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('card_holders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching cards:', error);
        } else {
            setCards(data);
        }
        setLoading(false);
    };

    const deleteCard = async (id) => {
        if (window.confirm('Are you sure you want to delete this card record?')) {
            const { error } = await supabase
                .from('card_holders')
                .delete()
                .eq('id', id);

            if (error) {
                alert('Error deleting card');
            } else {
                fetchCards();
            }
        }
    };

    const filteredCards = cards.filter(card =>
        `${card.first_name} ${card.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.membership_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="manage-cards-section">
            <div className="admin-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#138808' }}>Registered Card Holders</h2>
                    <p style={{ margin: 0, color: '#666' }}>View and manage all generated ID cards</p>
                </div>
                <div className="search-box" style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                        type="text"
                        placeholder="Search by name, ID or district..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid #ddd', width: '300px' }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading card holders...</div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Member Details</th>
                                <th>Membership ID</th>
                                <th>District</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCards.map((card) => (
                                <tr key={card.id}>
                                    <td data-label="Photo">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src={card.photo_url || `https://ui-avatars.com/api/?name=${card.first_name}+${card.last_name}&background=138808&color=fff`}
                                                alt="Profile"
                                                style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #138808' }}
                                            />
                                        </div>
                                    </td>
                                    <td data-label="Member Details">
                                        <div style={{ fontWeight: 'bold' }}>{card.first_name} {card.last_name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{card.membership_type.toUpperCase()}</div>
                                    </td>
                                    <td data-label="Membership ID"><code style={{ color: '#138808', fontWeight: 'bold' }}>{card.membership_id}</code></td>
                                    <td data-label="District">{card.district}</td>
                                    <td data-label="Joined">{new Date(card.created_at).toLocaleDateString()}</td>
                                    <td data-label="Actions">
                                        <div className="table-actions">
                                            <button
                                                title="View/Print Card"
                                                onClick={() => setSelectedCard(card)}
                                                className="action-btn card-gen"
                                            ><CreditCard size={16} /></button>
                                            <button
                                                title="Delete Record"
                                                onClick={() => deleteCard(card.id)}
                                                className="action-btn delete"
                                            ><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredCards.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                            No card holders found.
                        </div>
                    )}
                </div>
            )}

            {selectedCard && (
                <MemberCardModal
                    member={{
                        ...selectedCard,
                        id: selectedCard.membership_id // Use membership_id for rendering
                    }}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
};

export default ManageCards;
