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
// Reducers
import {workoutReducer} from './reducers/workout.reducer';

export const reducers = {
    workouts: workoutReducer,
}

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar, WorkoutCommonInfo, WorkoutExercisesHeader, ExercisesList],
  pipes: [TranslatePipe],
})
export class Workout {
  
  workout: any = {
    name: '',
    type: 'oneTime',
    startDate: moment().format(),
    customPeriod: 7 
  };

  toolbarTitleKey: string = 'WORKOUT_TOOLBAR_TITLE';  
  exercisesSelected: Observable<any>;
  isCustomNameSet: boolean = false;

  exercisesSubscription: Subscription; 

  constructor(navParams: NavParams, private navController: NavController, 
              private store: Store<any>, public platform: Platform,
              private translate: TranslateService) {
      
      this.exercisesSelected = store.select('exercisesSelected');  
      this.toolbarTitleKey = navParams.get('toolBarTitle');

      this.store.dispatch({type: 'EXERCISES_SELECTION_RESET'});
      this.exercisesSubscription = this.exercisesSelected.subscribe(this.generateWorkoutName);        
  }

  completeWorkoutCreation() {
 
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
    console.log(this.workout);
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
    this.exercisesSubscription.unsubscribe();
  }
  
}
