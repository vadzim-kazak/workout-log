import {createReducer} from '../../../common/util/create-reducer';

export const scheduleReducer = createReducer<Array<any>>([], {
    
    ['LOAD_SCHEDULE_BATCH_SUCCESS'](state, action) {
        
        let scheduleBatch = action.payload;
        return [...state, ...scheduleBatch];
    }
});