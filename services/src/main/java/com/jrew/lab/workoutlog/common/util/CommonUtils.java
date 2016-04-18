package com.jrew.lab.workoutlog.common.util;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

/**
 * Created by Kazak_VV on 17.06.2015.
 */
public class CommonUtils {

    public static <E> Optional<E> find(E[] values, Function<E, String> transformer, String value) {

        return Stream.of(values)
                     .filter(currentValue -> transformer.apply(currentValue).equalsIgnoreCase(value))
                     .findFirst();
    }

    public static <E> Optional<E> find(E[] values, String value) {

        return Stream.of(values)
                .filter(currentValue -> currentValue.toString().equalsIgnoreCase(value))
                .findFirst();
    }

}
