import { ActionReducer, Action } from '@ngrx/store';

export function createReducer<T>(initialState: T, handlers) : ActionReducer<T> {
  
  return function (state: T = initialState, action: Action) {
    
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state;
    }
  }
  
}