import {Component, Input} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NavController, Modal} from 'ionic-angular';
import {ExerciseRecords} from '../exercise-records/exercise-records.component';
import {Exercise} from '../../../exercise/exercise';

@Component({
  selector:'active-exercises',
  templateUrl: 'build/pages/workout/components/active-exercises/active-exercises.html',
  pipes: [TranslatePipe]
})
export class ActiveExercises {

    @Input() exercises: any[] = [];

    constructor(private navController: NavController) {}

    forwardToExerciseRecords(exercise) {
        let recordsModal = Modal.create(ExerciseRecords, {exercise});
        this.navController.present(recordsModal);    
    }

    showExerciseDescription(exercise) {
        let exerciseModal = Modal.create(Exercise, {exercise});
        this.navController.present(exerciseModal);
    }
    
}