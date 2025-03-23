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
const questionsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/parasitology01.json'), 'utf8')
);

// Function to load data into Firestore
const loadQuestionsData = async () => {
    try {
        console.log('Starting to load bacteriology data to Firestore...');
        const questionsCollection = collection(db, 'parasitology');

        // Process each item in the JSON data
        const entries = Object.entries(questionsData);

        for (const [id, question] of entries) {
            // Convert the string ID to a number without decimal
            const numericId = parseInt(id, 10);
            // Create a document with the numeric ID
            await setDoc(doc(questionsCollection, numericId.toString()), {
                id: numericId,
                question: question,
                createdAt: new Date()
            });
            console.log(`Added question ${numericId}`);
        }

        console.log(`Successfully loaded ${entries.length} bacteriology questions to Firestore`);
    } catch (error) {
        console.error('Error loading data to Firestore:', error);
    }
};

// Execute the function
loadQuestionsData();

// CommonJS export
module.exports = loadQuestionsData;
