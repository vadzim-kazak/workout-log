package com.jrew.lab.workoutlog.exercise.dao;

import com.jrew.lab.workoutlog.exercise.model.Exercise;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Kazak_VV on 22.06.2015.
 */
@Repository
public class ExerciseManagerImpl implements ExerciseManager {

    @Autowired
    Datastore datastore;

    @Override
    public Set<Exercise> getAllExercises() {

        return new HashSet<>(datastore.find(Exercise.class).asList());
    }
}
