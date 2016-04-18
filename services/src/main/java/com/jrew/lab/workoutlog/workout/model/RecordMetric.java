package com.jrew.lab.workoutlog.workout.model;

/**
 * Created by Kazak_VV on 14.06.2015.
 */
public class RecordMetric {

    private String unit;

    private double value;

    public RecordMetric() {
    }

    public RecordMetric(String unit, double value) {
        this.unit = unit;
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}


