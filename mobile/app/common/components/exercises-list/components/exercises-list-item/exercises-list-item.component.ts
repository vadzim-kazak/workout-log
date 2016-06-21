import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable, Subscription} from 'rxjs';
import {NavController, Modal} from 'ionic-angular';
import {Exercise} from '../../../../../pages/exercise/exercise';
import {Store} from '@ngrx/store';

@Component({
  selector: 'exercises-list-item',
  templateUrl: 'build/common/components/exercises-list/components/exercises-list-item/exercises-list-item.html',
  pipes: [TranslatePipe]
})
export class ExercisesListItem {
  
  @Input() exercise;
  @Input() isWorkoutCreationFlow;
  @Output() exerciseSelect = new EventEmitter();
  @Output() exerciseUnselect = new EventEmitter();
  
  isSelected: boolean = false;
  subscriptions:Subscription[] = [];

  constructor(private navController: NavController, private store: Store<any>) {}
  
  ngOnInit() {
     // Temporary workaround until Ionic 2 Virtuall scroll list issue fix
     // TODO provide isSelected from parent component
     this.subscriptions.push(
       (<Observable<any>>this.store.select('exercisesSelected')).subscribe(exercises => {
          this.isSelected = exercises.some(current => current.id === this.exercise.id);
       })
     );
  }

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

  
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}