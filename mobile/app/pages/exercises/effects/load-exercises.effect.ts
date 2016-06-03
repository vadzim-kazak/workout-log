import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects'
import {TranslateService} from 'ng2-translate/ng2-translate';

@Injectable()
export class ExercisesEffects {
  
  constructor(private http: Http, private updates$: StateUpdates<any>, 
              private translate: TranslateService) {}

  @Effect() 
  load$ = this.updates$
          // Listen for the 'LOAD_EXERCISES' action
          .whenAction('LOAD_EXERCISES')
          .switchMap(payload => this.http.get('http://localhost:8080/api/v1/exercises?lang=' + this.translate.currentLang)
              // If successful, dispatch success action with result
              .map(res => ({ type: 'LOAD_EXERCISES_SUCCESS', payload: this.normalizeExercises(res.json()) }))
              // If request fails, dispatch failed action
              .catch(() => Observable.of({ type: 'LOAD_EXERCISES_FAILED' }))
          );
          
    normalizeExercises(exercises) {
        
        exercises.forEach(exercise => {
            if (exercise.mainMuscles && exercise.mainMuscles.length > 0) {
                exercise.mainMuscles = exercise.mainMuscles.map(muscle => muscle.toUpperCase()); 
            }
            
            if (exercise.type) {
                exercise.type = exercise.type.toUpperCase();
            }
            
            if (exercise.mechanics) {
                exercise.mechanics = exercise.mechanics.toUpperCase();  
            }
        });
        
        // Sort exercises by target muscle
        exercises.sort((first, second) => {
            
            let translatedFirst = this.translate.instant(first.mainMuscles[0]); 
            let translatedSecond = this.translate.instant(second.mainMuscles[0]);
            
            if(translatedFirst < translatedSecond) return -1;
            if(translatedFirst > translatedSecond) return 1;
            
            if (translatedFirst === translatedSecond) {
                
                let firstMechanics = first.mechanics;
                let secondMechanics = second.mechanics;
                
                // Compound before isolated
                if (firstMechanics > secondMechanics) return 1;
                if (firstMechanics < secondMechanics) return -1;
                
                return 0;
            }
            
        });
        
        return exercises;
    }          
}