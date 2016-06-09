import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {Exercise} from '../../../exercise/exercise';
import {NavController} from 'ionic-angular';
import {Workout} from '../../../workout/workout.component';

@Component({
  selector: 'day-item',
  templateUrl: 'build/pages/workouts/components/day-item/day-item.html',
  pipes: [TranslatePipe]
})
export class DayItem {
  
  @Input() item;

  constructor(private navController: NavController) {}

  handleWorkoutClick() {
    this.navController.push(Workout);
  }
  
}