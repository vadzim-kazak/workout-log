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
import {exercisesFilterCategoriesReducer} from './reducers/exercises-filter-categories.reducer';
// Effects
import {FilteringCriteriaEffects} from './effects/load-filtering-criteria.effect'; 
//Components
import {FilterListHeader} from './components/filter-list-header/filter-list-header.component';
import {FilterListItem} from './components/filter-list-item/filter-list-item.component';

export const reducers = {
    exercisesFilter: exercisesFilterReducer,
    exercisesFilteringCriteria: exercisesFilteringCriteriaReducer,
    exercisesFilterCategories: exercisesFilterCategoriesReducer 
}

@Component({
  selector: 'exercises-filter',
  templateUrl: 'build/pages/exercises-filter/exercises-filter.html',
  providers: [FilteringCriteriaEffects, StateUpdates],
  pipes: [TranslatePipe, NormalizePipe],
  directives: [Toolbar, FilterListHeader, FilterListItem]
})
export class ExercisesFilter {
    
    filterState;
    filterCategoriesState;
    filteringCriteria: Observable<any>;
    filterStateSubscription: Subscription;
    filterCategoriesStateSubscription:  Subscription;
    filteringCriteriaSubscription: Subscription;

    constructor(private viewController: ViewController, private store: Store<any>, 
                filteringCriteriaEffects: FilteringCriteriaEffects) {
      this.filteringCriteria = store.select('exercisesFilteringCriteria');
      this.filterStateSubscription = store.select('exercisesFilter').subscribe(value => this.filterState = value);
      this.filterCategoriesStateSubscription = store.select('exercisesFilterCategories').subscribe(state => this.filterCategoriesState = state);

      // Manually run effect subscription
      this.filteringCriteriaSubscription = filteringCriteriaEffects.load$.subscribe(store);
    }
    
    isFilterValueUnchecked(category, value) {
        return this.filterState[category] && this.filterState[category].some(categoryValue => categoryValue === value);
    }

    handleFilterCriterionUpdate($event) {
       this.store.dispatch({type: 'UPDATE_EXERCISES_FILTER', payload: $event});
    }

    isCategoryHeaderUnchecked(category) {
        return this.filterCategoriesState[category];
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
        this.filterStateSubscription.unsubscribe();
        this.filterCategoriesStateSubscription.unsubscribe();
        // Manually unsubscribe effect
        this.filteringCriteriaSubscription.unsubscribe();
    }
    
}   
