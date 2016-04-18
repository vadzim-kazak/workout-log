package com.jrew.lab.workoutlog.uom.service;

import com.jrew.lab.workoutlog.uom.model.MeasureCategory;
import com.jrew.lab.workoutlog.uom.model.MeasureUnit;
import com.jrew.lab.workoutlog.uom.model.SystemOfUnits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by Kazak_VV on 16.06.2015.
 */
@Service
public class MeasureUnitProviderImpl implements MeasureUnitProvider {

    @Autowired
    private Set<MeasureUnit> measureUnits;

    private Map<SystemOfUnits, Map<MeasureCategory, Set<MeasureUnit>>> measures = new HashMap<>();

    @PostConstruct
    private void init() {

       Map<MeasureCategory, Set<MeasureUnit>> siMeasureUnits = measureUnits.stream()
               .collect(Collectors.groupingBy(MeasureUnit::getMeasureCategory,
                       Collectors.toCollection(() -> new TreeSet<>(createComparator(SystemOfUnits.SI)))));
       measures.put(SystemOfUnits.SI, siMeasureUnits);

       Map<MeasureCategory, Set<MeasureUnit>> imMeasureUnits = measureUnits.stream()
                .collect(Collectors.groupingBy(MeasureUnit::getMeasureCategory,
                        Collectors.toCollection(() -> new TreeSet<>(createComparator(SystemOfUnits.IMPERIAL)))));
       measures.put(SystemOfUnits.IMPERIAL, imMeasureUnits);
    }


    @Override
    public Map<MeasureCategory, Set<MeasureUnit>> getAllMeasureUnits(Optional<SystemOfUnits> systemOfUnitsOpt) {

        return systemOfUnitsOpt.filter(systemOfUnits -> systemOfUnits != SystemOfUnits.GENERAL)
                               .map(systemOfUnits -> measures.get(systemOfUnits))
                               .orElse(measures.get(SystemOfUnits.SI));
    }

    @Override
    public Optional<MeasureUnit> findByValue(String value) {

        return measureUnits.stream()
                           .filter(measureUnit -> measureUnit.getValue().equalsIgnoreCase(value))
                           .findFirst();
    }

    /**
     *
     * @param selectedSystemOfUnits
     * @return
     */
    private Comparator<MeasureUnit> createComparator(SystemOfUnits selectedSystemOfUnits) {

        /**
         * 1. In scope of one system of units all items should be sorted in ascending order.
         * 2. In case of different system of units item should be sorted depending on the selected
         * system of units parameter, bit SystemOfUnits.GENERAL must be always first.
         *
         */

        return (first, second) -> {

            if (first.getSystemOfUnits() == second.getSystemOfUnits()) {
                return Double.compare(first.getSiRatio(), second.getSiRatio());
            } else {

                Function<MeasureUnit, Integer> converter = measureUnit -> {

                    if (measureUnit.getSystemOfUnits() == SystemOfUnits.GENERAL) {
                        return 0;
                    } else if(measureUnit.getSystemOfUnits() == selectedSystemOfUnits) {
                        return 1;
                    } else {
                        return 2;
                    }
                };

                return Integer.compare(converter.apply(first), converter.apply(second));
            }
        };
    }
}
