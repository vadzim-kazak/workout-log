package com.jrew.lab.workoutlog.exercise.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.jrew.lab.workoutlog.exercise.model.Exercise;
import com.jrew.lab.workoutlog.common.model.jackson.Views;
import com.jrew.lab.workoutlog.exercise.service.ExerciseProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * Created by Kazak_VV on 18.06.2015.
 */
@RestController
@RequestMapping(value = "/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseProvider exerciseProvider;

    @JsonView(value = Views.ExerciseFull.class)
    @RequestMapping(method = RequestMethod.GET)
    public Set<Exercise> getAllExercises() {

        return exerciseProvider.getAllExercises();
    }

}
