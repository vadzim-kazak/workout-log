import {createReducer} from '../../../common/util/create-reducer';

export const exercisesSearchReducer = createReducer<String>('', {
    
    ['UPDATE_EXERCISES_SEARCH_QUERY'](state, action){
        let searchQuery = action.payload;
        return searchQuery;
    }
});