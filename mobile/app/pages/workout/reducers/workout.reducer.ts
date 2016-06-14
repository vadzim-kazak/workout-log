import {createReducer} from '../../../common/util/create-reducer';
import {generateId} from '../../../common/util/generate-id';

export const workoutReducer = createReducer<Array<any>>([], {
    
    ['WORKOUT_CREATE'](state, action) {
        
        let workout = action.payload;
        // temporary inject id here
        workout.id = generateId();
        return [...state, workout];
    },

    ['WORKOUT_DELETE'](state, action) {
        
        let workoutId = action.payload;
        let filteredWorkouts = state.filter(current => current.id !== workoutId);
        
        return [...filteredWorkouts];
    }

});