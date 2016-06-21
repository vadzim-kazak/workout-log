import {Component} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {NavController, NavParams, ActionSheet, Platform} from 'ionic-angular';
import {Toolbar} from '../../common/components/toolbar/toolbar.component';
import {Exercises} from '../exercises/exercises';
import {WorkoutCommonInfo} from './components/workout-common-info/workout-common-info.component';
import {WorkoutExercisesHeader} from './components/exercises-header/exercises-header.component';
import {ExercisesList} from '../../common/components/exercises-list/exercises-list.component';
import {StateUpdates} from '@ngrx/effects'
// Reducers
import {workoutReducer} from './reducers/workout.reducer';
// Effects
import {WorkoutEffects} from './effects/workouts-manager.effect';
// Services
import {WorkoutActionsProvider} from './services/workout-actions.provider';
import {WorkoutNameGenerator} from './services/workout-name.generator';

export const reducers = {
    workouts: workoutReducer
}

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar, WorkoutCommonInfo, WorkoutExercisesHeader, ExercisesList],
  pipes: [TranslatePipe],
  providers: [WorkoutEffects, StateUpdates, WorkoutActionsProvider, WorkoutNameGenerator]
})
export class Workout {
  
  workout: any = {
    name: '',
    type: 'oneTime',
    state: 'template',     
    startDate: moment().format(),
    customPeriod: 7 
  };

  toolbarTitle: string;  
  exercisesSelected: Observable<any>;
  isCustomNameSet: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(navParams: NavParams, private navController: NavController, 
              private store: Store<any>, public platform: Platform,
              private translate: TranslateService, workoutEffects: WorkoutEffects,
              private workoutActionsProvider: WorkoutActionsProvider,
              workoutNameGenerator: WorkoutNameGenerator) {
      
      let providedWorkout = navParams.get('workout');
      if (providedWorkout) {
        this.isCustomNameSet = true;
        this.workout = providedWorkout;
        this.toolbarTitle = providedWorkout.name;

        if (this.workout.state === 'template') {
          // Workout edit mode
          this.store.dispatch({type: 'EXERCISES_SELECTION_POPULATE', payload: this.workout.exercises});
        } 

      } else {
        // Workout creation mode 
        this.toolbarTitle = this.translate.instant('WORKOUT_NEW_TOOLBAR_TITLE');
        this.store.dispatch({type: 'EXERCISES_SELECTION_RESET'});
      }

      this.exercisesSelected = store.select('exercisesSelected');  
      this.subscriptions.push(this.exercisesSelected.subscribe(
        exercises => {
          if (!this.isCustomNameSet) {
            this.workout.name = workoutNameGenerator.generate(exercises);
          }
        }));  
      this.subscriptions.push(workoutEffects.save$.subscribe(store));
  }

  completeWorkoutCreation() {

    let today = moment(); 
    if (today.isSame(this.workout.startDate, 'day')) {
      
      // Workout has been created for today or starting from current day.
      // So, there can be some options just to save workout or save & start it immediately
      this.proposeCompleteWorkoutActions();

    } else if(today.isBefore(this.workout.startDate, 'day')){

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

    if (this.workout.id) {
        // Workout edit flow
        this.store.dispatch({type: 'WORKOUT_UPDATE', payload: this.workout});
    } else {
        // Workout create flow or edit of some particular periodic workout
        this.store.dispatch({type: 'WORKOUT_CREATE', payload: this.workout});
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
