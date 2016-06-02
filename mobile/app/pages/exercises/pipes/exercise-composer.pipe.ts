import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'exercisesComposer'})
export class ExercisesComposerPipe implements PipeTransform {
  
  transform(exercises: any[]): any {
    return this.composeByMuscle(exercises);   
  }
  
  composeByMuscle(exercises: any[]) : any[] {
      
      let musclesExercises = this.groupByMuscle(exercises);
      let muscles = Array.from(musclesExercises.keys()).sort();
      
      let result = [];
      muscles.forEach(muscle => {
      result = [
                 ...result,
                 {itemType: 'header', value: muscle}, 
                 ...(musclesExercises.get(muscle))
               ];          
      }); 
      
      return result;
  }
  
  groupByMuscle(exercises: any[]): Map<string, any> {
    
    let musclesExercises = new Map<string, any>();
    
    exercises.forEach(exercise => {
       exercise.mainMuscles.forEach(muscle => {
           
           let muscleExercises;
           if (musclesExercises.has(muscle)) {
                muscleExercises = musclesExercises.get(muscle); 
           } else {
               muscleExercises = [];
               musclesExercises.set(muscle, muscleExercises);
           }
           muscleExercises.push(exercise);
           
       }); 
       
    });
    
    return musclesExercises;
  }
  
}