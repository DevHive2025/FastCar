package com.fastcar.service;

import com.fastcar.model.Agent;
import com.fastcar.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {
    
    @Autowired
    private AgentRepository agentRepository;
    
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }
    
    public Optional<Agent> getAgentById(String numAgent) {
        return agentRepository.findById(numAgent);
    }
    
    public Agent createAgent(Agent agent) {
        return agentRepository.save(agent);
    }
    
    public Agent updateAgent(String numAgent, Agent agentDetails) {
        Optional<Agent> optionalAgent = agentRepository.findById(numAgent);
        if (optionalAgent.isPresent()) {
            Agent agent = optionalAgent.get();
            agent.setNom(agentDetails.getNom());
            agent.setPrenom(agentDetails.getPrenom());
            return agentRepository.save(agent);
        }
        return null;
    }
    
    public boolean deleteAgent(String numAgent) {
        if (agentRepository.existsById(numAgent)) {
            agentRepository.deleteById(numAgent);
            return true;
        }
        return false;
    }
    
    public boolean existsById(String numAgent) {
        return agentRepository.existsById(numAgent);
    }
}
