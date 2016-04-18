package com.jrew.lab.workoutlog.workout.model;

import java.util.*;
import java.util.Set;

/**
 * Created by Kazak_VV on 14.06.2015.
 */
public class Record {

    java.util.Set<RecordMetric> metrics = new HashSet<>();

    public Record() {
    }

    public Set<RecordMetric> getMetrics() {
        return metrics;
    }
}
