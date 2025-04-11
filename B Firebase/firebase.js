// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js"
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js" 
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "PUTT INN DINE VERDIER HER",
    authDomain: "todo2025-f274f.firebaseapp.com",
    projectId: "todo2025-f274f",
    // PUTT INN DINE VERDIER HER! 

}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app) 


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);








const oppgaveCol = collection(db, 'todolist')  // Referanse til "todolist"-samlingen

// Get a list of cities from your database
export async function getOppgaver() {
    const oppgaveSnapshot = await getDocs(oppgaveCol)
    const oppgaveList = oppgaveSnapshot.docs.map(doc => doc.data())
    return oppgaveList
}

export async function lagTodoOppgave(oppgaveTekst) {
    if (oppgaveTekst.length < 3) {
        console.error("Kan ikke opprette en oppgave med mindre enn 3 tegn i teksten")
        return null
    }
    try {
        const nyOppgave = await addDoc(oppgaveCol, {
            tekst: oppgaveTekst,
            fullført: false,
            opprettet: new Date()
        })
        return nyOppgave.id  // Returnerer ID-en til den nye oppgaven
    } catch (error) {
        console.error("Feil ved lagring av oppgave:", error)
    }
}


export async function slettTodoOppgave(oppgaveTekst) {
    try {
        const q = query(oppgaveCol, where("tekst", "==", oppgaveTekst))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            console.log("Fant ingen oppgave med denne teksten.")
            return null
        }

        // Henter første dokument og sletter det
        const førsteOppgave = querySnapshot.docs[0]
        await slettTodoOppgaveMedId(førsteOppgave.id)
        return førsteOppgave.id

    } catch (error) {
        console.error("Feil ved sletting av oppgave:", error)
    }
}


export async function slettTodoOppgaveMedId(oppgaveId) {
    try {
        await deleteDoc(doc(db, "todolist", oppgaveId));
        console.log("Oppgave slettet:", oppgaveId);
    } catch (error) {
        console.error("Feil ved sletting av oppgave:", error);
    }
}



// Eksponer funksjonen globalt
// Funka ikke... window.getOppgaver = getOppgaver 
