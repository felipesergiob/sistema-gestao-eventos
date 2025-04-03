package com.eventos.controller;

import com.eventos.dto.ParticipanteDTO;
import com.eventos.model.Participante;
import com.eventos.repository.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/participantes")
@CrossOrigin(origins = "http://localhost:5173")
public class ParticipanteController {

    @Autowired
    private ParticipanteRepository participanteRepository;

    @GetMapping
    public List<ParticipanteDTO> listarTodos() {
        return participanteRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParticipanteDTO> buscarPorId(@PathVariable Long id) {
        return participanteRepository.findById(id)
                .map(participante -> ResponseEntity.ok(converterParaDTO(participante)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ParticipanteDTO criar(@RequestBody ParticipanteDTO participanteDTO) {
        Participante participante = new Participante();
        participante.setNome(participanteDTO.getNome());
        participante.setEmail(participanteDTO.getEmail());
        participante.setTelefone(participanteDTO.getTelefone());
        participante.setEmpresa(participanteDTO.getEmpresa());
        return converterParaDTO(participanteRepository.save(participante));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParticipanteDTO> atualizar(@PathVariable Long id, @RequestBody ParticipanteDTO participanteDTO) {
        return participanteRepository.findById(id)
                .map(participante -> {
                    participante.setNome(participanteDTO.getNome());
                    participante.setEmail(participanteDTO.getEmail());
                    participante.setTelefone(participanteDTO.getTelefone());
                    participante.setEmpresa(participanteDTO.getEmpresa());
                    return ResponseEntity.ok(converterParaDTO(participanteRepository.save(participante)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return participanteRepository.findById(id)
                .map(participante -> {
                    participanteRepository.delete(participante);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private ParticipanteDTO converterParaDTO(Participante participante) {
        ParticipanteDTO dto = new ParticipanteDTO();
        dto.setId(participante.getId());
        dto.setNome(participante.getNome());
        dto.setEmail(participante.getEmail());
        dto.setTelefone(participante.getTelefone());
        dto.setEmpresa(participante.getEmpresa());
        return dto;
    }
} 