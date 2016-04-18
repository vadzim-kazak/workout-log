package com.jrew.lab.workoutlog.exercise.service;

import com.jrew.lab.workoutlog.exercise.model.Exercise;

import java.util.Optional;
import java.util.Set;

/**
 * Created by Kazak_VV on 18.06.2015.
 */
public interface ExerciseProvider {

    Set<Exercise> getAllExercises();

    Optional<Exercise> findExerciseByName(String name);
}
