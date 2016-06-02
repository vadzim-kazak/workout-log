import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'normalize'})
export class NormalizePipe implements PipeTransform {
  
  transform(value: string | string[]): string {
    
    if (typeof value === 'string') {
      return this.normalize(value);  
    } else if(value instanceof Array) {
      return value.map(element => this.normalize(element)).join(', ');
    }
    
  }
  
  normalize(value: String) {
    value = value.replace(/_/g, ' ');
    return value.charAt(0).toUpperCase() + value.slice(1);    
  }
  
}