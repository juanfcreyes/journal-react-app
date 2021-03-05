import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { types } from "../../../types/types";

jest.mock('../../../actions/auth', () => ({
    startRegister: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas sobre RegisterScrenn', () => {

    const initState = {
        ui: {
            loading: false,
            msgError: null
        }
    }

    let store = mockStore(initState);

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen></RegisterScreen>
            </MemoryRouter>
        </Provider>
       );
   
    test('Debe presentarse correctamente', () => {

        expect(wrapper).toMatchSnapshot()        
    });

    test('Debe de hacer el dispatch de la accion', () => {
        const emailField = wrapper.find('input[name="email"]');
        const nameField = wrapper.find('input[name="name"]');
        
        nameField.simulate('change', {
            target: {
                value: 'Juan',
                name: 'name'
            }
        });

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });

        const actions = store.getActions();
        expect(actions[0]).toEqual({type: types.uiSetError, payload: 'Email not valid'})

    });

    test('sDebe de mostrar la alerta con el mensaje', () => {
       
        const state = {
            ui: {
                loading: false,
                msgError: 'El email no es correcto'
            }
        }
    
        const store = mockStore(state);
    
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen></RegisterScreen>
                </MemoryRouter>
            </Provider>
           );
       
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(state.ui.msgError);
        
    });
    

    
    
});
