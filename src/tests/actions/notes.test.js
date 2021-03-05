import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startLoadNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';



jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => { 
        return Promise.resolve('https://ejemplo.com/foto-dsfdsfg.jpg'); 
    }
})); 


jest.mock('../../helpers/loadNotesDB', () => ({
    loadNotesDB: () => { 
        return Promise.resolve([
            {                
                body: "prueba",
                date: 1614045402343,
                title: "prueba",
                url: "https://ejemplo.com/foto-dsfdsfg.jpg" 
            }
        ]); 
    }
})); 

global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        active: {
            id: '2wnmheRJLI9H1C39mRlU',
            title: 'prueba',
            body: 'prueba'
        }
    }
}

let store = mockStore(initState);

beforeEach(() => {
    store = mockStore(initState);
});

describe('Tests sobre notes actions', () => {

    let docId = null;
    beforeAll(() => {
        docId = null;
    })

    afterAll(() =>{
        db.doc(`${store.getState().auth.uid}/journal/notes/${docId}`).delete();    
    });

   test('Debe crear una nueva nota startNewNote ', () => {
        store.dispatch(startNewNote()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({ type: types.notesSetActive,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                }
            });
            expect(actions[1]).toEqual({ type: types.notesAddnew,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                }
            });
            docId = actions[0].payload.id;
        });
    }, 10000);

    test('starLoadingNotes debe cargar las notas ', async () => {        
        try {
            await store.dispatch(startLoadNotes());   
        } catch (error) {
            console.log(error);     
        }
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });
    });


    test('Debe acualizar la nota', () => {
        const note = {
            id: '2wnmheRJLI9H1C39mRlU',
            title: 'prueba',
            body: 'prueba'
        };
        
        store.dispatch(startSaveNote(note)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.notesUploaded,
                payload: { id: '2wnmheRJLI9H1C39mRlU', note: note }
            });
            expect(actions[0].type).toBe(types.notesUploaded);  
        });
    });

    test('Debe actualizar el url de la nota', () => {
        const file = new File([], 'foto.jpg');
        store.dispatch(startUploading(file)).then(() => {
            expect(store.getState().notes.active.url).toBe('https://ejemplo.com/foto-dsfdsfg.jpg');
        });       
    });
    
});