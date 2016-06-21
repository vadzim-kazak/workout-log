import {Injectable} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Platform} from 'ionic-angular';

@Injectable()
export class WorkoutNameGenerator {
    
    constructor(private translate: TranslateService) {}
    
    generate(exercises) {

        if (exercises.length > 0) {
            let uniqueMusclesSet = new Set();
            exercises.forEach(current => {
                if (current.mainMuscles && current.mainMuscles.length > 0) {
                    uniqueMusclesSet.add(current.mainMuscles[0].toUpperCase());
                }
            });

            // Convert set to array
            let uniqueMuscles = [];
            uniqueMusclesSet.forEach(muscle => uniqueMuscles.push(muscle));
            
            return uniqueMuscles.map(muscle => {
                                    let translated = this.translate.instant(muscle + '_SHORT')
                                    return translated.charAt(0).toUpperCase() + translated.slice(1); 
                                 })
                                .join(', ');
       }
        
    }

}