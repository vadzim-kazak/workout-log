import {Component} from '@angular/core';
import * as moment from 'moment';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {NavController, NavParams} from 'ionic-angular';
import {Toolbar} from '../../common/components/toolbar/toolbar.component';
import {Exercises} from '../exercises/exercises';
import {WorkoutCommonInfo} from './components/workout-common-info/workout-common-info.component';
import {WorkoutExercisesHeader} from './components/exercises-header/exercises-header.component';

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar, WorkoutCommonInfo, WorkoutExercisesHeader],
  pipes: [TranslatePipe],
})
export class Workout {
  
  workoutType: string = 'oneTime';
  toolbarTitleKey: string = 'WORKOUT_TOOLBAR_TITLE';  

  constructor(navParams: NavParams, private navController: NavController) {
      this.toolbarTitleKey = navParams.get('toolBarTitle');    
  }

 
  
}
