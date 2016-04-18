package com.jrew.lab.workoutlog.uom.model;

/**
 * Created by Kazak_VV on 16.06.2015.
 */
public enum SystemOfUnits {

    SI("si"),

    IMPERIAL("im"),

    GENERAL("ge");

    private String value;

    SystemOfUnits(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    public String getValue() {
        return value;
    }
}
