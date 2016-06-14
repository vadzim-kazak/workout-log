import {createReducer} from '../../../common/util/create-reducer';

export const exercisesReducer = createReducer<Array<any>>([], {
    
    ['LOAD_EXERCISES_SUCCESS'](state, action) {
        
        let exercises = action.payload;
        return [...exercises];
    }
});