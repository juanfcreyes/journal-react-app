import { authReducer } from "../../reducers/AuthReducer";
import { types } from "../../types/types";

describe('Prueba sobre Auth Reducer', () => {
   
    test('Debe contener el default state', () => {
        const initialState = {
            name: 'Juan',
            uid: '1'
        }
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('Debe tener un estado de login', () => {
        const loginState = {
            name: 'Juan',
            uid: '10'
        }
        const state = authReducer({}, {
            type: types.login,
            payload:  {
                displayName: 'Juan',
                uid: '10'
            }
        });
        expect(state).toEqual(loginState);
    });

    test('Debe presentar un estado de logour', () => {
        const initialState = {
            name: 'Juan',
            uid: '1'
        }
        const state = authReducer(initialState, {
            type: types.logout
        });
        expect(state).toEqual({});
    });
    

});
