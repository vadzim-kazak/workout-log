import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class WorkoutsInjectorService {
    
    process = (scheduleDays: any[], workouts: any[]) => {

        scheduleDays.forEach(scheduleDay => {
            workouts.forEach(workout => {
                this.processWorkoutDayPair(scheduleDay, workout);    
            });
        });

        scheduleDays.forEach(scheduleDay => {
            if (scheduleDay.workouts && scheduleDay.workouts.length > 0) {
                console.log(scheduleDay);   
            }
        });
        
        return scheduleDays;
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

    assignWorkout(scheduleDay, workout) {
        if (!scheduleDay.workouts) {
            scheduleDay.workouts = [];
        }
        
        if (!scheduleDay.workouts.some(current => current.name === workout.name)) {
            // there is no workouts with the same name during this day
            scheduleDay.workouts.push(workout); 
        }
    }
    
}