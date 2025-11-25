package com.fastcar.controller;

import com.fastcar.model.Contrat;
import com.fastcar.service.ContratService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contrats")
@CrossOrigin(origins = "*")
public class ContratController {
    
    @Autowired
    private ContratService contratService;
    
    @GetMapping
    public ResponseEntity<List<Contrat>> getAllContrats() {
        List<Contrat> contrats = contratService.getAllContrats();
        return ResponseEntity.ok(contrats);
    }
    
    @GetMapping("/{numContrat}")
    public ResponseEntity<Contrat> getContratById(@PathVariable String numContrat) {
        Optional<Contrat> contrat = contratService.getContratById(numContrat);
        return contrat.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Contrat> createContrat(@RequestBody Contrat contrat) {
        Contrat createdContrat = contratService.createContrat(contrat);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdContrat);
    }
    
    @PutMapping("/{numContrat}")
    public ResponseEntity<Contrat> updateContrat(@PathVariable String numContrat, @RequestBody Contrat contratDetails) {
        Contrat updatedContrat = contratService.updateContrat(numContrat, contratDetails);
        if (updatedContrat != null) {
            return ResponseEntity.ok(updatedContrat);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{numContrat}")
    public ResponseEntity<Void> deleteContrat(@PathVariable String numContrat) {
        boolean deleted = contratService.deleteContrat(numContrat);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
