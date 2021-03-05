import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { setActiveNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock('../../../actions/notes', () => ({
    setActiveNote: jest.fn(),
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
        active: {
            id: 'safdsgfd4g6fg',
            title: 'Titulo',
            body: 'cuerpo',
            date: 12348875413
        }
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();
describe('Pruebas sobre NotesScreen', () => {

    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen></NoteScreen>
        </Provider>
    )
    

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar el activeNode', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Nuevo titulo'
            }
        });

        expect(setActiveNote).toHaveBeenCalledWith(
            'safdsgfd4g6fg',
            { 
                id: 'safdsgfd4g6fg',
                title: 'Nuevo titulo',
                body: 'cuerpo',
                date: expect.any(Number)
            }
        );
    });
    
    
});
