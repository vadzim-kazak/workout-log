package com.jrew.lab.workoutlog.exercise.dao;

import com.jrew.lab.workoutlog.exercise.model.Exercise;

import java.util.Set;

/**
 * Created by Kazak_VV on 22.06.2015.
 */
public interface ExerciseManager {

    Set<Exercise> getAllExercises();

}
