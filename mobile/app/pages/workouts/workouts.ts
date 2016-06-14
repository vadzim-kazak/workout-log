import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {NavController} from 'ionic-angular';
import * as moment from 'moment';
import {WeeksHeader} from './components/weeks-header/weeks-header.component';
import {DayItem} from './components/day-item/day-item.component';
import {Workout} from '../workout/workout';

@Component({
  templateUrl: 'build/pages/workouts/workouts.html',
  directives: [WeeksHeader, DayItem]
})
export class Workouts {
  
  items = [];
  workouts: any = [];
  
  constructor(private navController: NavController, private store: Store<any>) {
    let lastWeekDay = moment().endOf('week');
    this.populateCalendarMonth(lastWeekDay);
    // TODO unsubscription
    store.select('workouts').subscribe(workouts => {
      this.workouts = workouts

      this.items.forEach(item => {

           let assignedWorkouts = [];
           this.workouts.forEach(workout => {
            if (item.day.isSame(workout.startDate, 'day')) {
              assignedWorkouts.push(workout);
            }
          });

          if (assignedWorkouts.length > 0) {
            item.workouts = assignedWorkouts;  
          }

      });
    });
	
  }

  weeksHeader(item, index, items) {
    
    if (item.day.format('e') === '6') {
      let lastWeekDay = item.day;
      let firstWeekDay = moment(lastWeekDay).startOf('week');
      
      let week = `${lastWeekDay.format('dd, DD')} - ${firstWeekDay.format('dd, DD')}`; 
      let month = lastWeekDay.format('MMMM');
      let year = lastWeekDay.format('YYYY');

      return {week, month, year};
    }

    return null;
  }
  
  populateCalendarMonth(seedDay) {
      seedDay.add(1, 'days'); 
      for (let i = 0; i < 31; i++) {
        let day = seedDay.subtract(1, 'days');
        this.items.push({
          day: moment(day),
          label: day.format('dd, DD'),
        });
      }
  }
  
  doInfinite(infiniteScroll) {
    
    setTimeout(() => {
      
      let currentLast = this.items[this.items.length - 1];
      let seedDay = moment(currentLast.day);
      this.populateCalendarMonth(seedDay);
      infiniteScroll.complete();

    }, 1000);

  }

  addWorkoutClickHandler() {
    this.navController.push(Workout, {toolBarTitle: 'WORKOUT_NEW_TOOLBAR_TITLE'});
  }
}
