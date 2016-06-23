import {Injectable} from '@angular/core';
import {ObjectLocalStorage} from '../../../common/services/local-storage.service';
import {Observable} from 'rxjs/Observable';
import {StateUpdates, Effect} from '@ngrx/effects'

const STORAGE_WORKOUTS_KEY = 'workouts';

@Injectable()
export class WorkoutEffects {
  
  constructor(private objectLocalStorage: ObjectLocalStorage, private updates$: StateUpdates<any>) {}

  @Effect() 
  save$ = this.updates$
          .whenAction('WORKOUT_CREATE', 'WORKOUT_UPDATE', 'WORKOUT_DELETE')
          .map(payload => {
            let {workouts} = payload.state; 
            this.objectLocalStorage.set(STORAGE_WORKOUTS_KEY, workouts); 

             return {};
          });

  @Effect() 
  load$ = this.updates$
          .whenAction('WORKOUTS_LOAD')
          .switchMap(payload => 
            Observable.fromPromise(this.objectLocalStorage.get(STORAGE_WORKOUTS_KEY))
                        .map((workouts: Array<any>) => {
                            let result = [];
                            if (workouts && workouts.length > 0) {
                                result = workouts;    
                            }

                            return  {type: 'WORKOUTS_LOAD_SUCCESS', payload:result};
                        })
                        .catch(() => Observable.of({ type: 'WORKOUTS_LOAD_FAILURE' }))
          );
}