package com.eventos.controller;

import com.eventos.dto.LocalDTO;
import com.eventos.model.Local;
import com.eventos.repository.LocalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locais")
@CrossOrigin(origins = "http://localhost:5173")
public class LocalController {

    private static final Logger logger = LoggerFactory.getLogger(LocalController.class);

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
    public ResponseEntity<LocalDTO> criar(@RequestBody LocalDTO localDTO) {
        try {
            logger.info("Recebendo requisição para criar local: {}", localDTO);
            
            Local local = new Local();
            local.setNome(localDTO.getNome());
            local.setEndereco(localDTO.getEndereco());
            local.setCidade(localDTO.getCidade());
            local.setEstado(localDTO.getEstado());
            local.setCep(localDTO.getCep());
            local.setCapacidade(localDTO.getCapacidade());
            
            Local localSalvo = localRepository.save(local);
            logger.info("Local criado com sucesso: {}", localSalvo.getId());
            
            return ResponseEntity.ok(converterParaDTO(localSalvo));
        } catch (Exception e) {
            logger.error("Erro ao criar local: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().<LocalDTO>build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocalDTO> atualizar(@PathVariable Long id, @RequestBody LocalDTO localDTO) {
        try {
            logger.info("Recebendo requisição para atualizar local com ID {}: {}", id, localDTO);
            
            return localRepository.findById(id)
                    .map(local -> {
                        local.setNome(localDTO.getNome());
                        local.setEndereco(localDTO.getEndereco());
                        local.setCidade(localDTO.getCidade());
                        local.setEstado(localDTO.getEstado());
                        local.setCep(localDTO.getCep());
                        local.setCapacidade(localDTO.getCapacidade());
                        
                        Local localAtualizado = localRepository.save(local);
                        logger.info("Local atualizado com sucesso: {}", localAtualizado.getId());
                        
                        return ResponseEntity.ok(converterParaDTO(localAtualizado));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao atualizar local: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().<LocalDTO>build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            logger.info("Recebendo requisição para deletar local com ID: {}", id);
            
            return localRepository.findById(id)
                    .map(local -> {
                        localRepository.delete(local);
                        logger.info("Local deletado com sucesso: {}", id);
                        return ResponseEntity.ok().build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao deletar local: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    private LocalDTO converterParaDTO(Local local) {
        LocalDTO dto = new LocalDTO();
        dto.setId(local.getId());
        dto.setNome(local.getNome());
        dto.setEndereco(local.getEndereco());
        dto.setCidade(local.getCidade());
        dto.setEstado(local.getEstado());
        dto.setCep(local.getCep());
        dto.setCapacidade(local.getCapacidade());
        return dto;
    }
} 