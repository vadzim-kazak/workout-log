import {Component} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {NavController, NavParams} from 'ionic-angular';
import {Toolbar} from '../../common/components/toolbar/toolbar.component';
import {Exercises} from '../exercises/exercises';
import {WorkoutCommonInfo} from './components/workout-common-info/workout-common-info.component';
import {WorkoutExercisesHeader} from './components/exercises-header/exercises-header.component';
import {ExercisesList} from '../../common/components/exercises-list/exercises-list.component';

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar, WorkoutCommonInfo, WorkoutExercisesHeader, ExercisesList],
  pipes: [TranslatePipe],
})
export class Workout {
  
  workoutType: string = 'oneTime';
  toolbarTitleKey: string = 'WORKOUT_TOOLBAR_TITLE';  
  exercisesSelected: Observable<any>;

  constructor(navParams: NavParams, private navController: NavController, private store: Store<any>) {
      this.exercisesSelected = store.select('exercisesSelected');  
      this.toolbarTitleKey = navParams.get('toolBarTitle');

      this.store.dispatch({type: 'EXERCISES_SELECTION_RESET'});  
  }
  
}
