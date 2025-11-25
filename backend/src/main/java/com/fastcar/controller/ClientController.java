package com.fastcar.controller;

import com.fastcar.model.Client;
import com.fastcar.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {
    
    @Autowired
    private ClientService clientService;
    
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }
    
    @GetMapping("/{cin}")
    public ResponseEntity<Client> getClientById(@PathVariable String cin) {
        Optional<Client> client = clientService.getClientById(cin);
        return client.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        Client createdClient = clientService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }
    
    @PutMapping("/{cin}")
    public ResponseEntity<Client> updateClient(@PathVariable String cin, @RequestBody Client clientDetails) {
        Client updatedClient = clientService.updateClient(cin, clientDetails);
        if (updatedClient != null) {
            return ResponseEntity.ok(updatedClient);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{cin}")
    public ResponseEntity<Void> deleteClient(@PathVariable String cin) {
        boolean deleted = clientService.deleteClient(cin);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
