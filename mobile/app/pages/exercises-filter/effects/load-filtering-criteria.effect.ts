import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects'

@Injectable()
export class FilteringCriteriaEffects {
  
  constructor(private updates$: StateUpdates<any>) {}
 
  @Effect() 
  load$ = this.updates$
               // Listen for the 'LOAD_EXERCISES' action
              .whenAction('LOAD_EXERCISES_SUCCESS') 
              .map(update => ({ type: 'SAVE_EXERCISES_FILTERING_CRITERIA', payload: this.fetchFilteringCriteria(update.action.payload)})); 
  
  fetchFilteringCriteria(exercises) {
    
    let types = new Set();
    let mechanics = new Set();
    let muscles = new Set();
    
    exercises.forEach(exercise => {
        
        if (exercise.type) {
            types.add(exercise.type.toUpperCase());            
        }
        
        if (exercise.mechanics) {
            mechanics.add(exercise.mechanics.toUpperCase());    
        }
        
        if (exercise.mainMuscles) {
            exercise.mainMuscles.forEach(muscle => muscles.add(muscle.toUpperCase()));    
        }
        
        if (exercise.otherMuscles) {
            exercise.otherMuscles.forEach(muscle => muscles.add(muscle.toUpperCase()));    
        }
        
    });
     
    return {
        types: this.setToArray(types),
        mechanics: this.setToArray(mechanics),
        muscles: this.setToArray(muscles)
    }
  }

  /**
   * Current version of es6 shim doesn't support set to array convertion via Array.from or spread operator 
   */
  setToArray(set){
      let result = [];
      set.forEach(value => result.push(value));
      return result;
  }
  
}
