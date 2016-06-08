import {Injectable} from '@angular/core';

@Injectable()
export class ExercisesFilteringService {
    
    searchByQuery(rawExercises, searchQuery, filterQuery) {
      
        let excludedCategories = Object.keys(filterQuery);
        
        let exercises = [];
        if (excludedCategories.length > 0) {
              
              rawExercises.forEach(exercise => {
              
                let isExerciseNotFiltered = true;    
                excludedCategories.forEach(excludedCategory => {

                    let excludedValues = filterQuery[excludedCategory];
                    let exerciseCategory = exercise[excludedCategory];
                    if (Array.isArray(exerciseCategory)) {
                        if (exerciseCategory.some(value => excludedValues.some(excludedValue => excludedValue === value))) {
                            isExerciseNotFiltered = false;            
                        }
                            
                    } else if (excludedValues.some(excludedValue => excludedValue === exerciseCategory)){
                       isExerciseNotFiltered = false;
                    }
                });

                if(isExerciseNotFiltered) {
                    exercises.push(exercise);    
                }

              });

        } else {
            exercises = rawExercises;
        }
        
        if (searchQuery.trim() === '') {
           return exercises;
        } else {
          return exercises.filter(exercise => exercise.name.toLowerCase().indexOf(searchQuery) > -1);
        }
    }
    
}