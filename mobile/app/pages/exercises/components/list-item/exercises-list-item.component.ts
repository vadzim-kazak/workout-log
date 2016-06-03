import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {NavController} from 'ionic-angular';
import {Exercise} from '../../../exercise/exercise';

@Component({
  selector: 'exercises-list-item',
  templateUrl: 'build/pages/exercises/components/list-item/exercises-list-item.html',
  pipes: [TranslatePipe]
})
export class ExercisesListItem {
  
  @Input() exercise;
  
  constructor(private navController: NavController) {}
  
  exerciseOnClick(exercise) {
     this.navController.push(Exercise, {exercise});
  }
  
}