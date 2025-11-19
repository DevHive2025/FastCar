package com.fastcar.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Car {
    @Id
    @Column(length = 15, nullable = false, unique = true)
    private String matricule;

    @Column(length = 30, nullable = false)
    private String marque;
    
    @Column(length = 30, nullable = false)
    private String modele;

    @Column(length = 30, nullable = false)
    private String etat;

    @Column(name = "prix_journalier", nullable =false)
    private Long Prix;

    @Column(nullable =false)
    private Long kilometrage;

    @OneToMany(mappedBy="car", cascade = CascadeType.ALL)
    private List<Contrat> contrats; 
}
