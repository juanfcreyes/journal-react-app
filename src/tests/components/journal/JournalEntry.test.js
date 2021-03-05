import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { setActiveNote } from "../../../actions/notes";
import { JournalEntry } from "../../../components/journal/JournalEntry";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas sobre JournalEntry', () => {

     const note = {
        id: 'safdsgfd4g6fg',
        title: 'Titulo',
        body: 'cuerpo',
        date: 12348875413
     }  
    
    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry note={note}></JournalEntry>
        </Provider>);


    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de activar la nota', () => {
        wrapper.find('.journal__entry').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(setActiveNote(note.id , note));
    });
    
    
});
