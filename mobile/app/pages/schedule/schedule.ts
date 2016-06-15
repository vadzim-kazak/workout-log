import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {NavController} from 'ionic-angular';
import * as moment from 'moment';
import {StateUpdates} from '@ngrx/effects'
// Components
import {WeeksHeader} from './components/weeks-header/weeks-header.component';
import {DayItem} from './components/day-item/day-item.component';
import {Workout} from '../workout/workout';
// Reducers
import {scheduleReducer} from './reducers/schedule.reducer';
// Effects
import {ScheduleEffects} from './effects/load-schedule.effect';
import {WorkoutEffects} from '../workout/effects/workouts-manager.effect';
// Services
import {WorkoutsInjectorService} from './services/workouts-injector.service';

export const reducers = {
    schedule: scheduleReducer
}

@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
  directives: [WeeksHeader, DayItem],
  providers: [StateUpdates, ScheduleEffects, WorkoutEffects, WorkoutsInjectorService]
})
export class Schedule {
  
  schedule: Observable<any>;
  scheduleDays: Array<any> = [];
  subscriptions: Subscription[] = [];

  constructor(private navController: NavController, private store: Store<any>, 
              private scheduleEffects: ScheduleEffects, 
              workoutsInjectorService: WorkoutsInjectorService, workoutEffects: WorkoutEffects) {
    
    this.schedule = Observable.combineLatest(store.select('schedule'), 
                                             store.select('workouts'),
                                             workoutsInjectorService.process);
    
    this.subscriptions.push(this.schedule.subscribe(days => this.scheduleDays = days));
    
    // Effects subscriptions
    this.subscriptions.push(scheduleEffects.load$.subscribe(store));
    this.subscriptions.push(workoutEffects.load$.subscribe(store));

    //let lastWeekDay = moment().endOf('week');
    let lastWeekDay = moment().endOf('week').add(1, 'days').endOf('week');
    store.dispatch({type: 'LOAD_SCHEDULE_BATCH', payload: {seedDay: lastWeekDay}});
    // Loading workouts
    store.dispatch({type: 'WORKOUTS_LOAD'});
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
  
  doInfinite(infiniteScroll) {
    
    setTimeout(() => {
      
      let currentLast = this.scheduleDays[this.scheduleDays.length - 1];
      let seedDay = moment(currentLast.day);
      this.store.dispatch({type: 'LOAD_SCHEDULE_BATCH', payload: {seedDay}});
      infiniteScroll.complete();

    }, 500);

  }

  addWorkoutClickHandler() {
    this.navController.push(Workout, {toolBarTitle: 'WORKOUT_NEW_TOOLBAR_TITLE'});
  }

  ngOnDestroy() {
    // Manually unsubscribe effect
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
