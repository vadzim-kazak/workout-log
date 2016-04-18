package com.jrew.lab.workoutlog.uom.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.jrew.lab.workoutlog.common.model.jackson.Views;
import com.jrew.lab.workoutlog.uom.model.MeasureCategory;
import com.jrew.lab.workoutlog.uom.model.MeasureUnit;
import com.jrew.lab.workoutlog.uom.model.SystemOfUnits;
import com.jrew.lab.workoutlog.uom.service.MeasureUnitProvider;
import com.jrew.lab.workoutlog.common.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * Created by Kazak_VV on 16.06.2015.
 */
@RestController
@RequestMapping(value = "/api/measures")
public class MeasureUnitController {

    @Autowired
    private MeasureUnitProvider measureUnitProvider;

    @JsonView(value = Views.MeasureUnitNameSystemRatio.class)
    @RequestMapping(method = RequestMethod.GET)
    public Map<MeasureCategory, Set<MeasureUnit>> getAllMeasureUnits(@RequestParam(value = "systemOfUnits",
            defaultValue = "") String systemOfUnits) {

        Optional<SystemOfUnits> systemOfUnitsOpt = CommonUtils.find(SystemOfUnits.values(), SystemOfUnits::getValue, systemOfUnits);
        return measureUnitProvider.getAllMeasureUnits(systemOfUnitsOpt);
    }
}
