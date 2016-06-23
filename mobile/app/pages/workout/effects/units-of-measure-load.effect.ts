import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects'
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ObjectLocalStorage} from '../../../common/services/local-storage.service';

const UNITS_OF_MEASURES_KEY = 'unitsOfMeasures';
const ENDPOINT_URL = 'http://localhost:8080/api/v1/measures';

@Injectable()
export class UnitsOfMeasuresEffects {
  
  constructor(private http: Http, private updates$: StateUpdates<any>, 
              private translate: TranslateService, private objectLocalStorage: ObjectLocalStorage) {}

  @Effect() 
  load$ = this.updates$
              .whenAction('LOAD_UNITS_OF_MEASURES')
              .switchMap(payload => 
                    
                    Observable.fromPromise(this.objectLocalStorage.get(UNITS_OF_MEASURES_KEY))
                              .switchMap(units => {

                                    if (units) {
                                        return Observable.of({type: 'UNITS_OF_MEASURES_LOAD_SUCCESS', payload:units}); 
                                    } else {
                                        return this.http.get(ENDPOINT_URL)
                                                .map(res => {
                                                        // Save loaded data
                                                        let units = res.json();
                                                        this.objectLocalStorage.set(UNITS_OF_MEASURES_KEY, units);
                                                        return ({type: 'UNITS_OF_MEASURES_LOAD_SUCCESS', payload: units})
                                                })
                                                .catch(() => Observable.of({ type: 'UNITS_OF_MEASURES_LOAD_FAILURE' }))
                                    }

                              })
                            
              );

}          