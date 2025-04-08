package com.eventos.controller;

import com.eventos.model.Participante;
import com.eventos.repository.ParticipanteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/participantes", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class ParticipanteController {

    private static final Logger logger = LoggerFactory.getLogger(ParticipanteController.class);

    @Autowired
    private ParticipanteRepository participanteRepository;

    @GetMapping
    public List<Participante> listarTodos() {
        logger.info("Listando todos os participantes");
        return participanteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participante> buscarPorId(@PathVariable Long id) {
        logger.info("Buscando participante com ID: {}", id);
        return participanteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participante> criar(@RequestBody Participante participante) {
        logger.info("Criando novo participante: {}", participante);
        try {
            Participante novoParticipante = participanteRepository.save(participante);
            return ResponseEntity.ok(novoParticipante);
        } catch (Exception e) {
            logger.error("Erro ao criar participante: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Participante> atualizar(@PathVariable Long id, @RequestBody Participante participanteAtualizado) {
        logger.info("Atualizando participante com ID: {}", id);
        return participanteRepository.findById(id)
                .map(participante -> {
                    participante.setNome(participanteAtualizado.getNome());
                    participante.setEmail(participanteAtualizado.getEmail());
                    participante.setTelefone(participanteAtualizado.getTelefone());
                    participante.setEmpresa(participanteAtualizado.getEmpresa());
                    participante.setCpf(participanteAtualizado.getCpf());
                    participante.setDataNascimento(participanteAtualizado.getDataNascimento());
                    return ResponseEntity.ok(participanteRepository.save(participante));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        logger.info("Deletando participante com ID: {}", id);
        return participanteRepository.findById(id)
                .map(participante -> {
                    participanteRepository.delete(participante);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 