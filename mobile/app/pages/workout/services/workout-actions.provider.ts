import {Injectable} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Platform} from 'ionic-angular';

@Injectable()
export class WorkoutActionsProvider {
    
    constructor(private translate: TranslateService, private platform: Platform) {}
    
    getActionsConfig(startWorkoutHandler, saveWorkoutHandler) {

        return {
            title: this.translate.instant('WORKOUT_COMPLETE_ACTIONS_TITLE'),
            buttons: [
                
                {
                    text: this.translate.instant('WORKOUT_COMPLETE_START_WORKOUT'),
                    icon: !this.platform.is('ios') ? 'play' : null,
                    cssClass: 'Workout-start',
                    handler: () => {}
                },
                
                {
                    text: this.translate.instant('WORKOUT_COMPLETE_SAVE'),
                    icon:  !this.platform.is('ios') ? 'list' : null,
                    cssClass: 'Workout-save',
                    handler: saveWorkoutHandler
                },
                
                {
                    text: this.translate.instant('WORKOUT_COMPLETE_CANCEL'),
                    role: 'cancel',
                    cssClass: 'Workout-cancel',
                    icon:  !this.platform.is('ios') ? 'close' : null,
                    handler: () => {}
                }
            ]
        };
    }

}