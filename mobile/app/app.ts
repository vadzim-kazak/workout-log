import {App, Platform} from 'ionic-angular';
import {provide} from '@angular/core';
import {Http} from '@angular/http';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler} from 'ng2-translate/ng2-translate';
import {CommonMissingTranslationHandler} from './common/i18n/missing-translation.handler';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {provideStore} from '@ngrx/store';
import {reducers} from './pages/exercises/exercises';
import {ExercisesEffects} from './pages/exercises/effects/load-exercises.effect';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [ 
      provide(MissingTranslationHandler, {useClass: CommonMissingTranslationHandler}),
      provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'build/assets/i18n', '.json'),
        deps: [Http]
      }),
      TranslateService,
      provideStore(Object.assign({}, reducers))
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
     translate.use('ru');
  }
}
