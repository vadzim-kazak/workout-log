import {createReducer} from '../../../common/util/createReducer';

export const exercisesFilterCategoriesReducer = createReducer<Object>({}, {
    
    ['UPDATE_EXERCISES_FILTER_HEADERS'](state, action){
        
        //State contains only disabled headers
        let {category, isUnchecked} = action.payload;

        if (isUnchecked) {
            // Some value has been unchecked
            return Object.assign({}, state, {[category]: true});

        } else {
            // Some value has been enabled
            delete state[category];
            return Object.assign({}, state); 
        }
    },

    ['RESET_EXERCISES_FILTER_HEADERS'](state, action){
        return {};
    }
});