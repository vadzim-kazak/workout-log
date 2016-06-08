import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {NavController, Modal} from 'ionic-angular';
import {Exercise} from '../../../exercise/exercise';

@Component({
  selector: 'filter-list-header',
  templateUrl: 'build/pages/exercises-filter/components/filter-list-header/filter-list-header.html',
  pipes: [TranslatePipe]
})
export class FilterListHeader {
  
  @Input() title;
  @Input() category;
  @Input() values;
  @Input() isUnchecked;
  
  @Output() filterCategoryUpdated = new EventEmitter();
  
  onClickHandler(category, values, toggle) {
      this.filterCategoryUpdated.emit({values, category, isExcluded: !toggle.checked});
  }
}