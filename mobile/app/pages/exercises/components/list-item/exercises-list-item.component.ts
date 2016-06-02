import {Input, Output, EventEmitter, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {NavController} from 'ionic-angular';
import {Exercise} from '../../../exercise/exercise';
import {NormalizePipe} from '../../../../common/pipes/normalize.pipe';

@Component({
  selector: 'exercises-list-item',
  templateUrl: 'build/pages/exercises/components/list-item/exercises-list-item.html',
  pipes: [NormalizePipe]
})
export class ExercisesListItem {
  
  @Input() exercise;
  
  constructor(private navController: NavController) {}
  
  exerciseOnClick(exercise) {
     this.navController.push(Exercise, {exercise});
  }
  
}