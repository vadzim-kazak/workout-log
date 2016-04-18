package com.jrew.lab.workoutlog.workout.model;

import com.jrew.lab.workoutlog.exercise.model.Exercise;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Kazak_VV on 14.06.2015.
 */
public class Effort implements Restable, Commentable {

    private Exercise exercise;

    private List<Record> records = new ArrayList<>();

    private Duration restTime;

    private String comment;

    public Effort() {
    }

    public Effort(Duration restTime) {
        this.restTime = restTime;
    }

    public Effort(Exercise exercise) {
        this.exercise = exercise;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public List<Record> getRecords() {
        return records;
    }

    @Override
    public Duration getRestTime() {
        return restTime;
    }

    @Override
    public void setRestTime(Duration restTime) {
        this.restTime = restTime;
    }

    @Override
    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String getComment() {
        return this.comment;
    }
}
