import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';

export const JournalEntry = ( {note} ) => {

    const dispatch = useDispatch();
    const momentDate = moment(note.date);

    const handleEntryClick = () => {
        dispatch(setActiveNote(note.id, note));
    } 

    return (
        <div className='journal__entry pointer animate__animated animate__fadeIn' onClick={handleEntryClick}>
            { note.url &&
                <div className='journal__entry-picture' style={{backgroundSize:'cover', backgroundImage:`url(${note.url})`}}></div>
            }
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>{note.title}</p>
                <p className='journal__entry-content'> {note.body} </p>
            </div>
            <div className='jorunal__entry-date-box'>
                <span>{momentDate.format('dddd')}</span>
                <h4>{momentDate.format('D')}</h4>
            </div>
        </div>
    )
}
