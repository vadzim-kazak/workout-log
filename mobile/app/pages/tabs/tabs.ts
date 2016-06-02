import {Page} from 'ionic-angular';
import {Page3} from '../page3/page3';
import {Workouts} from '../workouts/workouts';
import {Exercises} from '../exercises/exercises';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Workouts;
  tab2Root: any = Exercises;
  tab3Root: any = Page3;
}
