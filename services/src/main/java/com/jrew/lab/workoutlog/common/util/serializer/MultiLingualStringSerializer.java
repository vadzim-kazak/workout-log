package com.jrew.lab.workoutlog.common.util.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.jrew.lab.workoutlog.common.model.i18n.MultiLingualString;
import org.springframework.context.i18n.LocaleContextHolder;

import java.io.IOException;
import java.util.Locale;
import java.util.Optional;

/**
 * Created by Kazak_VV on 18.06.2015.
 */
public class MultiLingualStringSerializer extends JsonSerializer<MultiLingualString> {

    @Override
    public void serialize(MultiLingualString multiLingualString, final JsonGenerator jsonGenerator,
                          SerializerProvider serializers) throws IOException {


        Locale locale = LocaleContextHolder.getLocale();
        Optional<String> valueOptional = multiLingualString.getValue(locale.getLanguage());
        if (valueOptional.isPresent()) {
            jsonGenerator.writeString(valueOptional.get());
        }
    }
}
