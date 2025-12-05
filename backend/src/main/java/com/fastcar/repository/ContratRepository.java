package com.fastcar.repository;

import com.fastcar.model.Contrat;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, String> {
     @Query("SELECT c FROM Contrat c WHERE c.car.matricule = :matricule " +
           "AND c.dateDebut <= :dateFin " +
           "AND c.dateFin >= :dateDebut")
    List<Contrat> findConflictingContrats(
            @Param("matricule") String matricule,
            @Param("dateDebut") LocalDate dateDebut,
            @Param("dateFin") LocalDate dateFin
    );
}
