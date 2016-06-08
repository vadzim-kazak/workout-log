import {Input, Output, EventEmitter, Component} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {StateUpdates} from '@ngrx/effects'
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {ViewController} from 'ionic-angular';
import {Toolbar} from '../../common/components/toolbar/toolbar.component';
import {NormalizePipe} from '../../common/pipes/normalize.pipe';
// Reducers
import {exercisesFilterReducer} from './reducers/exercises-filter.reducer';
import {exercisesFilteringCriteriaReducer} from './reducers/exercises-filtering-criteria.reducer';
import {exercisesFilterHeadersReducer} from './reducers/exercises-filter-headers.reducer';
// Effects
import {FilteringCriteriaEffects} from './effects/load-filtering-criteria.effect'; 
//Components
import {FilterListHeader} from './components/filter-list-header/filter-list-header.component';
import {FilterListItem} from './components/filter-list-item/filter-list-item.component';

export const reducers = {
    exercisesFilter: exercisesFilterReducer,
    exercisesFilteringCriteria: exercisesFilteringCriteriaReducer,
    exercisesFilterHeaders: exercisesFilterHeadersReducer 
}

@Component({
  selector: 'exercises-filter',
  templateUrl: 'build/pages/exercises-filter/exercises-filter.html',
  providers: [FilteringCriteriaEffects, StateUpdates],
  pipes: [TranslatePipe, NormalizePipe],
  directives: [Toolbar, FilterListHeader, FilterListItem]
})
export class ExercisesFilter {
    
    exercisesFilteringCriteria: Observable<any>;
    exercisesFilter;
    categoryHeaders;
    exercisesFilterSubscription: Subscription;
    filteringCriteriaSubscription: Subscription;
    categoryHeadersSubscription:  Subscription;

    constructor(private viewController: ViewController, private store: Store<any>, filteringCriteriaEffects: FilteringCriteriaEffects){
      this.exercisesFilteringCriteria = store.select('exercisesFilteringCriteria');
      this.exercisesFilterSubscription = store.select('exercisesFilter').subscribe(value => this.exercisesFilter = value);
      this.categoryHeadersSubscription = store.select('exercisesFilterHeaders').subscribe(state => this.categoryHeaders = state);

      // Manually run effect subscription
      this.filteringCriteriaSubscription = filteringCriteriaEffects.load$.subscribe(store);
    }
    
    isFilterValueUnchecked(category, value) {
        return this.exercisesFilter[category] && this.exercisesFilter[category].some(categoryValue => categoryValue === value);
    }

    handleFilterCriterionUpdate($event) {
       this.store.dispatch({type: 'UPDATE_EXERCISES_FILTER', payload: $event});
    }

    isCategoryHeaderUnchecked(category) {
        return this.categoryHeaders[category];
    }
    
    handleFilterCategoryHeaderUpdate($event) {
       this.store.dispatch({type: 'UPDATE_EXERCISES_CATEGORY_FILTER', payload: $event});    
       this.store.dispatch({type: 'UPDATE_EXERCISES_FILTER_HEADERS', payload: {category: $event.category, isUnchecked:  $event.isExcluded}});
    }
    
    resetExercisesFilter() {
        this.store.dispatch({type: 'RESET_EXERCISES_FILTER'}); 
        this.store.dispatch({type: 'RESET_EXERCISES_FILTER_HEADERS'});
    }

    dismiss() {
       this.viewController.dismiss();  
    }

    ngOnDestroy() {
        this.exercisesFilterSubscription.unsubscribe();
        this.categoryHeadersSubscription.unsubscribe();
        // Manually unsubscribe effect
        this.filteringCriteriaSubscription.unsubscribe();
    }
    
}   
