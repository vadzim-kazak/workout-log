// Core
import {Component} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {StateUpdates} from '@ngrx/effects'
import {TranslateService} from 'ng2-translate/ng2-translate';
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
    exercisesSearchQuery: exercisesSearchReducer,
}

@Component({
  templateUrl: 'build/pages/exercises/exercises.html',
  providers: [ExercisesEffects, StateUpdates, ExercisesFilteringService],
  directives: [ExercisesNavbar, ExercisesList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercises {
  
  exercises: Observable<any>;
  exercisesEffectsSubscription: Subscription;
  filteringCriteriaSubscription: Subscription; 
  
  constructor(private store: Store<any>, exercisesEffects: ExercisesEffects, 
              filteringService: ExercisesFilteringService) {
      
      this.exercises = Observable.combineLatest(store.select('exercises'), 
                                                store.select('exercisesSearchQuery'),
                                                store.select('exercisesFilter'), 
                                                filteringService.searchByQuery);
      
      // Manually run effect subscription
      this.exercisesEffectsSubscription = exercisesEffects.load$.subscribe(store);
      this.store.dispatch({type: 'LOAD_EXERCISES'});
  }
  
  searchExercises($event) {
     this.store.dispatch({type: 'UPDATE_EXERCISES_SEARCH_QUERY', 
                          payload:  $event.value})
  }
  
  ngOnDestroy() {
    // Manually unsubscribe effect
    this.exercisesEffectsSubscription.unsubscribe();
  }
  
}