package com.jrew.lab.workoutlog.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

/**
 * Created by Kazak_VV on 30.09.2014.
 */
@Configuration
@ComponentScan(basePackages = "com.jrew.lab.workoutlog")
@PropertySource("classpath:config.properties")
public class ApplicationConfig {

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

}



















