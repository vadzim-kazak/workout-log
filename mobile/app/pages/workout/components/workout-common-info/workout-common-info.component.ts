import {Component, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {NavController, NavParams} from 'ionic-angular';
import {Exercises} from '../../../exercises/exercises';

@Component({
  selector:'workout-common-info',
  templateUrl: 'build/pages/workout/components/workout-common-info/workout-common-info.html',
  pipes: [TranslatePipe]
})
export class WorkoutCommonInfo {
  
  // Default workout object
  @Input() workout: any = {};
  @Output() nameInputBlurEvent = new EventEmitter();

  dayShortNames = moment.weekdaysMin();
  monthNames = moment.months().map(month => month.charAt(0).toUpperCase() + month.slice(1));

  // Dirty hack which allows to use ionic-datetime picker component for numbers selection
  customPeriodTime = moment().set('hour', 7).format();
  pickerRange = [];

  constructor(navParams: NavParams, private navController: NavController) {

      // Populating picker range
      for (let i = 0; i < 31; i++) {
        this.pickerRange.push(i+1);    
      }
  }

  isCustomPeriodSetterVisible() {
      return this.workout.type === 'customPeriod';
  }

  fetchCustomPeriodTime($event) {
    this.workout.customPeriod = $event.hour.value;   
  }
  
}
