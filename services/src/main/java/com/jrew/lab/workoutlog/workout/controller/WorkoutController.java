package com.jrew.lab.workoutlog.workout.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.jrew.lab.workoutlog.exercise.model.Exercise;
import com.jrew.lab.workoutlog.common.model.jackson.Views;
import com.jrew.lab.workoutlog.exercise.service.ExerciseProvider;
import com.jrew.lab.workoutlog.workout.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Kazak_VV on 08.06.2015.
 */
@RestController
@RequestMapping(value = "/api/workouts")
public class WorkoutController {

    @Autowired
    private ExerciseProvider exerciseProvider;

    @JsonView(value = Views.ExerciseNameMetrics.class)
    @RequestMapping(method = RequestMethod.GET)
    public List<Workout> provideStubWorkouts() {

        List<Workout> workouts = new ArrayList<>();

        final Workout workout = new Workout();
        workout.setDateTime(Instant.now());
        workout.setComment("This is my first visit to this GYM.");

        final Activity activity = new Activity(Duration.ofMinutes(3));
        exerciseProvider.findExerciseByName("Barbell squat").ifPresent(
            exercise -> {
                activity.getSets().add(createSet(exercise, 70, 8, 180));
                activity.getSets().add(createSet(exercise, 75, 8, 180));
                activity.getSets().add(createSet(exercise, 80, 8, 180));
                activity.getSets().add(createSet(exercise, 80, 8, 0));
                workout.getActivities().add(activity);
            }
        );

        final Activity secondActivity = new Activity();
        exerciseProvider.findExerciseByName("Barbell squat").ifPresent(
            exercise -> {
                secondActivity.getSets().add(createSet(exercise, 60, 10, 120));
                secondActivity.getSets().add(createSet(exercise, 65, 9, 120));
                secondActivity.getSets().add(createSet(exercise, 70, 8, 120));
                secondActivity.getSets().add(createSet(exercise, 70, 8, 0));
                workout.getActivities().add(secondActivity);
            }
        );
        workouts.add(workout);

        final Workout secondWorkout = new Workout();
        secondWorkout.setDateTime(Instant.now().minus(2, ChronoUnit.DAYS));
        secondWorkout.setComment("Circuit training. Don't eat so much before gym next time.");
        final Activity thirdActivity = new Activity();

        for(int i = 0; i < 4; i++) {
            Set set = new Set(Duration.ofMinutes(4));
            set.getEfforts().add(createEffort(exerciseProvider.findExerciseByName("Dumbbell lunge").orElse(null), 40, 10, 30));
            set.getEfforts().add(createEffort(exerciseProvider.findExerciseByName("Biceps curl").orElse(null), 20, 12, 30));
            set.getEfforts().add(createEffort(exerciseProvider.findExerciseByName("Hyperextention").orElse(null), 5, 10, 0));
            thirdActivity.getSets().add(set);
        }
        workout.getActivities().add(thirdActivity);
        workouts.add(secondWorkout);

        return workouts;
    }

    private Set createSet(Exercise exercise, double weight, double reps, int restTime) {

        Set set = new Set();
        if (restTime > 0) {
            set.setRestTime(Duration.ofSeconds(restTime));
        }

        set.getEfforts().add(createEffort(exercise, weight, reps, 0));
        return set;
    }

    private Effort createEffort(Exercise exercise, double weight, double reps, int restTime) {

        Effort effort = new Effort(exercise);
        if (restTime > 0) {
            effort.setRestTime(Duration.ofSeconds(restTime));
        }

        Record record = new Record();
        record.getMetrics().add(new RecordMetric("kg", weight));
        record.getMetrics().add(new RecordMetric("reps", reps));
        effort.getRecords().add(record);

        return effort;
    }

}
