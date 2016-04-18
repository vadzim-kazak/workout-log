package com.jrew.lab.workoutlog.workout.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Kazak_VV on 08.06.2015.
 */
public class Workout implements Commentable {

    private List<Activity> activities = new ArrayList<>();

    private Instant dateTime;

    private String comment;

    public List<Activity> getActivities() {
        return activities;
    }

    public Instant getDateTime() {
        return dateTime;
    }

    public void setDateTime(Instant dateTime) {
        this.dateTime = dateTime;
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
