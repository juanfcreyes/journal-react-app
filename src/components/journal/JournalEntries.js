import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    const notesState = useSelector(state => state.notes);
    const entries = notesState.notes;    
    return (
        <div className='journal__entries animate__animated animate__fadeIn'>
            {
                entries.map((note) => (
                    <JournalEntry key={note.id} note={note} ></JournalEntry>
                ))
            }
        </div>
    )
}
