package com.booktracker.app.Repositories.EntityManager;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


public class JpaEntityManager {

    public static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("Persistence_MANAGER_Unit");

}
