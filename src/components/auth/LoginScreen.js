import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogin, startGoogleLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();
        
    const [formValues, handleInputChange] = useForm(
        {
            email:'',
            password: ''
        });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault(); 
        dispatch(startLogin(email, password));
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault(); 
        dispatch(startGoogleLogin());
    }
    
    return (
        <>
            <h1 className='auth__title'> Login Screen</h1>
            <form onSubmit={handleLogin} className='animate__animated animate__fadeIn'>
                <input className='auth__input' autoComplete='off' type='text' placeholder='email' name='email' value={email} onChange={handleInputChange}/>
                <input className='auth__input' type='password' placeholder='password' name='password' value={password} onChange={handleInputChange}/>
                <button className='btn btn-primary btn-block mb-1 mt-1' type='submit' disabled={ui.loading}>Login</button>
                 <div className='auth__social-networks mb-1'>  
                    <p className='mb-1'>Login with social networks</p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to='/auth/register' className='link'>
                    Create new account
                </Link>
            </form>
        </>
    )
}
