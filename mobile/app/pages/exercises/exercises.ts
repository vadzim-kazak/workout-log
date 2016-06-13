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
import {exercisesSelectedReducer} from './reducers/exercises-selected.reducer';
// Components
import {ExercisesNavbar} from './components/navbar/exercises-navbar.component';
import {ExercisesList} from './components/list/exercises-list.component';
import {ExercisesFilter} from '../exercises-filter/exercises-filter';
// Services
import {ExercisesFilteringService} from './services/exercises-filtering.service';

export const reducers = {
    exercises: exercisesReducer,
    exercisesSearchQuery: exercisesSearchReducer,
    exercisesSelected: exercisesSelectedReducer
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
  exercisesEffectsSubscription: Subscription;
  filteringCriteriaSubscription: Subscription;
  isWorkoutCreationFlow: boolean = false;
  selectionResultContainer: {} 
  
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
      this.exercisesEffectsSubscription = exercisesEffects.load$.subscribe(store);
      this.store.dispatch({type: 'LOAD_EXERCISES'});

      let worklightCreationFlowParam = navParams.get('isWorkoutCreationFlow');
      if (worklightCreationFlowParam) {
          this.isWorkoutCreationFlow = true;
      } 

      this.selectionResultContainer = navParams.get('exercises');
  }
  
  searchExercises($event) {
     this.store.dispatch({type: 'UPDATE_EXERCISES_SEARCH_QUERY', 
                          payload:  $event.value})
  }
  
  selectExercise(exercisesId) {
    this.store.dispatch({type: 'EXERCISE_SELECT', 
                         payload:  exercisesId})
  }

  unselectExercise(exercisesId) {
    this.store.dispatch({type: 'EXERCISE_UNSELECT', 
                         payload:  exercisesId})
  }

  completeExerciseSelectionHandler() {
    
    this.exercisesSelected.subscribe(selectedExercises =>
      Object.keys(selectedExercises)
          .forEach(selectedExerciseId => this.selectionResultContainer[selectedExerciseId] = true)
    );
    console.log(this.selectionResultContainer);
    this.navController.pop();
  }

  ionViewWillEnter() {
     if (this.isWorkoutCreationFlow) {
       this.store.dispatch({type: 'EXERCISES_SELECTION_RESET'});
     }
  }
  
  ngOnDestroy() {
    // Manually unsubscribe effect
    this.exercisesEffectsSubscription.unsubscribe();
  }
  
}