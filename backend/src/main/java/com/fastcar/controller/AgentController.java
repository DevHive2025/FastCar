package com.fastcar.controller;

import com.fastcar.model.Agent;
import com.fastcar.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin(origins = "*")
public class AgentController {
    
    @Autowired
    private AgentService agentService;
    
    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        List<Agent> agents = agentService.getAllAgents();
        return ResponseEntity.ok(agents);
    }
    
    @GetMapping("/{numAgent}")
    public ResponseEntity<Agent> getAgentById(@PathVariable String numAgent) {
        Optional<Agent> agent = agentService.getAgentById(numAgent);
        return agent.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Agent> createAgent(@RequestBody Agent agent) {
        Agent createdAgent = agentService.createAgent(agent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAgent);
    }
    
    @PutMapping("/{numAgent}")
    public ResponseEntity<Agent> updateAgent(@PathVariable String numAgent, @RequestBody Agent agentDetails) {
        Agent updatedAgent = agentService.updateAgent(numAgent, agentDetails);
        if (updatedAgent != null) {
            return ResponseEntity.ok(updatedAgent);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{numAgent}")
    public ResponseEntity<Void> deleteAgent(@PathVariable String numAgent) {
        boolean deleted = agentService.deleteAgent(numAgent);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
