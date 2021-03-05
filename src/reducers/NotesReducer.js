import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null, 
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesAddnew:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            };
        case types.notesSetActive:
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.payload
                }
            };
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            };
        case types.notesUploaded:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id ? action.payload.note : note 
                )
            };
        case types.notesDelete:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload.id),
                active: null
            };
        case types.notesCleaning:   
            return {
                notes: [],
                active: null,             
            };
        default:
            return state;
    }
}