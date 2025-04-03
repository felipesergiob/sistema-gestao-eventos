package com.eventos.controller;

import com.eventos.dto.ApresentadorDTO;
import com.eventos.model.Apresentador;
import com.eventos.repository.ApresentadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/apresentadores")
@CrossOrigin(origins = "http://localhost:5173")
public class ApresentadorController {

    @Autowired
    private ApresentadorRepository apresentadorRepository;

    @GetMapping
    public List<ApresentadorDTO> listarTodos() {
        return apresentadorRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApresentadorDTO> buscarPorId(@PathVariable Long id) {
        return apresentadorRepository.findById(id)
                .map(apresentador -> ResponseEntity.ok(converterParaDTO(apresentador)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ApresentadorDTO criar(@RequestBody ApresentadorDTO apresentadorDTO) {
        Apresentador apresentador = new Apresentador();
        apresentador.setNome(apresentadorDTO.getNome());
        apresentador.setEmail(apresentadorDTO.getEmail());
        apresentador.setTelefone(apresentadorDTO.getTelefone());
        apresentador.setBiografia(apresentadorDTO.getBiografia());
        apresentador.setEspecialidade(apresentadorDTO.getEspecialidade());
        return converterParaDTO(apresentadorRepository.save(apresentador));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApresentadorDTO> atualizar(@PathVariable Long id, @RequestBody ApresentadorDTO apresentadorDTO) {
        return apresentadorRepository.findById(id)
                .map(apresentador -> {
                    apresentador.setNome(apresentadorDTO.getNome());
                    apresentador.setEmail(apresentadorDTO.getEmail());
                    apresentador.setTelefone(apresentadorDTO.getTelefone());
                    apresentador.setBiografia(apresentadorDTO.getBiografia());
                    apresentador.setEspecialidade(apresentadorDTO.getEspecialidade());
                    return ResponseEntity.ok(converterParaDTO(apresentadorRepository.save(apresentador)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return apresentadorRepository.findById(id)
                .map(apresentador -> {
                    apresentadorRepository.delete(apresentador);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private ApresentadorDTO converterParaDTO(Apresentador apresentador) {
        ApresentadorDTO dto = new ApresentadorDTO();
        dto.setId(apresentador.getId());
        dto.setNome(apresentador.getNome());
        dto.setEmail(apresentador.getEmail());
        dto.setTelefone(apresentador.getTelefone());
        dto.setBiografia(apresentador.getBiografia());
        dto.setEspecialidade(apresentador.getEspecialidade());
        return dto;
    }
} 