// Core
import {Page} from 'ionic-angular';
import {Observable, Subject, Subscription} from 'rxjs';
import {ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {StateUpdates} from '@ngrx/effects'
// Effects
import {ExercisesEffects} from './effects/load-exercises.effect';
// Reducers
import {exercisesReducer} from './reducers/exercises.reducer';
import {exercisesSearchReducer} from './reducers/exercises-search.reducer';
// Components
import {ExercisesNavbar} from './components/navbar/exercises-navbar.component';
import {ExercisesList} from './components/list/exercises-list.component';
// Services
import {ExercisesFilteringService} from './services/exercises-filtering.service';

export const reducers = {
    exercises: exercisesReducer,
    exercisesSearchQuery: exercisesSearchReducer 
}

@Page({
  templateUrl: 'build/pages/exercises/exercises.html',
  providers: [ExercisesEffects, StateUpdates, ExercisesFilteringService],
  directives: [ExercisesNavbar, ExercisesList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercises {
  
  exercises: Observable<any>;
  exercisesEffectsSubscription: Subscription;
  
  constructor(private store: Store<any>, exercisesEffects: ExercisesEffects, filteringSerivce: ExercisesFilteringService) {
      
      this.exercises = Observable.combineLatest(store.select('exercises'), 
                                                store.select('exercisesSearchQuery'), 
                                                filteringSerivce.searchByQuery);
      
      // Manually run effect subscription
      this.exercisesEffectsSubscription = exercisesEffects.load$.subscribe(store);
      this.store.dispatch({type: 'LOAD_EXERCISES'});
  }
  
  searchExercises($event) {
     this.store.dispatch({type: 'UPDATE_SEARCH_QUERY', 
                          payload:  $event.value})
  }
  
  ngOnDestroy() {
    // Manually unsubscribe effect
    this.exercisesEffectsSubscription.unsubscribe();
  }
  
}