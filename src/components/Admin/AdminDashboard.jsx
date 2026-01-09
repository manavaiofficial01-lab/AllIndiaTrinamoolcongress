
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabase'
import { useNavigate } from 'react-router-dom'
import ManageNews from './ManageNews'
import ManageMembers from './ManageMembers'
import CardGenerator from './CardGenerator'
import ManageCards from './ManageCards'

import './Admin.css'

const AdminDashboard = () => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('news')
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
            if (!session) {
                navigate('/admin/login')
            }
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (!session) {
                navigate('/admin/login')
            }
        })

        return () => subscription.unsubscribe()
    }, [navigate])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading admin panel...</div>
    }

    if (!session) return null

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>TMC Admin</h3>
                    <small style={{ color: '#888' }}>v1.0.0</small>
                </div>
                <nav className="sidebar-nav">
                    <div
                        className={`nav-item ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        Manage News
                    </div>

                    <div
                        className={`nav-item ${activeTab === 'members' ? 'active' : ''}`}
                        onClick={() => setActiveTab('members')}
                    >
                        Members List
                    </div>

                    <div
                        className={`nav-item ${activeTab === 'cards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cards')}
                    >
                        Generate ID Card
                    </div>

                    <div
                        className={`nav-item ${activeTab === 'holders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('holders')}
                    >
                        Saved Cards
                    </div>

                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-content">
                <div className="dashboard-header">
                    <h2>
                        {activeTab === 'news' && 'News Management'}
                        {activeTab === 'members' && 'Membership Registrations'}
                        {activeTab === 'cards' && 'Premium ID Generator'}
                        {activeTab === 'holders' && 'Card Holder Database'}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>{session.user.email}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                {activeTab === 'news' && <ManageNews />}
                {activeTab === 'members' && <ManageMembers />}
                {activeTab === 'cards' && <CardGenerator />}
                {activeTab === 'holders' && <ManageCards />}

            </div>
        </div>
    )
}

export default AdminDashboard
