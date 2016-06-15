import {Component} from '@angular/core';
import {Page3} from '../page3/page3';
import {Schedule} from '../schedule/schedule';
import {Exercises} from '../exercises/exercises';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {ExercisesFilter} from '../exercises-filter/exercises-filter';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  pipes: [TranslatePipe],
  directives: [ExercisesFilter]
})
export class TabsPage {
  
  constructor(private translate: TranslateService) {}
  
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Schedule;
  tab2Root: any = Exercises;
  tab3Root: any = Page3;
}
