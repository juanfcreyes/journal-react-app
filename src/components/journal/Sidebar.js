import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();    
    const auth = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());       
    }

    const handleNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <aside className='journal_sidebar'> 
            <div className='journal_sidabar-narvar'>  
                <h3 className='mt-5'>
                    <i className='far fa-moon'></i>
                    <span className='ml-1'> { auth.name }</span>
                </h3>
                <button className='btn' onClick={handleLogout}>Logout</button>
            </div>
            <div className='journal__new-entry' onClick={handleNewNote}>
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>new entry</p>
            </div>
            <JournalEntries></JournalEntries>
        </aside>
    )
}
