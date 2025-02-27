// Import Firebase app and Firestore using CommonJS syntax
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration - copy from your firebase.jsx
const firebaseConfig = {
    apiKey: "AIzaSyAbduLHHHloI3AuVl3nEG3NpUFUkFrHiFA",
    authDomain: "quiz-app-f505f.firebaseapp.com",
    projectId: "quiz-app-f505f",
    storageBucket: "quiz-app-f505f.firebasestorage.app",
    messagingSenderId: "968723393621",
    appId: "1:968723393621:web:eb33812c0921065c86b8dc",
    measurementId: "G-S1G7M4JKSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read the JSON file
const bacteriologyData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/bacteriology.json'), 'utf8')
);

// Function to load data into Firestore
const loadBacteriologyData = async () => {
    try {
        console.log('Starting to load bacteriology data to Firestore...');
        const questionsCollection = collection(db, 'bacteriology');

        // Process each item in the JSON data
        const entries = Object.entries(bacteriologyData);

        for (const [id, question] of entries) {
            // Create a document with the same ID as in the JSON
            await setDoc(doc(questionsCollection, id), {
                id: id,
                question: question,
                createdAt: new Date()
            });
            console.log(`Added question ${id}`);
        }

        console.log(`Successfully loaded ${entries.length} bacteriology questions to Firestore`);
    } catch (error) {
        console.error('Error loading data to Firestore:', error);
    }
};

// Execute the function
loadBacteriologyData();

// CommonJS export
module.exports = loadBacteriologyData;
