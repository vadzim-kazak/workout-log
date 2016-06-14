import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {NavController, Modal} from 'ionic-angular';
import {Exercise} from '../../../../../pages/exercise/exercise';

@Component({
  selector: 'exercises-list-item',
  templateUrl: 'build/common/components/exercises-list/components/exercises-list-item/exercises-list-item.html',
  pipes: [TranslatePipe]
})
export class ExercisesListItem {
  
  @Input() exercise;
  @Input() isWorkoutCreationFlow;
  @Input() isSelected;
  @Output() exerciseSelect = new EventEmitter();
  @Output() exerciseUnselect = new EventEmitter();
  
  constructor(private navController: NavController) {}
  
  exerciseOnClick(exercise) {
     let modal = Modal.create(Exercise, {exercise});
     this.navController.present(modal);
  }

  selectExercise($event, exerciseId) {
    $event.stopPropagation();
    this.exerciseSelect.emit(exerciseId);
  }

  unselectExercise($event, exerciseId) {
    $event.stopPropagation();
    this.exerciseUnselect.emit(exerciseId);
  }
  
}