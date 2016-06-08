import {Input, Output, EventEmitter, Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {ExercisesFilter} from '../../../exercises-filter/exercises-filter.component';

@Component({
  selector: 'exercises-navbar',
  templateUrl: 'build/pages/exercises/components/navbar/exercises-navbar.html',
  pipes: [TranslatePipe]
})
export class ExercisesNavbar {
    
    isSearchActive: boolean;
    @Output() searchExercises = new EventEmitter();
    
    constructor(private navController: NavController){}
    
    toggleSearchMode() {
        this.isSearchActive = !this.isSearchActive; 
        // TODO Put focus into search bar once it is being shown.
        // Waiting for the IONIC Beta 9 Release
        // https://github.com/driftyco/ionic/issues/5834 
    }
    
    toggleFilter() {
        let modal = Modal.create(ExercisesFilter);
        this.navController.present(modal);
    }
    
}   
