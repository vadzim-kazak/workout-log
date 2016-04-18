package com.jrew.lab.workoutlog.exercise.model;

/**
 * Created by Kazak_VV on 23.06.2015.
 */
public enum Muscle {

    NECK,

    TRAPS,

    SHOULDERS,

    CHEST,

    TRICEPS,

    BICEPS,

    FOREARM,

    LATS,

    MIDDLE_BACK,

    LOWER_BACK,

    ABS,

    GLUTES,

    QUADS,

    HAMSTRINGS,

    CALVES;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
