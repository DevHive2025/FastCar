package com.fastcar.service;

import com.fastcar.model.Client;
import com.fastcar.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;
    
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
    
    public Optional<Client> getClientById(String cin) {
        return clientRepository.findById(cin);
    }
    
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }
    
    public Client updateClient(String cin, Client clientDetails) {
        Optional<Client> optionalClient = clientRepository.findById(cin);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.setNom(clientDetails.getNom());
            client.setPrenom(clientDetails.getPrenom());
            client.setVille(clientDetails.getVille());
            client.setRue(clientDetails.getRue());
            client.setTelephone(clientDetails.getTelephone());
            client.setEmail(clientDetails.getEmail());
            return clientRepository.save(client);
        }
        return null;
    }
    
    public boolean deleteClient(String cin) {
        if (clientRepository.existsById(cin)) {
            clientRepository.deleteById(cin);
            return true;
        }
        return false;
    }
    
    public boolean existsById(String cin) {
        return clientRepository.existsById(cin);
    }
}
