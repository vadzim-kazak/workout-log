package com.jrew.lab.workoutlog.exercise.model;

/**
 * Created by Kazak_VV on 23.06.2015.
 */
public enum MechanicsType {

    COMPOUND,

    ISOLATED;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
