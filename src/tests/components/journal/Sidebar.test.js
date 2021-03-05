import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Sidebar } from "../../../components/journal/Sidebar";

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));


jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
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

describe('Prebas sobre el sidebar', () => {

    const wrapper = mount(
        <Provider store={store}>
            <Sidebar></Sidebar>
        </Provider>
    )
    
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el logout', () => {
        wrapper.find('.btn').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });

    test('Debe de llamar el startNewNode', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    });
    
});
