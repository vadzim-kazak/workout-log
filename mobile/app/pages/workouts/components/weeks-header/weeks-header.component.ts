import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {NavController, Modal} from 'ionic-angular';
import {Exercise} from '../../../exercise/exercise';

@Component({
  selector: 'weeks-header',
  templateUrl: 'build/pages/workouts/components/weeks-header/weeks-header.html',
  pipes: [TranslatePipe]
})
export class WeeksHeader {
  
  @Input() header;
  
}