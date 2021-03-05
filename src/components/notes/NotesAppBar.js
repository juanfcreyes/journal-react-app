import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const {active: note} = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const momentDate = moment(note.date);
    
    const handleSave = () => {
        dispatch(startSaveNote(note));
    }

    const handlePictureUpload = () => {
       document.getElementById('file_input').click();
    }

    const handleFileChange = (e) => {
       const file = e.target.files[0];
       if (file) {
           dispatch(startUploading(file));
       }
    }

    return (
        <div className='notes__appbar'>
            <span>{momentDate.format('dddd DD MMMM YYYY')}</span>
            <input type='file' style={ {display: 'none' }} onChange={handleFileChange} id='file_input' name='file_input'></input>
            <div>
                <button className='btn' onClick={handlePictureUpload}>picture</button>
                <button className='btn' onClick={handleSave} >Save</button>
            </div>
        </div>
    )
}
