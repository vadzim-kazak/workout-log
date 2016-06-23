import {Component, Input} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NavParams} from 'ionic-angular';
import {Toolbar} from '../../../../common/components/toolbar/toolbar.component';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector:'exercise-records',
  templateUrl: 'build/pages/workout/components/exercise-records/exercise-records.html',
  pipes: [TranslatePipe],
  directives: [Toolbar]
})
export class ExerciseRecords {

    @Input() exercise: any;
    metrics: Observable<any>
    metricsValues: any;
    record:{} = {};
    subscriptions: Subscription[] = [];

    currentSystem: string = 'si';
    
    constructor(private navParams: NavParams, private store: Store<any>) {
        this.exercise = navParams.get('exercise');
        this.metrics = store.select('unitsOfMeasures');
        this.subscriptions.push(this.metrics.subscribe(metrics => this.metricsValues = metrics));

        // Initialize record metrics
        this.exercise.metrics.forEach(metric => {
            this.record[metric.category] = {};     
            this.record[metric.category].value = 0;
            if (metric.defaults.length > 1) {
                
                metric.defaults.forEach(defaultMetric => {
                    if (this.metricsValues[metric.category][this.currentSystem].some(metric => metric.value == defaultMetric.value.toUpperCase())) {
                         this.record[metric.category].metric = defaultMetric.value.toUpperCase();
                    }
                });
               
            } else {
                this.record[metric.category].metric = metric.defaults[0].value.toUpperCase();    
            }
        });

        console.log(this.record);
    }

    isMultiCategoryValues(category) {

        return (this.metricsValues[category]['ge'] && this.metricsValues[category]['ge'].length > 1) || 
               (this.metricsValues[category][this.currentSystem] && this.metricsValues[category][this.currentSystem].length > 1); 
    }

    getCategoryValues(category) {

        if (this.metricsValues[category]['ge']) {
            return this.metricsValues[category]['ge'];
        } else {
            return this.metricsValues[category][this.currentSystem];   
        }

    }

    ngOnDestroy() {
        // Manually unsubscribe effect
        this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();  
        });
     }
    
}