import {createReducer} from '../../../common/util/create-reducer';

export const exercisesFilteringCriteriaReducer = createReducer<Object>({}, {
    
    ['SAVE_EXERCISES_FILTERING_CRITERIA'](state, action) {
        return Object.assign({}, action.payload);    
    }
});