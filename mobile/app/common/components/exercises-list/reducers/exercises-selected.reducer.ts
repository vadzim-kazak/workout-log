import {createReducer} from '../../../util/createReducer';

export const exercisesSelectedReducer = createReducer<Array<any>>([], {
    
    ['EXERCISE_SELECT'](state, action) {
        let exercise = action.payload;
        return [...state, exercise];
    },

    ['EXERCISE_UNSELECT'](state, action) {
        let exerciseId = action.payload.id;
        let filteredState = state.filter(currentExercise => currentExercise.id !== exerciseId);
        return [...filteredState];
    },

    ['EXERCISES_SELECTION_RESET'](state, action) {
        return [];
    }

});