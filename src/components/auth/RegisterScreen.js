import React from 'react'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { removeError, setError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const ui = useSelector(state => state.ui); 
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm(
        {
            name: '',
            email:'',
            password1: '',
            password2: ''
        });

    const {name, email, password1, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegister(email, password1, name));
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        }

        if (!validator.isEmail(email)) {
            dispatch(setError('Email not valid'));
            return false;
        }

        if (password1 !== password2 || password1.length < 5) {
            dispatch(setError('The password must have more than 5 characters and its confirmation must be the same'));
            return false;
        } 

        dispatch(removeError());

        return true;
    }

    return (
        <>
            <h1 className='auth__title'> Register</h1>
            <form onSubmit={handleRegister}  className='animate__animated animate__fadeIn'>
                {
                    ui.msgError &&
                    <div className='auth__alert-error'>        
                        { ui.msgError }
                    </div>
                }
                <input className='auth__input' autoComplete='off' type='text' placeholder='name' name='name' onChange={handleInputChange}  value={name}/>
                <input className='auth__input' autoComplete='off' type='text' placeholder='email' name='email' onChange={handleInputChange} value={email}/>
                <input className='auth__input' type='password' placeholder='password' name='password1' onChange={handleInputChange} value={password1}/>
                <input className='auth__input' type='password' placeholder='confirm password' name='password2' onChange={handleInputChange} value={password2}/>
                <button className='btn btn-primary btn-block mb-5 mt-1' type='submit'>Register</button>
                <Link to='/auth/login' className='link'>
                   have you already registered?
                </Link>
            </form>
        </>
    )
}
