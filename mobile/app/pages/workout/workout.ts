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

export const reducers = {
    workouts: workoutReducer
}

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar, WorkoutCommonInfo, WorkoutExercisesHeader, ExercisesList],
  pipes: [TranslatePipe],
  providers: [WorkoutEffects, StateUpdates]
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
  isWorkoutCreationFlow: boolean = true;

  subscriptions: Subscription[] = [];

  constructor(navParams: NavParams, private navController: NavController, 
              private store: Store<any>, public platform: Platform,
              private translate: TranslateService, workoutEffects: WorkoutEffects) {
      
      this.exercisesSelected = store.select('exercisesSelected');  

      let providedWorkout = navParams.get('workout');
      if (providedWorkout) {
        this.workout = providedWorkout;
        this.toolbarTitle = providedWorkout.name;
        this.isWorkoutCreationFlow = false;
        console.log(this.workout);
      } else {
        this.toolbarTitle = this.translate.instant('WORKOUT_NEW_TOOLBAR_TITLE');
      }

      this.store.dispatch({type: 'EXERCISES_SELECTION_RESET'});
      this.subscriptions.push(this.exercisesSelected.subscribe(this.generateWorkoutName));  
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

    let actionSheet = ActionSheet.create({
      title: this.translate.instant('WORKOUT_COMPLETE_ACTIONS_TITLE'),
      buttons: [
        {
          text: this.translate.instant('WORKOUT_COMPLETE_START_WORKOUT'),
          icon: !this.platform.is('ios') ? 'play' : null,
          cssClass: 'Workout-start',
          handler: () => {
            
          }
        },
        {
          text: this.translate.instant('WORKOUT_COMPLETE_SAVE'),
          icon:  !this.platform.is('ios') ? 'list' : null,
          cssClass: 'Workout-save',
          handler: () => {
            this.saveWorkout();  
          }
        },
        {
          text: this.translate.instant('WORKOUT_COMPLETE_CANCEL'),
          role: 'cancel',
          cssClass: 'Workout-cancel',
          icon:  !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            
          }
        }
      ]
    });
    this.navController.present(actionSheet);

  }

  saveWorkout() {
    
    // Populate workout by selected exercises
    this.exercisesSelected.subscribe(selectedExercises => this.workout.exercises = selectedExercises)
                          .unsubscribe();

    this.store.dispatch({type: 'WORKOUT_CREATE', payload: this.workout});
    this.navController.pop();
  }

  checkCustomNameProvision() {
    if (this.workout.name.length > 0) {
      this.isCustomNameSet = true;
    } else {
      this.isCustomNameSet = false;
    }
  }

  generateWorkoutName = (exercises) => {
    
    if (exercises.length > 0 && !this.isCustomNameSet) {
        let uniqueMusclesSet = new Set();
        exercises.forEach(current => {
          if (current.mainMuscles && current.mainMuscles.length > 0) {
            uniqueMusclesSet.add(current.mainMuscles[0].toUpperCase());
          }
        });

        // Convert set to array
        let uniqueMuscles = [];
        uniqueMusclesSet.forEach(muscle => uniqueMuscles.push(muscle));
        
        this.workout.name = uniqueMuscles.map(muscle => {
                                            let translated = this.translate.instant(muscle + '_SHORT')
                                            return translated.charAt(0).toUpperCase() + translated.slice(1); 
                                         })
                                         .join(', ');
    }
  }
  
  ngOnDestroy() {
    // Manually unsubscribe effect
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();  
    });
  }
  
}
