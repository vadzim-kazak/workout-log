import {createReducer} from '../../../common/util/createReducer';

export const exercisesSelectedReducer = createReducer<{}>({}, {
    
    ['EXERCISE_SELECT'](state, action) {
        let exerciseId = action.payload;
        let newState = {};
        newState[exerciseId] = true;
        return Object.assign({}, state, newState);
    },

    ['EXERCISE_UNSELECT'](state, action) {
        let exerciseId = action.payload;
        let newState = Object.assign({}, state);
        delete newState[exerciseId];
        return newState;
    },

    ['EXERCISES_SELECTION_RESET'](state, action) {
        return {};
    }

});