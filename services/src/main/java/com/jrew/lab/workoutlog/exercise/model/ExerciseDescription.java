package com.jrew.lab.workoutlog.exercise.model;

import com.jrew.lab.workoutlog.common.model.i18n.MultiLingualString;
import org.mongodb.morphia.annotations.Embedded;

import java.util.List;

/**
 * Created by Kazak_VV on 29.06.2015.
 */
@Embedded
public class ExerciseDescription {

    private MultiLingualString definition;

    private List<MultiLingualString> steps;

    private List<MultiLingualString> cautions;

    private List<MultiLingualString> variations;

    public ExerciseDescription() {
    }

    public ExerciseDescription(MultiLingualString definition) {
        this.definition = definition;
    }

    public MultiLingualString getDefinition() {
        return definition;
    }

    public void setDefinition(MultiLingualString definition) {
        this.definition = definition;
    }

    public List<MultiLingualString> getSteps() {
        return steps;
    }

    public void setSteps(List<MultiLingualString> steps) {
        this.steps = steps;
    }

    public List<MultiLingualString> getCautions() {
        return cautions;
    }

    public void setCautions(List<MultiLingualString> cautions) {
        this.cautions = cautions;
    }

    public List<MultiLingualString> getVariations() {
        return variations;
    }

    public void setVariations(List<MultiLingualString> variations) {
        this.variations = variations;
    }
}
