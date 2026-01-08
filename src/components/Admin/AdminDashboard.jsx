
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabase'
import { useNavigate } from 'react-router-dom'
import ManageNews from './ManageNews'

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
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-content">
                <div className="dashboard-header">
                    <h2>
                        {activeTab === 'news' && 'News Management'}
                        {activeTab === 'images' && 'Image Library'}
                        {activeTab === 'settings' && 'System Settings'}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>{session.user.email}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                {activeTab === 'news' && <ManageNews />}



                {activeTab === 'settings' && (
                    <div>
                        <h3>Database Schema</h3>
                        <p>Make sure to run the latest schema updates in Supabase.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
