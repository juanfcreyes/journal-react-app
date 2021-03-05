import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active: note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {title, body} = formValues;
    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset, formValues]);

    useEffect(() => {
        dispatch(setActiveNote(formValues.id, {...formValues}));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(note.id));
    };
    
    return (
        <div className="notes__main-content animate__animated animate__fadeIn">
            <NotesAppBar></NotesAppBar>
            <div className='notes__content'>
                <input type='text' placeholder='Some awesome title' className='notes__title-input' autoComplete='off' name='title' onChange={handleInputChange} value={title}></input>
                <textarea placeholder='What happend today' className='notes__textarea' name='body' onChange={handleInputChange} value={body} > </textarea>
                { 
                    note.url && 
                    <div className='notes__image'>
                        <img src={note.url} alt='imagen de ejemplo' style={{height:'100%', width:'100%'}}></img>
                    </div>
                }
            </div>
            <button className='btn btn-danger' onClick={handleDelete}>Delete </button>
        </div>
    )
}
