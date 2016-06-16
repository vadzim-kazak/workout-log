import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {NavController, ActionSheet, Platform} from 'ionic-angular';
import * as moment from 'moment';
import {StateUpdates} from '@ngrx/effects'
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
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
              workoutsInjectorService: WorkoutsInjectorService, workoutEffects: WorkoutEffects,
              private translate: TranslateService,
              private platform: Platform) {
    
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
    this.navController.push(Workout);
  }

  proceedToWorkout({workout, day}) {
    let workoutToProceed = workout; 
    if (workoutToProceed.state === 'template') {
      workoutToProceed = Object.assign({}, workout);
      workoutToProceed.state = 'active';
      workoutToProceed.startDate = moment(day).format();
    }
    this.navController.push(Workout, {workout: workoutToProceed});  
  }

  showTemplateActions({workout, day}) {

    let deleteButton = (message, handler) => {
      return {
          text: this.translate.instant(message),
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          cssClass: 'WorkoutAction-delete',
          handler
        } 
    }

    let editButton = (message, handler) => {
      return {
          text: this.translate.instant(message),
          icon: !this.platform.is('ios') ? 'create' : null,
          cssClass: 'WorkoutAction-edit',
          handler
        } 
    }
    
    let buttons = [];
    if (workout.type === 'oneTime') {
      buttons.push(
        deleteButton('WORKOUT_TEMPLATE_ACTIONS_DELETE', () => {})  
      );  
    } else {
      buttons.push(
        deleteButton('WORKOUT_TEMPLATE_ACTIONS_DELETE_CURRENT', () => {})  
      );
      buttons.push(
        deleteButton('WORKOUT_TEMPLATE_ACTIONS_DELETE_ALL', () => {})  
      );
    }

    if (workout.type === 'oneTime') {
      buttons.push(
        editButton('WORKOUT_TEMPLATE_ACTIONS_EDIT', () => {})  
      );  
    } else {
      buttons.push(
        editButton('WORKOUT_TEMPLATE_ACTIONS_EDIT_CURRENT', () => {})  
      );
      buttons.push(
        editButton('WORKOUT_TEMPLATE_ACTIONS_EDIT_ALL', () => {})  
      );
    }

    buttons.push(
      {
          text: this.translate.instant('WORKOUT_TEMPLATE_ACTIONS_CANCEL'),
          role: 'cancel',
          cssClass: 'WorkoutAction-cancel',
          icon:  !this.platform.is('ios') ? 'close' : null,
          handler: () => {}
      }
    );    
    
    let actionSheet = ActionSheet.create({
      title: this.translate.instant('WORKOUT_TEMPLATE_ACTIONS_TITLE'),
      buttons
    });
    this.navController.present(actionSheet);

  }

  ngOnDestroy() {
    // Manually unsubscribe effect
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
