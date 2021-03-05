import { AppRouter } from '../../routes/AppRouter';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';


jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Pruebas sobre AppRouter', () => {

    test('Debe llamar al login si esta autenticado ', async () => {
        let user; 
        await act(async () => { 
            const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCredentials.user;
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter></AppRouter>
                    </MemoryRouter>
                </Provider>
               );
        });
       expect(login).toHaveBeenCalled();
    });
    
});
