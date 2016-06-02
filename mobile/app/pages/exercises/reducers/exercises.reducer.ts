import {createReducer} from '../../../common/util/createReducer';

export const exercisesReducer = createReducer<Array<any>>([], {
    
    ['LOAD_EXERCISES_SUCCESS'](state, action) {
        
        let exercises = action.payload;
        
        // Sort exercises by target muscle
        exercises.sort((first, second) => {
            if(first.mainMuscles[0] < second.mainMuscles[0]) return -1;
            if(first.mainMuscles[0] > second.mainMuscles[0]) return 1;
            return 0;
        });
                
        return [...exercises];
    }
    
});