// Import Firebase app and Firestore using CommonJS syntax
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration - copy from your firebase.jsx
import firebaseConfig from './firebaseCridentials';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read the JSON file
const questionsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../dataset/biochemistry01.json'), 'utf8')
);

// Function to load data into Firestore
const loadQuestionsData = async () => {
    try {
        console.log('Starting to load biochemistry data to Firestore...');
        const questionsCollection = collection(db, 'biochemistry');

        // Process each item in the JSON data
        const entries = Object.entries(questionsData);

        entries.forEach(async ([id, question], index) => {
            // Convert the string ID to a number without decimal
            const numericId = parseInt(id, 10);
            // Create a document with the numeric ID
            await setDoc(doc(questionsCollection, numericId.toString()), {
                id: index,
                question: question,
                createdAt: new Date()
            });
            console.log(`Added question id ${numericId} (${index + 1}/${entries.length})`);
        });

        console.log(`Successfully loaded ${entries.length} biochemistry questions to Firestore`);
    } catch (error) {
        console.error('Error loading data to Firestore:', error);
    }
};

// Execute the function
loadQuestionsData();

// CommonJS export
module.exports = loadQuestionsData;
