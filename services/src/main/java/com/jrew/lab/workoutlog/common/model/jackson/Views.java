package com.jrew.lab.workoutlog.common.model.jackson;

/**
 * Created by Kazak_VV on 17.06.2015.
 */

/**
 * Store jackson view configuration here in order to get rid of circular dependencies between modules.
 */
public class Views {

    public static interface MeasureUnitNameSystem {};

    public static interface MeasureUnitNameSystemRatio extends MeasureUnitNameSystem {};

    public static interface ExerciseNameMetrics {};

    public static interface ExerciseFull extends ExerciseNameMetrics, MeasureUnitNameSystem {};

}
