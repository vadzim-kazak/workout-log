package com.jrew.lab.workoutlog.workout.model;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Kazak_VV on 08.06.2015.
 */
public class Activity implements Restable, Commentable {

    private List<Set> sets = new ArrayList<>();

    private Duration restTime;

    private String comment;

    public Activity() {
    }

    public Activity(Duration restTime) {
        this.restTime = restTime;
    }

    public List<Set> getSets() {
        return sets;
    }

    public Duration getRestTime() {
        return restTime;
    }

    public void setRestTime(Duration restTime) {
        this.restTime = restTime;
    }

    @Override
    public String getComment() {
        return comment;
    }

    @Override
    public void setComment(String comment) {
        this.comment = comment;
    }
}
