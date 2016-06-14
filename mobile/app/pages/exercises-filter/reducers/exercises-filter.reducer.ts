import {createReducer} from '../../../common/util/create-reducer';

export const exercisesFilterReducer = createReducer<Object>({}, {
    
    ['UPDATE_EXERCISES_FILTER'](state, action){
        let {value, category, isExcluded} = action.payload;
        
        //State contains only disabled values

        if (isExcluded) {
            // Some value has been excluded
            if (state[category]) {
                state[category] = [...state[category], value];
            } else {
                state[category] = [value];
            }

        } else {
            // Some value has been enabled
            if (state[category]) {
                state[category] = state[category].filter(categoryValue => categoryValue !== value);
                if (state[category].length === 0) {
                    delete state[category];
                }
            }    

        }
       
        return Object.assign({}, state);
    },

    ['UPDATE_EXERCISES_CATEGORY_FILTER'](state, action){
         let {values, category, isExcluded} = action.payload;
         if (isExcluded) {
            state[category] = [...values];
         } else {
            delete state[category];     
         }

         return Object.assign({}, state);       
    },

    ['RESET_EXERCISES_FILTER'](state, action){
         return {};       
    }         
    
});