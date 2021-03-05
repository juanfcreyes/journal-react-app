import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Tests sobre ui actions', () => {
    test('Todas la acciones debe funcionar', () => {
        const error = 'Ha ocurrido un error';
        const action = setError(error);
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();
        expect(action).toEqual({type: types.uiSetError, payload: error});
        expect(removeErrorAction).toEqual({type: types.uiRemoveError});
        expect(startLoadingAction).toEqual({type: types.uiStartLoading});
        expect(finishLoadingAction).toEqual({type: types.uiFinishLoading});
    }); 
    
});
