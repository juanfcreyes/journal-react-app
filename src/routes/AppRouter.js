import React, { useEffect, useState } from 'react';
import {  BrowserRouter as Router, Switch } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoutes';
import { PrivateRouter } from './PrivateRoutes';
import { startLoadNotes } from '../actions/notes';


export const AppRouter = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);
    const dispatch = useDispatch();

 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setIsLoggedIn(false);
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadNotes());
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (<h1> wait... </h1>);
    }

    return (
        <div>
            <Router>
                <Switch>
                    <PublicRoute isAuthenticated={isLoggedIn} path ='/auth' component={AuthRouter}></PublicRoute>
                    <PrivateRouter isAuthenticated={isLoggedIn}  path ='/' component={JournalScreen}></PrivateRouter>
                </Switch>
            </Router>
            
        </div>
    )
}

/**
 *    <div>
                <Switch>
                    <PublicRoute path="/login" isAuthenticated={user.logged}  component={LoginScreen} />
                    <PrivateRouter path="/" isAuthenticated={user.logged}  component={ DashboardRoutes } /> 
                </Switch>
            </div>
 */
