package com.fastcar.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Contrat {
    @Id
    private String numContrat;

    @ManyToOne
    @JoinColumn(name = "matricule", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "num_agent", nullable = false)
    private Agent agent;

    @ManyToOne
    @JoinColumn(name = "cin_client", nullable = false)
    private Client client;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @Column(length = 30, name = "Mod_paiement", nullable = false)
    private String ModPaiement;
    
    // Getters and Setters
    public String getNumContrat() {
        return numContrat;
    }
    
    public void setNumContrat(String numContrat) {
        this.numContrat = numContrat;
    }
    
    public Car getCar() {
        return car;
    }
    
    public void setCar(Car car) {
        this.car = car;
    }
    
    public Agent getAgent() {
        return agent;
    }
    
    public void setAgent(Agent agent) {
        this.agent = agent;
    }
    
    public Client getClient() {
        return client;
    }
    
    public void setClient(Client client) {
        this.client = client;
    }
    
    public LocalDate getDateDebut() {
        return dateDebut;
    }
    
    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }
    
    public LocalDate getDateFin() {
        return dateFin;
    }
    
    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }
    
    public String getModPaiement() {
        return ModPaiement;
    }
    
    public void setModPaiement(String modPaiement) {
        ModPaiement = modPaiement;
    }
}

