import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB6ORg7ZS3kAKsrFdqYU2nbhoT5O0put4Y",
    authDomain: "writing-tool-8c144.firebaseapp.com",
    projectId: "writing-tool-8c144",
    storageBucket: "writing-tool-8c144.appspot.com",
    messagingSenderId: "304712907262",
    appId: "1:304712907262:web:23553be16c3c74ed3968af"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }