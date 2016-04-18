package com.jrew.lab.workoutlog.common.model.i18n;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jrew.lab.workoutlog.common.util.serializer.MultiLingualStringSerializer;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Transient;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Created by Kazak_VV on 18.06.2015.
 */
@Embedded
@JsonSerialize(using = MultiLingualStringSerializer.class)
public class MultiLingualString {

    @Transient
    private static final String DEFAULT_LANGUAGE = "en";

    private Map<String, String> values = new HashMap<>();

    public MultiLingualString() {}

    public MultiLingualString(String value) {
        values.put(DEFAULT_LANGUAGE, value);
    }

    public MultiLingualString(String language, String value) {
        values.put(language, value);
    }

    public Optional<String> getValue() {

        /**
         *  Try to return value for the default language.
         */
        if (values.containsKey(DEFAULT_LANGUAGE)) {
            return Optional.of(values.get(DEFAULT_LANGUAGE));
        }

        return Optional.empty();
    }


    public Optional<String> getValue(String language) {

        /**
         *  First try to find value according to provided language
         */
        if (values.containsKey(language)) {
            return Optional.of(values.get(language));
        }

        return Optional.empty();
    }

    public void addValue(String value) {
        values.put(DEFAULT_LANGUAGE, value);
    }

    public void addValue(String language, String value) {
        values.put(language, value);
    }
}
