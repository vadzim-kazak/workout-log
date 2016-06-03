import {Component, Input} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector:'exercise-toolbar',
  templateUrl: 'build/pages/exercise/components/toolbar/exercise-toolbar.html'
})
export class ExerciseToolbar {
    
    @Input() exercise;
    
    constructor(private viewController: ViewController) {}
    
    dismiss() {
    this.viewController.dismiss();
  }
}