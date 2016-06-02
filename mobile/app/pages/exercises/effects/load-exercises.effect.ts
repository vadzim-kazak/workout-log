import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects'

@Injectable()
export class ExercisesEffects {
  
  constructor(private http: Http, private updates$: StateUpdates<any>) {}

  @Effect() 
  load$ = this.updates$
          // Listen for the 'LOAD_EXERCISES' action
          .whenAction('LOAD_EXERCISES')
          .switchMap(payload => this.http.get('http://localhost:8080/api/v1/exercises')
              // If successful, dispatch success action with result
              .map(res => ({ type: 'LOAD_EXERCISES_SUCCESS', payload: res.json() }))
              // If request fails, dispatch failed action
              .catch(() => Observable.of({ type: 'LOAD_EXERCISES_FAILED' }))
          );
}