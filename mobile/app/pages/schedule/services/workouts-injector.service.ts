import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class WorkoutsInjectorService {
    
    process = (scheduleDays: any[], workouts: any[]) => {

        scheduleDays.forEach(scheduleDay => {
            // Resetting workouts for each schedule day
            scheduleDay.workouts = [];
            workouts.forEach(workout => {
                this.processWorkoutDayPair(scheduleDay, workout);    
            });
        });
        
        return [...scheduleDays.map(day => Object.assign({}, day))];
    }

    processWorkoutDayPair(scheduleDay, workout) {

        if (workout.type === 'oneTime') {
            this.processOneTimeWorkoutDayPair(scheduleDay, workout);   
        } else if (workout.type === 'weekly' || workout.type === 'customPeriod') {
            this.processPeriodicWorkoutDayPair(scheduleDay, workout);
        } 
    }

    processOneTimeWorkoutDayPair(scheduleDay, workout) {
        
        if (scheduleDay.day.isSame(workout.startDate, 'day')) {

            if (workout.state !== 'template') {
                // Workout is active and contains some records, so it can be shown witout any restrictions at any time
                this.assignWorkout(scheduleDay, workout);
            } else if ((<any>moment()).isSameOrBefore(workout.startDate, 'day')) {
                // Workout is a template and can be shown only today or in future
                this.assignWorkout(scheduleDay, workout);
            }
        } 
    }

    processPeriodicWorkoutDayPair(scheduleDay, workout) {

        if (workout.state !== 'deleted') {

            if (workout.state !== 'template' && 
                scheduleDay.day.isSame(workout.startDate, 'day')) {
                // Workout is active and contains some records, so it can be shown witout any restrictions at any time              
                this.assignWorkout(scheduleDay, workout);
                return;
            }

            if (workout.state === 'template' && (<any>moment()).isSameOrBefore(scheduleDay.day, 'day')) {
                // Handling template workout
                let workoutStartDate = moment(workout.startDate);
                let daysDelta = scheduleDay.day.diff(workoutStartDate, 'days');
                if (daysDelta % workout.customPeriod === 0) {
                    this.assignWorkout(scheduleDay, workout);   
                }
            }

        }
    }

    assignWorkout(scheduleDay, workout) {
        
        if (!scheduleDay.workouts) {
            scheduleDay.workouts = [];
        }
        
        if (!this.checkWorkoutPresense(scheduleDay, workout)) {
             
             scheduleDay.workouts.push(workout);
             if (workout.templateId) {
                
                scheduleDay.workouts = 
                    scheduleDay.workouts.filter(current => current.id !== workout.templateId);
             } 
        }
    }

    checkWorkoutPresense(scheduleDay, workout) {

        return scheduleDay.workouts.some(current => {
                
                if (current.id === workout.id) {
                    return true;
                }

                // Deleted template case
                if (current.templateId && current.templateId === workout.id) {
                    return true;
                }

                return false;
            });
    }
    
}