import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotesDB } from "../helpers/loadNotesDB";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { auth } = getState();
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        try {
            const doc = await db.collection(`${auth.uid}/journal/notes`).add(newNote);
            dispatch(setActiveNote(doc.id, newNote));
            dispatch(addNewNote({ id: doc.id, ...newNote}));
        } catch (error) {
            console.error(error);
        }
    
    }
};

export const startLoadNotes = () => {
    return async (dispatch, getState) => {
        const { auth } = getState();
        try {
            const notes = await loadNotesDB(auth.uid);
            dispatch(loadNotes(notes));
        } catch (error) {
            dispatch(loadNotes([]));
            console.log(error);
        }
    }
};

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { auth } = getState();
        const noteFS = {...note};
        delete noteFS.id;
        try {
            await db.doc(`${auth.uid}/journal/notes/${note.id}`).update(noteFS);     
        } catch (error) {
            console.log('startSaveNote error', error)
        }
        dispatch(refreshNote(note.id, noteFS));
        dispatch(setActiveNote(note.id, noteFS))
        Swal.fire('Save', note.title, 'success');
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: note } = getState().notes;
        showUploadAlert();
        try {
            const fileUrl = await fileUpload(file);
            note.url = fileUrl;        
        } catch (error) {
            
        }
        dispatch(startSaveNote(note))
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        try {
            const { auth } = getState();
            await db.doc(`${auth.uid}/journal/notes/${id}`).delete();
            Swal.fire('Deleted', 'Note deleted', 'info');
            dispatch(deleteNote(id));
        } catch (error) {
            console.error(error);
        }
      
    }
}

const showUploadAlert = () => {
    Swal.fire({
        title: 'Uploading...',
        text: 'Please wait',
        allowOutsideClick: false,
        willOpen: () => {
            Swal.showLoading()
        },
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false
    });
} 

export const addNewNote = (note) => ({
    type: types.notesAddnew,
    payload: {
        ...note
    }
});

export const setActiveNote = (id, note) => ({
    type: types.notesSetActive,
    payload: {
        id,
        ...note
    }
});

export const loadNotes = (notes) => ({
    type : types.notesLoad,
    payload: notes
});

export const refreshNote = (id, note) => ({
    type: types.notesUploaded,
    payload: {
        id,
        note: { id, ...note }
    }
});

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: {
        id
    }
});

export const notesLogout = () => ({
    type: types.notesCleaning,
});

