package com.jrew.lab.workoutlog.workout.model;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Kazak_VV on 14.06.2015.
 */
public class Set implements Restable, Commentable {

    private List<Effort> efforts = new ArrayList<>();

    private Duration restTime;

    private String comment;

    @Override
    public Duration getRestTime() {
        return restTime;
    }

    public Set() {
    }

    public Set(Duration restTime) {
        this.restTime = restTime;
    }

    public List<Effort> getEfforts() {
        return efforts;
    }

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
