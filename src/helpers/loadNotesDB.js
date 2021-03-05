import { db } from "../firebase/firebase-config"

export const loadNotesDB = async (uid) => {
    const notes = [];
    try {
        const notesSnap = await db.collection(`${uid}/journal/notes`).get();    
        notesSnap.forEach(snapChild => {
            notes.push({
                id: snapChild.id,
                ...snapChild.data()
            });
        });
    } catch (error) {
        console.log('error', error);
    }
    return notes;
}