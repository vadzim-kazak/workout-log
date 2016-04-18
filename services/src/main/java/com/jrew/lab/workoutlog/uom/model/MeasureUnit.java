package com.jrew.lab.workoutlog.uom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.jrew.lab.workoutlog.common.model.jackson.Views;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Transient;

/**
 * Created by Kazak_VV on 17.06.2015.
 */
@Embedded
public class MeasureUnit {

    @JsonIgnore
    @Transient
    private MeasureCategory measureCategory;

    @JsonView(value = Views.MeasureUnitNameSystem.class)
    @JsonProperty(value = "system")
    @Transient
    private SystemOfUnits systemOfUnits;

    @JsonView(value = Views.MeasureUnitNameSystem.class)
    private String value;

    @JsonView(value = Views.MeasureUnitNameSystemRatio.class)
    @JsonProperty(value = "ratio")
    @Transient
    private double siRatio;

    public MeasureUnit() {
    }

    public MeasureUnit(MeasureCategory measureCategory, SystemOfUnits systemOfUnits, String value, double siRatio) {
        this.measureCategory = measureCategory;
        this.systemOfUnits = systemOfUnits;
        this.value = value;
        this.siRatio = siRatio;
    }

    public MeasureCategory getMeasureCategory() {
        return measureCategory;
    }

    public void setMeasureCategory(MeasureCategory measureCategory) {
        this.measureCategory = measureCategory;
    }

    public SystemOfUnits getSystemOfUnits() {
        return systemOfUnits;
    }

    public void setSystemOfUnits(SystemOfUnits systemOfUnits) {
        this.systemOfUnits = systemOfUnits;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public double getSiRatio() {
        return siRatio;
    }

    public void setSiRatio(double siRatio) {
        this.siRatio = siRatio;
    }
}


