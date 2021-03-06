// Libs
import {Platform, ionicBootstrap} from 'ionic-angular';
import {Component, provide} from '@angular/core';
import {Http} from '@angular/http';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler} from 'ng2-translate/ng2-translate';
import {CommonMissingTranslationHandler} from './common/i18n/missing-translation.handler';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {provideStore} from '@ngrx/store';
import * as moment from 'moment';
import 'moment/locale/ru';
// Services
import {ObjectLocalStorage} from './common/services/local-storage.service';
// Reducers
import {reducers as ExercisesReducers} from './pages/exercises/exercises';
import {reducers as ExercisesFilterReducers} from './pages/exercises-filter/exercises-filter';
import {reducers as ExercisesListReducers} from './common/components/exercises-list/exercises-list.component';
import {reducers as WorkoutReducers} from './pages/workout/workout';
import {reducers as ScheduleReducers} from './pages/schedule/schedule';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ 
      provide(MissingTranslationHandler, {useClass: CommonMissingTranslationHandler}),
      provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'build/assets/i18n', '.json'),
        deps: [Http]
      }),
      TranslateService,
      provideStore(Object.assign({}, ExercisesReducers, 
                                     ExercisesFilterReducers, 
                                     ExercisesListReducers, 
                                     WorkoutReducers,
                                     ScheduleReducers)),
      ObjectLocalStorage
   ]
})
export class MyApp {
  
  rootPage: any = TabsPage;

  constructor(platform: Platform, translate: TranslateService) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    
     translate.setDefaultLang('en');
     translate.use('en');
     moment.locale('en');
     translate.use('ru');
     moment.locale('ru');
  }
}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(MyApp);
