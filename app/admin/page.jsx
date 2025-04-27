'use client'
import React from 'react'
import { useUser } from '../context/UserContext'
import AdminAuthMiddleware from '../utils/adminAuthMiddleware'
function AdminPage() {
    const { isAdmin, roles } = useUser();

    return (
        <AdminAuthMiddleware>
            <div>AdminPage</div>
        </AdminAuthMiddleware>
    )
}

export default AdminPage