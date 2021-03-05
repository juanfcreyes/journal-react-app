import React from 'react'
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLogin } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLogin: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas sobre LoginScreen', () => {
    
   const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen></LoginScreen>
        </MemoryRouter>
    </Provider>
   );
   
   beforeEach(() => {
       store = mockStore(initState);
       jest.clearAllMocks();
    });

    test('Se debe renderizar correctamente  ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar la accion startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')({
            preventDefault: () => {}
        });

        expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    
    test('Debe de disparar la accion startLogin con los respectivos arguentos', () => {
        const email = 'juan.test@test.com';
        const password = 'test.123';
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'juan.test@test.com'
            }
        });
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'test.123'
            }
        });
        
        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });
        
        expect(startLogin).toHaveBeenCalledWith(email, password);
    });
    
});
