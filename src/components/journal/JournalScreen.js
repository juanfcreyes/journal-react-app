import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
    const notes = useSelector(state => state.notes);
    return (
        <div className='journal__main-content animate__animated animate__fadeIn'>
            <Sidebar></Sidebar>
            <main>
                { notes.active ? 
                    <NoteScreen></NoteScreen> : 
                    <NothingSelected></NothingSelected>
                }
            </main>
        </div>
    )
}
