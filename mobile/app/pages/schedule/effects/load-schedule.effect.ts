import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects'
import {TranslateService} from 'ng2-translate/ng2-translate';
import * as moment from 'moment';

const MONTH_SCHEDULE_DAYS = 31;

@Injectable()
export class ScheduleEffects {
  
  constructor(private updates$: StateUpdates<any>, 
              private translate: TranslateService) {}

  @Effect() 
  load$ = this.updates$
          // Listen for the 'LOAD_SCHEDULE' action
          .whenAction('LOAD_SCHEDULE_BATCH')
          .map(payload => {
            let {seedDay} = payload.action.payload; 
            return  {type: 'LOAD_SCHEDULE_BATCH_SUCCESS', payload: this.populateCalendarMonth(seedDay)};
          });

  populateCalendarMonth(seedDay) {
    seedDay.add(1, 'days'); 
    let today = moment();
    let result = [];
    
    for (let i = 0; i < MONTH_SCHEDULE_DAYS; i++) {
      
      let day = seedDay.subtract(1, 'days');
      let scheduleItem = {
        day: moment(day),
        label: day.format('dd, DD')
      }

      if (day.isSame(today, 'day')) {
        scheduleItem.isToday = true;
      }
      
      result.push(scheduleItem);  
    }

    return result;
  }

}