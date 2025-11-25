package com.fastcar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy="car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Contrat> contrats;
    
    // Getters and Setters
    public String getMatricule() {
        return matricule;
    }
    
    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }
    
    public String getMarque() {
        return marque;
    }
    
    public void setMarque(String marque) {
        this.marque = marque;
    }
    
    public String getModele() {
        return modele;
    }
    
    public void setModele(String modele) {
        this.modele = modele;
    }
    
    public String getEtat() {
        return etat;
    }
    
    public void setEtat(String etat) {
        this.etat = etat;
    }
    
    public Long getPrix() {
        return Prix;
    }
    
    public void setPrix(Long prix) {
        Prix = prix;
    }
    
    public Long getKilometrage() {
        return kilometrage;
    }
    
    public void setKilometrage(Long kilometrage) {
        this.kilometrage = kilometrage;
    }
    
    public List<Contrat> getContrats() {
        return contrats;
    }
    
    public void setContrats(List<Contrat> contrats) {
        this.contrats = contrats;
    }
}
