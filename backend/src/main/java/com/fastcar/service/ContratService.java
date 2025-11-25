package com.fastcar.service;

import com.fastcar.model.Contrat;
import com.fastcar.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContratService {
    
    @Autowired
    private ContratRepository contratRepository;
    
    public List<Contrat> getAllContrats() {
        return contratRepository.findAll();
    }
    
    public Optional<Contrat> getContratById(String numContrat) {
        return contratRepository.findById(numContrat);
    }
    
    public Contrat createContrat(Contrat contrat) {
        return contratRepository.save(contrat);
    }
    
    public Contrat updateContrat(String numContrat, Contrat contratDetails) {
        Optional<Contrat> optionalContrat = contratRepository.findById(numContrat);
        if (optionalContrat.isPresent()) {
            Contrat contrat = optionalContrat.get();
            contrat.setCar(contratDetails.getCar());
            contrat.setAgent(contratDetails.getAgent());
            contrat.setClient(contratDetails.getClient());
            contrat.setDateDebut(contratDetails.getDateDebut());
            contrat.setDateFin(contratDetails.getDateFin());
            contrat.setModPaiement(contratDetails.getModPaiement());
            return contratRepository.save(contrat);
        }
        return null;
    }
    
    public boolean deleteContrat(String numContrat) {
        if (contratRepository.existsById(numContrat)) {
            contratRepository.deleteById(numContrat);
            return true;
        }
        return false;
    }
    
    public boolean existsById(String numContrat) {
        return contratRepository.existsById(numContrat);
    }
}
