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
  exercisesSelectedIds:string[];
  exerciseSelect = new EventEmitter();
  exerciseUnselect = new EventEmitter();
    
  subscriptions: any[] = [];

  constructor(private translate: TranslateService, private store: Store<any>) {
       this.exercisesSelected = store.select('exercisesSelected');
      //  this.subscriptions.push(
      //    this.exercisesSelected.subscribe(selectedExercises => {
      //      this.exercisesSelectedIds = selectedExercises.map(exercise => exercise.id); 
      //   }));
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

  // checkExerciseSelection(exercise) {
  //   return this.exercisesSelectedIds.some(id => id === exercise.id);
  // }

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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}