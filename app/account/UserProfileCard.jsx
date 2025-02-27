import React from 'react'

function UserProfileCard({ user }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-muted overflow-hidden">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center">
                            <span className="text-2xl font-semibold">{user.displayName?.charAt(0) || user.email?.charAt(0)}</span>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{user.displayName || 'User'}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium mb-3">Profile Information</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Display Name</span>
                        <span>{user.displayName || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Created</span>
                        <span>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileCard