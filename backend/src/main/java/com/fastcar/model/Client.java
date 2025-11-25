package com.fastcar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Client {
    @Id
    @Column(length = 15, nullable = false, unique = true)
    private String cin;

    @Column(length = 30, nullable = false)
    private String nom;
    
    @Column(length = 30, nullable = false)
    private String prenom;

    @Column(length = 30, nullable = false)
    private String ville;

    @Column(length = 30, nullable = false)
    private String rue;

    @Column(nullable =false)
    private Long telephone;

    @Column(length = 30, nullable = false)
    private String email;

    @OneToMany(mappedBy="client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Contrat> contrats;
    
    // Getters and Setters
    public String getCin() {
        return cin;
    }
    
    public void setCin(String cin) {
        this.cin = cin;
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
    
    public String getVille() {
        return ville;
    }
    
    public void setVille(String ville) {
        this.ville = ville;
    }
    
    public String getRue() {
        return rue;
    }
    
    public void setRue(String rue) {
        this.rue = rue;
    }
    
    public Long getTelephone() {
        return telephone;
    }
    
    public void setTelephone(Long telephone) {
        this.telephone = telephone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public List<Contrat> getContrats() {
        return contrats;
    }
    
    public void setContrats(List<Contrat> contrats) {
        this.contrats = contrats;
    }
}
