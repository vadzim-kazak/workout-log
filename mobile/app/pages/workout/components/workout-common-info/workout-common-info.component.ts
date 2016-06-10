import {Component} from '@angular/core';
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
  
  workoutType: string = 'oneTime';
  workoutStartDate: string = moment().format();
  dayShortNames = moment.weekdaysMin();
  monthNames = moment.months().map(month => month.charAt(0).toUpperCase() + month.slice(1));

  // Dirty hack which allows to use ionic-datetime picker component for numbers selection
  customPeriod: number = 7;
  customPeriodTime = moment().set('hour', this.customPeriod).format();
  pickerRange = [];

  constructor(navParams: NavParams, private navController: NavController) {

      // Populating picker range
      for (let i = 0; i < 31; i++) {
        this.pickerRange.push(i+1);    
      }
  }

  isCustomPeriodSetterVisible() {
      return this.workoutType === 'customPeriod';
  }

  fetchCustomPeriodTime($event) {
    this.customPeriod = $event.hour.value;   
  }
  
}
