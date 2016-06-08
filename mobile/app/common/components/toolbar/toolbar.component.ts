import {Component, Input} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'toolbar',
  templateUrl: 'build/common/components/toolbar/toolbar.html'
})
export class Toolbar {
    
    @Input() title: string;
    
    constructor(private viewController: ViewController) {}
    
    dismiss() {
    this.viewController.dismiss();
  }
}