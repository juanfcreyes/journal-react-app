import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { login, logout, startLogin, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {}
}

let store = mockStore(initState);

beforeEach(() => {
    store = mockStore(initState);
});


describe('Pruebas sobre auth actions', () => {
   
    beforeEach(() => {
        store = mockStore(initState);
    });
    
    test('Debe ejecututar la accion login', () => {
        store.dispatch(login('testing', 'testingName'));
        expect(store.getActions()[0]).toEqual({
            type: types.login,
            payload: {
                uid: 'testing',
                displayName: 'testingName'
            }});
        
    });

    test('Debe ejecututar la accion logout', () => {
        store.dispatch(logout());
        expect(store.getActions()[0]).toEqual({type: types.logout});
    });

    test('Debe de realizar el logout', async () => {
        await store.dispatch(startLogout()); 
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.logout
        });
        expect(actions[1]).toEqual({
            type: types.notesCleaning
        });
    });

    test('Debe de iniciar el login con mail y password', async () => {
        await store.dispatch(startLogin('test@testing.com', '123456'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({type: types.login, payload: { uid: 'mpEEcW7EypSXmZDCqRmWHI8PKhG3', displayName: null }});
    });
    
});
