package com.jrew.lab.workoutlog.uom.service;

import com.jrew.lab.workoutlog.uom.model.MeasureCategory;
import com.jrew.lab.workoutlog.uom.model.MeasureUnit;
import com.jrew.lab.workoutlog.uom.model.SystemOfUnits;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * Created by Kazak_VV on 16.06.2015.
 */
public interface MeasureUnitProvider {

    Map<MeasureCategory, Set<MeasureUnit>> getAllMeasureUnits(Optional<SystemOfUnits> systemOfUnits);

    Optional<MeasureUnit> findByValue(String value);
}
