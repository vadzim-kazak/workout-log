import {Component} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {NavController, NavParams, ActionSheet, Platform} from 'ionic-angular';
import {StateUpdates} from '@ngrx/effects'
// Components
import {Toolbar} from '../../common/components/toolbar/toolbar.component';
import {Exercises} from '../exercises/exercises';
import {WorkoutCommonInfo} from './components/workout-common-info/workout-common-info.component';
import {WorkoutExercisesHeader} from './components/exercises-header/exercises-header.component';
import {ExercisesList} from '../../common/components/exercises-list/exercises-list.component';
import {ActiveExercises} from './components/active-exercises/active-exercises.component.ts';
// Util
import {equals} from '../../common/util/compare-objects';
// Reducers
import {workoutReducer} from './reducers/workout.reducer';
import {untisOfMeasuresReducer} from './reducers/units-of-measures.reducer';
// Effects
import {WorkoutEffects} from './effects/workouts-manager.effect';
import {UnitsOfMeasuresEffects} from './effects/units-of-measure-load.effect';
// Services
import {WorkoutActionsProvider} from './services/workout-actions.provider';
import {WorkoutNameGenerator} from './services/workout-name.generator';

export const reducers = {
    workouts: workoutReducer,
    unitsOfMeasures: untisOfMeasuresReducer
}

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar, WorkoutCommonInfo, WorkoutExercisesHeader, ExercisesList, ActiveExercises],
  pipes: [TranslatePipe],
  providers: [WorkoutEffects, StateUpdates, WorkoutActionsProvider, WorkoutNameGenerator, UnitsOfMeasuresEffects]
})
export class Workout {
  
  workout: any = {
    name: '',
    type: 'oneTime',
    state: 'template',     
    startDate: moment().format(),
    customPeriod: 7 
  };
  initialWorkout: any;
  providedScheduleDay: any;
  

  toolbarTitle: string;  
  exercisesSelected: Observable<any>;
  isCustomNameSet: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(navParams: NavParams, private navController: NavController, 
              private store: Store<any>, public platform: Platform,
              private translate: TranslateService, workoutEffects: WorkoutEffects,
              unitsOfMeasuresEffects: UnitsOfMeasuresEffects,
              private workoutActionsProvider: WorkoutActionsProvider,
              workoutNameGenerator: WorkoutNameGenerator) {
      
      this.exercisesSelected = store.select('exercisesSelected'); 
      let providedWorkout = navParams.get('workout');
      if (providedWorkout) {
        this.isCustomNameSet = true;
        this.workout = providedWorkout;
        this.toolbarTitle = providedWorkout.name;

        if (this.workout.state === 'template') {
          // Workout edit mode
          this.store.dispatch({type: 'EXERCISES_SELECTION_POPULATE', payload: this.workout.exercises});
          this.initialWorkout = Object.assign({}, providedWorkout);
          this.providedScheduleDay = navParams.get('day');
        } else {
          // Workout active mode
        } 

      } else {
        // Workout creation mode 
        this.toolbarTitle = this.translate.instant('WORKOUT_NEW_TOOLBAR_TITLE');
        this.store.dispatch({type: 'EXERCISES_SELECTION_RESET'});
      }

      // Workout name generation logic
      this.subscriptions.push(this.exercisesSelected.subscribe(
        exercises => {
          if (!this.isCustomNameSet) {
            this.workout.name = workoutNameGenerator.generate(exercises);
          }
        }));  
      this.subscriptions.push(workoutEffects.save$.subscribe(store));
      this.subscriptions.push(unitsOfMeasuresEffects.load$.subscribe(store));
      
      this.store.select('unitsOfMeasures').subscribe(units => {
        if (Object.keys(units).length === 0) {
          this.store.dispatch({type: 'LOAD_UNITS_OF_MEASURES'});
        }
      }).unsubscribe();

  }

  completeWorkoutCreation() {

    let today = moment(); 
    if (today.isSame(this.workout.startDate, 'day') || // Create flow case
       (today.isSame(this.providedScheduleDay))) { // Edit flow case 
      
      // Workout has been created for today or starting from current day.
      // So, there can be some options just to save workout or save & start it immediately
      this.proposeCompleteWorkoutActions();

    } else if(today.isBefore(this.workout.startDate, 'day') || // Create flow case
             (today.isBefore(this.providedScheduleDay, 'day'))) {   // Edit flow case

      // Workout starting date in future. So, just saving workout and exit 
      this.saveWorkout();
    }  
    
  }

  proposeCompleteWorkoutActions() {
    let actionSheet = ActionSheet.create(this.workoutActionsProvider.getActionsConfig(null, this.saveWorkout));
    this.navController.present(actionSheet);
  }

  saveWorkout = () => {
    
    // Populate workout by selected exercises
    this.exercisesSelected.subscribe(selectedExercises => this.workout.exercises = selectedExercises)
                          .unsubscribe();

    
    // Proceed only in case of some changes in workout 
    if (!(this.initialWorkout && equals(this.initialWorkout, this.workout))) {

       if (this.workout.id) {
        // Workout edit flow of some oneTime workout or all workouts of some type
        this.store.dispatch({type: 'WORKOUT_UPDATE', payload: this.workout});
       } else {
          // Workout create flow or edit of some particular periodic workout
          this.store.dispatch({type: 'WORKOUT_CREATE', payload: this.workout});
          let parent = this.workout.parent; 
          // Edit of some particular periodic workout
          if (parent && !moment(this.workout.startDate).isSame(parent.startDate, 'day')) {
            // Some particular periodic timeout has been moved to some other day.
            // We need to create some oneTime deleted workout and put it to the original day
            // in order to not populate it one more time by original periodic workout 
            let deletedWorkout = Object.assign({}, parent);
            deletedWorkout.type = 'oneTime';
            deletedWorkout.templateId = parent.id;
            deletedWorkout.state = 'deleted';
            this.store.dispatch({type: 'WORKOUT_CREATE', payload: deletedWorkout});  
          }
       } 

    }
    
    
    this.navController.pop();
  }

  checkCustomNameProvision() {
    this.isCustomNameSet = this.workout.name.length > 0;
  }

  ngOnDestroy() {
    // Manually unsubscribe effect
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();  
    });
  }
  
}
