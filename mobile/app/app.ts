import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {provideStore} from '@ngrx/store';
import {reducers} from './pages/exercises/exercises';
import {ExercisesEffects} from './pages/exercises/effects/load-exercises.effect';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [provideStore(Object.assign({}, reducers))]
})
export class MyApp {
  
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    
  }
}
