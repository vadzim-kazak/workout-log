package com.jrew.lab.workoutlog.exercise.service;

import com.jrew.lab.workoutlog.exercise.dao.ExerciseManager;
import com.jrew.lab.workoutlog.exercise.model.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Created by Kazak_VV on 18.06.2015.
 */
@Service
public class ExerciseProviderImpl implements ExerciseProvider {

    private Set<Exercise> exercises = new HashSet<>();

    @Autowired
    private ExerciseManager exerciseManager;

    @PostConstruct
    private void init() {
        exercises.addAll(exerciseManager.getAllExercises());
    }

    @Override
    public Set<Exercise> getAllExercises() {
        return exercises;
    }

    @Override
    public Optional<Exercise> findExerciseByName(String name) {

        return exercises.stream()
                        .filter(exercise ->
                                exercise.getName().getValue().filter(s -> s.equalsIgnoreCase(name)).isPresent())
                        .findFirst();
    }

}
