package com.jrew.lab.workoutlog.uom.model;

/**
 * Created by Kazak_VV on 16.06.2015.
 */
public enum MeasureCategory {

    REPETITION("repetition"),

    LEVEL("level"),

    DURATION("duration"),

    DISTANCE("distance"),

    WEIGHT("weight");

    private String value;

    MeasureCategory(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}
