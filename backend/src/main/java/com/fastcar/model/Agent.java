package com.fastcar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Agent {
    @Id
    @Column(length = 15, nullable = false, unique = true)
    private String numAgent;

    @Column(length = 30, nullable = false)
    private String nom;
    
    @Column(length = 30, nullable = false)
    private String prenom;

    @OneToMany(mappedBy="agent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Contrat> contrats;
    
    // Getters and Setters
    public String getNumAgent() {
        return numAgent;
    }
    
    public void setNumAgent(String numAgent) {
        this.numAgent = numAgent;
    }
    
    public String getNom() {
        return nom;
    }
    
    public void setNom(String nom) {
        this.nom = nom;
    }
    
    public String getPrenom() {
        return prenom;
    }
    
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    
    public List<Contrat> getContrats() {
        return contrats;
    }
    
    public void setContrats(List<Contrat> contrats) {
        this.contrats = contrats;
    }
}
