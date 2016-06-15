// Core
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {NavParams, NavController} from 'ionic-angular';
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
//import {ExercisesList} from './components/list/exercises-list.component';
import {ExercisesList} from '../../common/components/exercises-list/exercises-list.component';
import {ExercisesFilter} from '../exercises-filter/exercises-filter';
// Services
import {ExercisesFilteringService} from './services/exercises-filtering.service';

export const reducers = {
    exercises: exercisesReducer,
    exercisesSearchQuery: exercisesSearchReducer,
}

@Component({
  templateUrl: 'build/pages/exercises/exercises.html',
  providers: [ExercisesEffects, StateUpdates, ExercisesFilteringService],
  directives: [ExercisesNavbar, ExercisesList, ExercisesFilter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercises {
  
  exercises: Observable<any>;
  exercisesSelected: Observable<any>;
  subscriptions: Subscription[] = [];
  isWorkoutCreationFlow: boolean = false;
  
  constructor(private store: Store<any>, exercisesEffects: ExercisesEffects, 
              filteringService: ExercisesFilteringService,
              navParams: NavParams,
              private navController: NavController) {
      
      this.exercises = Observable.combineLatest(store.select('exercises'), 
                                                store.select('exercisesSearchQuery'),
                                                store.select('exercisesFilter'), 
                                                filteringService.searchByQuery);
      
      this.exercisesSelected = store.select('exercisesSelected');

      // Manually run effect subscription
      this.subscriptions.push(exercisesEffects.load$.subscribe(store));
      this.store.dispatch({type: 'LOAD_EXERCISES'});

      let worklightCreationFlowParam = navParams.get('isWorkoutCreationFlow');
      if (worklightCreationFlowParam) {
          this.isWorkoutCreationFlow = true;
      } 
  }
  
  searchExercises($event) {
     this.store.dispatch({type: 'UPDATE_EXERCISES_SEARCH_QUERY', 
                          payload:  $event.value})
  }
  
  completeExerciseSelectionHandler() {
    this.navController.pop();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}