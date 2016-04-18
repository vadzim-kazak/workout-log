package com.jrew.lab.workoutlog.exercise.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jrew.lab.workoutlog.uom.model.MeasureCategory;
import com.jrew.lab.workoutlog.uom.model.MeasureUnit;
import org.mongodb.morphia.annotations.Embedded;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Kazak_VV on 17.06.2015.
 */
@Embedded
public class ExerciseMetric {

    private MeasureCategory category;

    @JsonProperty(value = "defaults")
    private java.util.Set<MeasureUnit> defaultUnits = new HashSet<>();

    public ExerciseMetric() {
    }

    public ExerciseMetric(MeasureCategory category) {
        this.category = category;
    }

    public MeasureCategory getCategory() {
        return category;
    }

    public void setCategory(MeasureCategory category) {
        this.category = category;
    }

    public Set<MeasureUnit> getDefaultUnits() {
        return defaultUnits;
    }
}
