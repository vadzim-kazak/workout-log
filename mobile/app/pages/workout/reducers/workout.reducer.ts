import {createReducer} from '../../../common/util/create-reducer';
import {generateId} from '../../../common/util/generate-id';

export const workoutReducer = createReducer<Array<any>>([], {
    
    ['WORKOUT_CREATE'](state, action) {
        
        let workout = action.payload;
        // temporary inject id here
        workout.id = generateId();
        return [...state, workout];
    },

     ['WORKOUT_UPDATE'](state, action) {
        
        let workout = action.payload;
        let updatedWorkouts = state.map(current => {
            if (current.id === workout.id) {
                return Object.assign({}, workout);
            } else {
                return current;
            }
        })

        return [...updatedWorkouts];
    },

    ['WORKOUT_DELETE'](state, action) {
        
        let workout = action.payload;
        let filteredWorkouts = state.filter(current => {

            if (current.id === workout.id) {
                return false;
            }

            if (workout.type !== 'oneTime' && 
                current.templateId && current.templateId == workout.id && 
                current.state === 'deleted') {
                
                return false;
            }

            return true;

        });
        
        return [...filteredWorkouts];
    },

    ['WORKOUTS_LOAD_SUCCESS'](state, action) {
        
        let workouts = action.payload;
        return [...workouts];
    }



});