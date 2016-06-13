import {Component, Input} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NavController} from 'ionic-angular';
import {Exercises} from '../../../exercises/exercises';

@Component({
  selector:'workout-exercises-header',
  templateUrl: 'build/pages/workout/components/exercises-header/exercises-header.html',
  pipes: [TranslatePipe]
})
export class WorkoutExercisesHeader {

  @Input() exercises;

  constructor(private navController: NavController) {}

  forwardToExercises() {
    this.navController.push(Exercises, {isWorkoutCreationFlow: true, exercises: this.exercises});
  }
  
}