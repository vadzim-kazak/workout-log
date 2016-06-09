import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {NavController, Modal} from 'ionic-angular';
import {Exercise} from '../../../exercise/exercise';

@Component({
  selector: 'day-item',
  templateUrl: 'build/pages/workouts/components/day-item/day-item.html',
  pipes: [TranslatePipe]
})
export class DayItem {
  
  @Input() item;
  
}