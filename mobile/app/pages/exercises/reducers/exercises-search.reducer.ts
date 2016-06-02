import {createReducer} from '../../../common/util/createReducer';

export const exercisesSearchReducer = createReducer<String>('', {
    
    ['UPDATE_SEARCH_QUERY'](state, action){
        let searchQuery = action.payload;
        return searchQuery;
    },
    
});