import {Page} from 'ionic-angular';
import {Page3} from '../page3/page3';
import {Workouts} from '../workouts/workouts';
import {Exercises} from '../exercises/exercises';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {ExercisesFilter} from '../exercises-filter/exercises-filter.component';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html',
  pipes: [TranslatePipe],
  directives: [ExercisesFilter]
})
export class TabsPage {
  
  constructor(private translate: TranslateService) {}
  
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Workouts;
  tab2Root: any = Exercises;
  tab3Root: any = Page3;
}
