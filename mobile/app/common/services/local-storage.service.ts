import { Injectable } from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class ObjectLocalStorage {

    storage: Storage;

    constructor() {
        this.storage =  new Storage(LocalStorage);
    }

    set(key, value) {
        this.storage.set(key, JSON.stringify(value));
    }

    get(key) {
        
        return new Promise((resolve, reject) => {

            this.storage.get(key).then(value => {
                
                if (value) {
                    return resolve(JSON.parse(value));
                } 

                return resolve();    
            });
        
        });
   }    

}