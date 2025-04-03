package com.eventos.controller;

import com.eventos.dto.LocalDTO;
import com.eventos.model.Local;
import com.eventos.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locais")
@CrossOrigin(origins = "http://localhost:5173")
public class LocalController {

    @Autowired
    private LocalRepository localRepository;

    @GetMapping
    public List<LocalDTO> listarTodos() {
        return localRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocalDTO> buscarPorId(@PathVariable Long id) {
        return localRepository.findById(id)
                .map(local -> ResponseEntity.ok(converterParaDTO(local)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public LocalDTO criar(@RequestBody LocalDTO localDTO) {
        Local local = new Local();
        local.setNome(localDTO.getNome());
        local.setEndereco(localDTO.getEndereco());
        local.setCapacidade(localDTO.getCapacidade());
        return converterParaDTO(localRepository.save(local));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocalDTO> atualizar(@PathVariable Long id, @RequestBody LocalDTO localDTO) {
        return localRepository.findById(id)
                .map(local -> {
                    local.setNome(localDTO.getNome());
                    local.setEndereco(localDTO.getEndereco());
                    local.setCapacidade(localDTO.getCapacidade());
                    return ResponseEntity.ok(converterParaDTO(localRepository.save(local)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return localRepository.findById(id)
                .map(local -> {
                    localRepository.delete(local);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private LocalDTO converterParaDTO(Local local) {
        LocalDTO dto = new LocalDTO();
        dto.setId(local.getId());
        dto.setNome(local.getNome());
        dto.setEndereco(local.getEndereco());
        dto.setCapacidade(local.getCapacidade());
        return dto;
    }
} 