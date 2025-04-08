package com.eventos.controller;

import com.eventos.dto.ApresentadorDTO;
import com.eventos.model.Apresentador;
import com.eventos.repository.ApresentadorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/apresentadores")
@CrossOrigin(origins = "http://localhost:5173")
public class ApresentadorController {

    private static final Logger logger = LoggerFactory.getLogger(ApresentadorController.class);

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
    public ResponseEntity<ApresentadorDTO> criar(@RequestBody ApresentadorDTO apresentadorDTO) {
        try {
            logger.info("Recebendo requisição para criar apresentador: {}", apresentadorDTO);
            
            Apresentador apresentador = new Apresentador();
            apresentador.setNome(apresentadorDTO.getNome());
            apresentador.setEmail(apresentadorDTO.getEmail());
            apresentador.setTelefone(apresentadorDTO.getTelefone());
            apresentador.setEspecialidade(apresentadorDTO.getEspecialidade());
            apresentador.setBiografia(apresentadorDTO.getBiografia());
            
            Apresentador apresentadorSalvo = apresentadorRepository.save(apresentador);
            logger.info("Apresentador criado com sucesso: {}", apresentadorSalvo.getId());
            
            return ResponseEntity.ok(converterParaDTO(apresentadorSalvo));
        } catch (Exception e) {
            logger.error("Erro ao criar apresentador: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().<ApresentadorDTO>build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApresentadorDTO> atualizar(@PathVariable Long id, @RequestBody ApresentadorDTO apresentadorDTO) {
        try {
            logger.info("Recebendo requisição para atualizar apresentador com ID {}: {}", id, apresentadorDTO);
            
            return apresentadorRepository.findById(id)
                    .map(apresentador -> {
                        apresentador.setNome(apresentadorDTO.getNome());
                        apresentador.setEmail(apresentadorDTO.getEmail());
                        apresentador.setTelefone(apresentadorDTO.getTelefone());
                        apresentador.setEspecialidade(apresentadorDTO.getEspecialidade());
                        apresentador.setBiografia(apresentadorDTO.getBiografia());
                        
                        Apresentador apresentadorAtualizado = apresentadorRepository.save(apresentador);
                        logger.info("Apresentador atualizado com sucesso: {}", apresentadorAtualizado.getId());
                        
                        return ResponseEntity.ok(converterParaDTO(apresentadorAtualizado));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao atualizar apresentador: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().<ApresentadorDTO>build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            logger.info("Recebendo requisição para deletar apresentador com ID: {}", id);
            
            return apresentadorRepository.findById(id)
                    .map(apresentador -> {
                        apresentadorRepository.delete(apresentador);
                        logger.info("Apresentador deletado com sucesso: {}", id);
                        return ResponseEntity.ok().build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao deletar apresentador: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    private ApresentadorDTO converterParaDTO(Apresentador apresentador) {
        ApresentadorDTO dto = new ApresentadorDTO();
        dto.setId(apresentador.getId());
        dto.setNome(apresentador.getNome());
        dto.setEmail(apresentador.getEmail());
        dto.setTelefone(apresentador.getTelefone());
        dto.setEspecialidade(apresentador.getEspecialidade());
        dto.setBiografia(apresentador.getBiografia());
        return dto;
    }
} 