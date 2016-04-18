package com.jrew.lab.workoutlog.uom.config;

import com.jrew.lab.workoutlog.uom.model.MeasureCategory;
import com.jrew.lab.workoutlog.uom.model.MeasureUnit;
import com.jrew.lab.workoutlog.uom.model.SystemOfUnits;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Kazak_VV on 17.06.2015.
 */
@Configuration
public class MeasureUnitsConfig {

    @Bean
    public MeasureUnit reps() {
        return new MeasureUnit(MeasureCategory.REPETITION, SystemOfUnits.GENERAL, "reps", 1.0);
    }

    @Bean
    public MeasureUnit level() {
        return new MeasureUnit(MeasureCategory.LEVEL, SystemOfUnits.GENERAL, "lvl", 1.0);
    }

    @Bean
    public MeasureUnit millisecond() {
        return new MeasureUnit(MeasureCategory.DURATION, SystemOfUnits.GENERAL, "ms", 0.001);
    }

    @Bean
    public MeasureUnit second() {
        return new MeasureUnit(MeasureCategory.DURATION, SystemOfUnits.GENERAL, "sec", 1.0);
    }

    @Bean
    public MeasureUnit min() {
        return new MeasureUnit(MeasureCategory.DURATION, SystemOfUnits.GENERAL, "min", 60);
    }

    @Bean
    public MeasureUnit hour() {
        return new MeasureUnit(MeasureCategory.DURATION, SystemOfUnits.GENERAL, "hr", 60 * 60);
    }

    @Bean
    public MeasureUnit day() {
        return new MeasureUnit(MeasureCategory.DURATION, SystemOfUnits.GENERAL, "d", 60 * 60 * 24);
    }

    @Bean
    public MeasureUnit millimeter() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.SI, "mm", 0.001);
    }

    @Bean
    public MeasureUnit centimeter() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.SI, "cm", 0.01);
    }

    @Bean
    public MeasureUnit meter() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.SI, "m", 1.0);
    }

    @Bean
    public MeasureUnit kilometer() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.SI, "km", 1000);
    }

    @Bean
    public MeasureUnit inch() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.IMPERIAL, "in", 0.0254);
    }

    @Bean
    public MeasureUnit foot() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.IMPERIAL, "ft", 0.3048);
    }

    @Bean
    public MeasureUnit yard() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.IMPERIAL, "yd", 0.9144);
    }

    @Bean
    public MeasureUnit mile() {
        return new MeasureUnit(MeasureCategory.DISTANCE, SystemOfUnits.IMPERIAL, "mi", 1609.344);
    }

    @Bean
    public MeasureUnit gram() {
        return new MeasureUnit(MeasureCategory.WEIGHT, SystemOfUnits.SI, "g", 1.0);
    }

    @Bean
    public MeasureUnit kilogram() {
        return new MeasureUnit(MeasureCategory.WEIGHT, SystemOfUnits.SI, "kg", 1000);
    }

    @Bean
    public MeasureUnit ton() {
        return new MeasureUnit(MeasureCategory.WEIGHT, SystemOfUnits.SI, "t", 1000 * 1000);
    }

    @Bean
    public MeasureUnit ounce() {
        return new MeasureUnit(MeasureCategory.WEIGHT, SystemOfUnits.IMPERIAL, "oz", 28.349523125);
    }

    @Bean
    public MeasureUnit pound() {
        return new MeasureUnit(MeasureCategory.WEIGHT, SystemOfUnits.IMPERIAL, "lb", 453.59237);
    }

}
