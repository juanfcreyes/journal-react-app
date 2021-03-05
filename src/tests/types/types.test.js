import { types } from "../../types/types";
import '@testing-library/jest-dom';

describe('Pruebas sobre yypes', () => {
    
    const typesTest = {
        login: '[Auth] login',
        logout: '[Auth] logout',
        uiSetError: '[UI Set Error]',
        uiRemoveError: '[UI Remove Error]',
        uiStartLoading: '[UI Start Loading]',
        uiFinishLoading: '[UI Finish Loading ]',
        notesAddnew: '[Notes Add New]',
        notesSetActive: '[Notes Set Active]',
        notesLoad: '[Notes Load]',
        notesUploaded: '[Notes Uploaded]',
        notesFileUrl: '[Notes Upload Image Url]',
        notesDelete: '[Notes deleted]',
        notesCleaning: '[Notes cleaning]'
    }
    
    test('Deben tener todos los types previstos ', () => {
        expect(typesTest).toEqual(types)
    })
});
