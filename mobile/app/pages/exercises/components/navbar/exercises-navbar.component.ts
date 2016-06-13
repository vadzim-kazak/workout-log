import {Input, Output, EventEmitter, Component} from '@angular/core';
import {MenuController} from 'ionic-angular';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {ExercisesFilter} from '../../../exercises-filter/exercises-filter';

@Component({
  selector: 'exercises-navbar',
  templateUrl: 'build/pages/exercises/components/navbar/exercises-navbar.html',
  pipes: [TranslatePipe]
})
export class ExercisesNavbar {
    
    isSearchActive: boolean;
    @Input() isWorkoutCreationFlow;
    @Output() searchExercises = new EventEmitter();
    
    constructor(private menuController: MenuController){}
    
    toggleSearchMode() {
        this.isSearchActive = !this.isSearchActive; 
        // TODO Put focus into search bar once it is being shown.
        // Waiting for the IONIC Beta 9 Release
        // https://github.com/driftyco/ionic/issues/5834 
    }
    
    toggleFilter($event) {
        
        if (this.isWorkoutCreationFlow) {
           
           this.menuController.enable(true, 'fullPageExercisesfilterMenu');
           this.menuController.enable(false, 'tabsExercisesfilterMenu');
           
           this.menuController.toggle('fullPageExercisesfilterMenu');
        } else {
           
           this.menuController.enable(true, 'tabsExercisesfilterMenu');
           this.menuController.enable(false, 'fullPageExercisesfilterMenu');
           
           this.menuController.toggle('tabsExercisesfilterMenu');
        }

    }
}   
