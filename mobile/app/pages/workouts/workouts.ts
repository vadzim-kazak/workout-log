import {Page} from 'ionic-angular';
import * as moment from 'moment';
import {WeeksHeader} from './components/weeks-header/weeks-header.component';
import {DayItem} from './components/day-item/day-item.component';

@Page({
  templateUrl: 'build/pages/workouts/workouts.html',
  directives: [WeeksHeader, DayItem]
})
export class Workouts {
  
  items = [];
  
  constructor() {
    let lastWeekDay = moment().endOf('week');
    this.populateCalendarMonth(lastWeekDay);
  }

  weeksHeader(item, index, items) {
    
    if (item.day.format('e') === '6') {
      let lastWeekDay = item.day;
      let firstWeekDay = moment(lastWeekDay).startOf('week');
      
      let week = `${lastWeekDay.format('dd, DD')} - ${firstWeekDay.format('dd, DD')}`; 
      let month = lastWeekDay.format('MMMM');
      let year = lastWeekDay.format('YYYY');

      return {week, month, year};
    }

    return null;
  }
  
  populateCalendarMonth(seedDay) {
      seedDay.add(1, 'days'); 
      for (let i = 0; i < 31; i++) {
        let day = seedDay.subtract(1, 'days');
        this.items.push({
          day: moment(day),
          label: day.format('dd, DD'),
        });
      }
  }
  
  doInfinite(infiniteScroll) {
    
    setTimeout(() => {
      
      let currentLast = this.items[this.items.length - 1];
      let seedDay = moment(currentLast.day);
      this.populateCalendarMonth(seedDay);
      infiniteScroll.complete();

    }, 1000);

  }
}
