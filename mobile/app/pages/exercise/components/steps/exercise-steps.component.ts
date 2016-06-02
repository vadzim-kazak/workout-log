import {Component, Input} from '@angular/core';

@Component({
  selector:'exercise-steps',
  templateUrl: 'build/pages/exercise/components/steps/exercise-steps.html'
})
export class ExerciseSteps {
  @Input() exercise;
}