import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Store} from '@ngrx/store';
import {Platform, NavController} from 'ionic-angular';
import {Workout} from '../../workout/workout';

@Injectable()
export class WorkoutsActionsProvider {
    
    constructor(private translate: TranslateService, private store: Store<any>, 
                private platform: Platform, private navController: NavController) {}
    
    getActionsConfig(workout, day) {

        let buttons = [];
        
        // Delete buttons
        if (workout.type === 'oneTime') {
            
            buttons.push(
                this.createDeleteButton('WORKOUT_TEMPLATE_ACTIONS_DELETE', () => {
                    // Handling one time workout delete
                    this.store.dispatch({type: 'WORKOUT_DELETE', payload: workout});   
                })  
            );

        } else {
            
            buttons.push(
                this.createDeleteButton('WORKOUT_TEMPLATE_ACTIONS_DELETE_CURRENT', () => {
                   // Handling delete of some particular periodic workout  
                    let newWorkout = Object.assign({}, workout);
                    newWorkout.type = 'oneTime';
                    newWorkout.startDate = day.format();
                    newWorkout.templateId = workout.id;
                    newWorkout.state = 'deleted';
                    this.store.dispatch({type: 'WORKOUT_CREATE', payload: newWorkout});   
                })
            );
            
            buttons.push(
                this.createDeleteButton('WORKOUT_TEMPLATE_ACTIONS_DELETE_ALL', () => {
                     // Handling delete of all periodic workouts of some type 
                    this.store.dispatch({type: 'WORKOUT_DELETE', payload: workout});   
                })  
            );
        }

        // Edit buttons
        if (workout.type === 'oneTime') {
            
            buttons.push(
                // Handling one time workout edit 
                this.createEditButton('WORKOUT_TEMPLATE_ACTIONS_EDIT', () => {
                    this.navController.push(Workout, {workout});
                })  
            );

        } else {
            
            buttons.push(
                // Handling edit of some particular periodic workout
                this.createEditButton('WORKOUT_TEMPLATE_ACTIONS_EDIT_CURRENT', () => {
                    let workoutToProceed = Object.assign({}, workout);
                    workoutToProceed.templateId = workoutToProceed.id; 
                   // workoutToProceed.template = workout;
                    delete workoutToProceed.id;
                    workoutToProceed.type = 'oneTime';
                    workoutToProceed.startDate = day.format();
                    this.navController.push(Workout, {workout:workoutToProceed});
                })  
            );
            
            buttons.push(
                // Handling edit of all periodic workouts of some type
                this.createEditButton('WORKOUT_TEMPLATE_ACTIONS_EDIT_ALL', () => {
                     this.navController.push(Workout, {workout});
                })  
            );
        }

        // Cancel button
        buttons.push(
            this.createCancelButton()
        ); 

        return {
          title: this.translate.instant('WORKOUT_TEMPLATE_ACTIONS_TITLE'),
          buttons
        };
    }

    createDeleteButton(message, handler) {
      
      return {
          text: this.translate.instant(message),
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          cssClass: 'WorkoutAction-delete',
          handler
      } 
    }

    createEditButton(message, handler) {
      
      return {
          text: this.translate.instant(message),
          icon: !this.platform.is('ios') ? 'create' : null,
          cssClass: 'WorkoutAction-edit',
          handler
        } 
    }

    createCancelButton() {

        return  {
            text: this.translate.instant('WORKOUT_TEMPLATE_ACTIONS_CANCEL'),
            role: 'cancel',
            cssClass: 'WorkoutAction-cancel',
            icon:  !this.platform.is('ios') ? 'close' : null,
            handler: () => {}
        }
    }

}