import {Input, Output, EventEmitter, Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs';
import {NavController, Modal} from 'ionic-angular';
import {Exercise} from '../../../exercise/exercise';

@Component({
  selector: 'filter-list-item',
  templateUrl: 'build/pages/exercises-filter/components/filter-list-item/filter-list-item.html',
  pipes: [TranslatePipe]
})
export class FilterListItem {
  
  @Input() value;
  @Input() category;
  @Input() label;
  @Input() isUnchecked;

  @Output() filterCriterionUpdated = new EventEmitter();

  onClickHandler(toggle,value,category) {
      this.filterCriterionUpdated.emit({value, category, isExcluded: !toggle.checked});
  }
  
}