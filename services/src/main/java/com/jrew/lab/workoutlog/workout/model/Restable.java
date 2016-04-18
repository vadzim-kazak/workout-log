package com.jrew.lab.workoutlog.workout.model;

import java.time.Duration;

/**
 * Created by Kazak_VV on 14.06.2015.
 */
public interface Restable {

    Duration getRestTime();

    void setRestTime(Duration restTime);
}
