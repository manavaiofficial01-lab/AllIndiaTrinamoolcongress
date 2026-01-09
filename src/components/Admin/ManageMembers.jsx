import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import { Trash2, UserCheck, Clock, UserX, CreditCard } from 'lucide-react';
import MemberCardModal from './MemberCardModal';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, volunteer, member
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('membership_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching members:', error);
        } else {
            setMembers(data);
        }
        setLoading(false);
    };

    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase
            .from('membership_requests')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            alert('Error updating status');
        } else {
            setMembers(members.map(m => m.id === id ? { ...m, status: newStatus } : m));
        }
    };

    const deleteMember = async (id) => {
        if (!window.confirm('Are you sure you want to delete this registration?')) return;

        const { error } = await supabase
            .from('membership_requests')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting registration');
        } else {
            setMembers(members.filter(m => m.id !== id));
        }
    };

    const filteredMembers = members.filter(m => {
        if (filter === 'all') return true;
        return m.membership_type === filter;
    });

    if (loading) return <div className="admin-loading">Loading registrations...</div>;

    return (
        <div className="manage-members">
            <div className="admin-actions-bar">
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >All ({members.length})</button>
                    <button
                        className={`filter-tab ${filter === 'volunteer' ? 'active' : ''}`}
                        onClick={() => setFilter('volunteer')}
                    >Volunteers ({members.filter(m => m.membership_type === 'volunteer').length})</button>
                    <button
                        className={`filter-tab ${filter === 'member' ? 'active' : ''}`}
                        onClick={() => setFilter('member')}
                    >Members ({members.filter(m => m.membership_type === 'member').length})</button>
                </div>
                <button className="refresh-btn" onClick={fetchMembers}>Refresh Data</button>
            </div>

            <div className="members-grid">
                {filteredMembers.length === 0 ? (
                    <div className="no-data">No registrations found.</div>
                ) : (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td>{new Date(member.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div className="member-name">
                                                {member.first_name} {member.last_name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="member-contact">
                                                <span>{member.email}</span>
                                                <small>{member.phone}</small>
                                            </div>
                                        </td>
                                        <td>{member.district}</td>
                                        <td>
                                            <span className={`badge badge-${member.membership_type}`}>
                                                {member.membership_type}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-pill status-${member.status}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    title="Generate ID Card"
                                                    onClick={() => setSelectedMember(member)}
                                                    className="action-btn card-gen"
                                                ><CreditCard size={16} /></button>
                                                <button
                                                    title="Approve"
                                                    onClick={() => updateStatus(member.id, 'accepted')}
                                                    className="action-btn success"
                                                ><UserCheck size={16} /></button>
                                                <button
                                                    title="Reject"
                                                    onClick={() => updateStatus(member.id, 'rejected')}
                                                    className="action-btn danger"
                                                ><UserX size={16} /></button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => deleteMember(member.id)}
                                                    className="action-btn delete"
                                                ><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedMember && (
                <MemberCardModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </div>
    );
};

export default ManageMembers;
