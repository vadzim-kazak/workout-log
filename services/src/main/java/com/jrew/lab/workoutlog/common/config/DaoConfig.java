package com.jrew.lab.workoutlog.common.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Kazak_VV on 18.06.2015.
 */
@Configuration
public class DaoConfig {

    @Value(value = "${mongodb.connection.url}")
    private String connectionUrl;

    @Bean
    public MongoClient mongoClient() {

        MongoClientURI mongoClientURI = new MongoClientURI(connectionUrl);
        return new MongoClient(mongoClientURI);
    }


    @Bean
    public Datastore datastore() {

        Morphia morphia = new Morphia();
        morphia.mapPackage("com.jrew.lab.workoutlog");

        final Datastore datastore = morphia.createDatastore(mongoClient(), "workoutlog");
        datastore.ensureIndexes();

        return datastore;
    }

}
