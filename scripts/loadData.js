/*
    This script is used to load data from a JSON file into a Firestore collection.
    the DATASET_PATH is the path to the JSON file.
    the COLLECTION_NAME is the name of the Firestore collection to load the data into.


    the schema of the JSON file is as follows:
    {
        "1": "question1",
        "2": "question2",
        "3": "question3",
        "4": "question4",
        "5": "question5",
        "6": "question6",
        "7": "question7",
    }
    
*/

const DATASET_PATH = "../dataset/biochemistry01.json"
const COLLECTION_NAME = "biochemistry"


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
    fs.readFileSync(path.join(__dirname, DATASET_PATH), 'utf8')
);

// Function to load data into Firestore
const loadQuestionsData = async () => {
    try {
        console.log(`Starting to load ${COLLECTION_NAME} data to Firestore...`);
        const questionsCollection = collection(db, COLLECTION_NAME);

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

        console.log(`Successfully loaded ${entries.length} ${COLLECTION_NAME} questions to Firestore`);
    } catch (error) {
        console.error(`Error loading ${COLLECTION_NAME} data to Firestore:`, error);
    }
};

// Execute the function
loadQuestionsData();

// CommonJS export
module.exports = loadQuestionsData;
