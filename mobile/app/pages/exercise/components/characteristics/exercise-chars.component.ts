import {Component, Input} from '@angular/core';
import {NormalizePipe} from '../../../../common/pipes/normalize.pipe';

@Component({
  selector:'exercise-chars',
  templateUrl: 'build/pages/exercise/components/characteristics/exercise-chars.html',
  pipes: [NormalizePipe]
})
export class ExerciseCharacteristics {

  @Input() exercise;
  
  checkOtherMuscles() {
      return this.exercise.otherMuscles && this.exercise.otherMuscles.length > 0 
  }
  
}