import {Input, Output, EventEmitter, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {NormalizePipe} from '../../../../common/pipes/normalize.pipe';
import {ExercisesListItem} from '../list-item/exercises-list-item.component';

@Component({
  selector: 'exercises-list',
  templateUrl: 'build/pages/exercises/components/list/exercises-list.html',
  pipes: [NormalizePipe],
  directives: [ExercisesListItem]
})
export class ExercisesList {
  
  @Input() exercises: Observable<any>;
  
  exerciseGroupHeader(exercise, exerciseIndex, exercises) {
      
      if (exerciseIndex > 0) {
        let previousExercise = exercises[exerciseIndex - 1];
        if (exercise.mainMuscles[0] !== previousExercise.mainMuscles[0]) {
            return exercise.mainMuscles[0];      
        }
      } else {
        // First exercise in the list
        return exercise.mainMuscles[0];
      }
      
      return null;
  }
  
  
}