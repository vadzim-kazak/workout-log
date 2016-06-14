import {Input, Output, EventEmitter, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {NormalizePipe} from '../../pipes/normalize.pipe';
import {ExercisesListItem} from './components/exercises-list-item/exercises-list-item.component';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {exercisesSelectedReducer} from './reducers/exercises-selected.reducer';

export const reducers = {
    exercisesSelected: exercisesSelectedReducer
}

@Component({
  selector: 'exercises-list',
  templateUrl: 'build/common/components/exercises-list/exercises-list.html',
  pipes: [NormalizePipe],
  directives: [ExercisesListItem]
})
export class ExercisesList {
  
  @Input() isWorkoutCreationFlow: boolean = false;
  @Input() showActionButton: boolean = true;
  @Input() exercises: Observable<any>;
  @Output() completeExerciseSelection = new EventEmitter();
  exercisesSelected: Observable<any>;
  exerciseSelect = new EventEmitter();
  exerciseUnselect = new EventEmitter();
    
  constructor(private translate: TranslateService, private store: Store<any>) {
       this.exercisesSelected = store.select('exercisesSelected');
  }
  
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

  checkExerciseSelection(exerciseId) {
    let isExercisesSelected = false;
    this.exercisesSelected.subscribe(exercises => {
      if (exercises.some(exercise => exercise.id === exerciseId)) {
        isExercisesSelected = true;
      }
    }).unsubscribe();

    return isExercisesSelected;
  }

  selectExercise(exercise) {
    this.store.dispatch({type: 'EXERCISE_SELECT', 
                         payload: exercise})
  }

  unselectExercise(exercise) {
    this.store.dispatch({type: 'EXERCISE_UNSELECT', 
                         payload: exercise})
  }

  getTranslateValue = (value) => {
     return this.translate.instant(value.toUpperCase());    
  }
  
}