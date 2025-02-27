import React from 'react'
import { Button } from '@/components/ui/button'
function SignOutCard({ handleSignOut }) {
    return (
        <div className="rounded-lg border bg-card p-4">
            <h3 className="text-lg font-medium mb-3">Account Actions</h3>
            <div className="space-y-2">
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>Log Out</Button>
            </div>
        </div>
    )
}

export default SignOutCard