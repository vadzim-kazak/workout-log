package com.jrew.lab.workoutlog.exercise.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.jrew.lab.workoutlog.common.model.jackson.Views;
import com.jrew.lab.workoutlog.exercise.model.Exercise;
import com.jrew.lab.workoutlog.exercise.model.Muscle;
import com.jrew.lab.workoutlog.exercise.service.ExerciseProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Set;

/**
* Created by Kazak_VV on 18.06.2015.
        */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/v1")
public class ExerciseController {

    @Autowired
    private ExerciseProvider exerciseProvider;

    @JsonView(value = Views.ExerciseFull.class)
    @RequestMapping(value = "/exercises", method = RequestMethod.GET)
    public Set<Exercise> getAllExercises(@RequestParam(value = "lang", required = false)String language) {

        if (language != null) {
            Locale locale = new Locale(language);
            LocaleContextHolder.setLocale(locale);
        }
        return exerciseProvider.getAllExercises();
    }

    @RequestMapping(value = "/muscles", method = RequestMethod.GET)
    public Muscle[] getAllMuscles() {
        return Muscle.values();
    }

}
