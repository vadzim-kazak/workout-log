package com.jrew.lab.workoutlog.exercise.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jrew.lab.workoutlog.common.model.i18n.MultiLingualString;
import com.jrew.lab.workoutlog.common.model.jackson.Views;
import com.jrew.lab.workoutlog.common.util.serializer.ObjectIdSerializer;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Kazak_VV on 14.06.2015.
 */
@Entity(value = "exercises", noClassnameStored = true)
public class Exercise {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    @JsonView(value = Views.ExerciseNameMetrics.class)
    private MultiLingualString name;

    @JsonView(value = Views.ExerciseFull.class)
    private ExerciseDescription description;

    @JsonView(value = Views.ExerciseFull.class)
    private java.util.Set<ExerciseMetric> metrics = new HashSet<>();

    @JsonView(value = Views.ExerciseFull.class)
    @JsonProperty(value = "type")
    private ExerciseType exerciseType;

    @JsonView(value = Views.ExerciseFull.class)
    @JsonProperty(value = "mechanics")
    private MechanicsType mechanicsType;

    @JsonView(value = Views.ExerciseFull.class)
    private Set<Muscle> mainMuscles = new HashSet<>();

    @JsonView(value = Views.ExerciseFull.class)
    private Set<Muscle> otherMuscles = new HashSet<>();

    public Exercise() {
    }

    public Exercise(MultiLingualString name) {
        this.name = name;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public MultiLingualString getName() {
        return name;
    }

    public void setName(MultiLingualString name) {
        this.name = name;
    }

    public ExerciseDescription getDescription() {
        return description;
    }

    public void setDescription(ExerciseDescription description) {
        this.description = description;
    }

    public Set<ExerciseMetric> getMetrics() {
        return metrics;
    }

    public ExerciseType getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(ExerciseType exerciseType) {
        this.exerciseType = exerciseType;
    }

    public MechanicsType getMechanicsType() {
        return mechanicsType;
    }

    public void setMechanicsType(MechanicsType mechanicsType) {
        this.mechanicsType = mechanicsType;
    }

    public Set<Muscle> getMainMuscles() {
        return mainMuscles;
    }

    public Set<Muscle> getOtherMuscles() {
        return otherMuscles;
    }

}
