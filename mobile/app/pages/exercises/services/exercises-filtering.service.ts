import {Injectable} from '@angular/core';

@Injectable()
export class ExercisesFilteringService {
    
    searchByQuery(exercises, searchQuery) {
      
        if (searchQuery.trim() === '') {
           return exercises;
        } else {
          return exercises.filter(exercise => exercise.name.toLowerCase().indexOf(searchQuery) > -1);
        }
    }
    
}