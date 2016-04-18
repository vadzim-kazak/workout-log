package com.jrew.lab.workoutlog.exercise.model;

/**
 * Created by Kazak_VV on 23.06.2015.
 */
public enum ExerciseType {

    AEROBIC,

    ANAEROBIC,

    FLEXIBILITY;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
