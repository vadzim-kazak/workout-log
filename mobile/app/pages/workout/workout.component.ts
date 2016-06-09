import {Component} from '@angular/core';
import * as moment from 'moment';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Toolbar} from '../../common/components/toolbar/toolbar.component';

@Component({
  templateUrl: 'build/pages/workout/workout.html',
  directives: [Toolbar],
  pipes: [TranslatePipe]
})
export class Workout {
  
  workoutType: string = 'oneTime';
  
  // Dirty hack which allows to use ionic-datetime picker component for numbers selection
  customPeriod: number = 7;
  customPeriodTime = moment().set('hour', this.customPeriod).format();
  pickerRange = [];


  constructor() {

      // Populating picker range
      for (let i = 0; i < 31; i++) {
        this.pickerRange.push(i+1);    
      }

  }

  isCustomPeriodVisible() {
      return this.workoutType === 'customPeriod';
  }

  fetchCustomPeriodTime($event) {
    this.customPeriod = $event.hour.value;   
  }
  
  
}
