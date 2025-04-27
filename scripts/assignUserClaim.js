// app/scripts/assignUserClaim.js
const admin = require('firebase-admin');
const serviceAccount = require('../keys/serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function setUserClaims(uid, claims) {
    try {
        await admin.auth().setCustomUserClaims(uid, claims);

        // Verify the claims were set
        const user = await admin.auth().getUser(uid);
        console.log('Claims set successfully for user:', uid);
        console.log('User claims:', user.customClaims);
    } catch (error) {
        console.error('Error setting custom claims:', error);
    }
}

// Set admin claim for your user
setUserClaims("J2xH927JkQdOVYf2X3F4Ty1oKze2", { admin: true, role: ['admin', 'super_admin'] })
    .then(() => {
        console.log('Done setting claims');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });