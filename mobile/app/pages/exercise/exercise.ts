import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {NormalizePipe} from '../../common/pipes/normalize.pipe';
import {ExerciseCharacteristics} from './components/characteristics/exercise-chars.component';
import {ExerciseSteps} from './components/steps/exercise-steps.component';
import {Toolbar} from '../../common/components/toolbar/toolbar.component'; 

@Component({
  templateUrl: 'build/pages/exercise/exercise.html',
  pipes: [NormalizePipe],
  directives: [ExerciseCharacteristics, ExerciseSteps, Toolbar]
})
export class Exercise {

  exercise;
  
  constructor(navParams: NavParams) {
    this.exercise = navParams.get("exercise");    
  }
  
}