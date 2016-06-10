import {Input, Output, EventEmitter, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {NormalizePipe} from '../../../../common/pipes/normalize.pipe';
import {ExercisesListItem} from '../list-item/exercises-list-item.component';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'exercises-list',
  templateUrl: 'build/pages/exercises/components/list/exercises-list.html',
  pipes: [NormalizePipe],
  directives: [ExercisesListItem]
})
export class ExercisesList {
  
  @Input() exercises: Observable<any>;
  @Input() isWorkoutCreationFlow;
  
  constructor(private translate: TranslateService) { }
  
  exerciseGroupHeader = (exercise, exerciseIndex, exercises) => {
      
      if (exerciseIndex > 0) {
        let previousExercise = exercises[exerciseIndex - 1];
        if (exercise.mainMuscles[0] !== previousExercise.mainMuscles[0]) {
            return this.getTranslateValue(exercise.mainMuscles[0]);    
        }
      } else {
        // First exercise in the list
        return this.getTranslateValue(exercise.mainMuscles[0]);
      }
      
      return null;
  }
  
  getTranslateValue = (value) => {
     return this.translate.instant(value.toUpperCase());    
  }
  
}