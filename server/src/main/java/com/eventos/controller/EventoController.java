package com.eventos.controller;

import com.eventos.dto.EventoDTO;
import com.eventos.model.Evento;
import com.eventos.model.Local;
import com.eventos.model.Apresentador;
import com.eventos.repository.EventoRepository;
import com.eventos.repository.LocalRepository;
import com.eventos.repository.ApresentadorRepository;
import com.eventos.repository.InscricaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    private static final Logger logger = LoggerFactory.getLogger(EventoController.class);

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private ApresentadorRepository apresentadorRepository;

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @GetMapping
    public List<EventoDTO> listarTodos() {
        logger.info("Listando todos os eventos");
        return eventoRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> buscarPorId(@PathVariable Long id) {
        logger.info("Buscando evento com ID: {}", id);
        return eventoRepository.findById(id)
                .map(evento -> ResponseEntity.ok(converterParaDTO(evento)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EventoDTO> criar(@RequestBody EventoDTO eventoDTO) {
        logger.info("Criando novo evento: {}", eventoDTO);
        try {
            Evento evento = new Evento();
            evento.setTitulo(eventoDTO.getTitulo());
            evento.setDescricao(eventoDTO.getDescricao());
            evento.setDataInicio(eventoDTO.getDataInicio());
            evento.setDataFim(eventoDTO.getDataFim());
            
            if (eventoDTO.getLocal() != null && eventoDTO.getLocal().getId() != null) {
                logger.info("Buscando local com ID: {}", eventoDTO.getLocal().getId());
                Local local = localRepository.findById(eventoDTO.getLocal().getId())
                        .orElseThrow(() -> new RuntimeException("Local não encontrado"));
                evento.setLocal(local);
            } else {
                logger.warn("Local não fornecido ou ID inválido");
                return ResponseEntity.badRequest().<EventoDTO>build();
            }
            
            if (eventoDTO.getApresentador() != null && eventoDTO.getApresentador().getId() != null) {
                logger.info("Buscando apresentador com ID: {}", eventoDTO.getApresentador().getId());
                Apresentador apresentador = apresentadorRepository.findById(eventoDTO.getApresentador().getId())
                        .orElseThrow(() -> new RuntimeException("Apresentador não encontrado"));
                evento.setApresentador(apresentador);
            } else {
                logger.warn("Apresentador não fornecido ou ID inválido");
                return ResponseEntity.badRequest().<EventoDTO>build();
            }
            
            evento.setCapacidade(eventoDTO.getCapacidade());
            evento.setValor(eventoDTO.getValor());
            
            Evento eventoSalvo = eventoRepository.save(evento);
            logger.info("Evento criado com sucesso: {}", eventoSalvo.getId());
            
            return ResponseEntity.ok(converterParaDTO(eventoSalvo));
        } catch (Exception e) {
            logger.error("Erro ao criar evento: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().<EventoDTO>build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoDTO> atualizar(@PathVariable Long id, @RequestBody EventoDTO eventoDTO) {
        logger.info("Atualizando evento com ID: {}", id);
        try {
            return eventoRepository.findById(id)
                    .map(evento -> {
                        evento.setTitulo(eventoDTO.getTitulo());
                        evento.setDescricao(eventoDTO.getDescricao());
                        evento.setDataInicio(eventoDTO.getDataInicio());
                        evento.setDataFim(eventoDTO.getDataFim());
                        
                        if (eventoDTO.getLocal() != null && eventoDTO.getLocal().getId() != null) {
                            logger.info("Buscando local com ID: {}", eventoDTO.getLocal().getId());
                            Local local = localRepository.findById(eventoDTO.getLocal().getId())
                                    .orElseThrow(() -> new RuntimeException("Local não encontrado"));
                            evento.setLocal(local);
                        } else {
                            logger.warn("Local não fornecido ou ID inválido");
                            return ResponseEntity.badRequest().<EventoDTO>build();
                        }
                        
                        if (eventoDTO.getApresentador() != null && eventoDTO.getApresentador().getId() != null) {
                            logger.info("Buscando apresentador com ID: {}", eventoDTO.getApresentador().getId());
                            Apresentador apresentador = apresentadorRepository.findById(eventoDTO.getApresentador().getId())
                                    .orElseThrow(() -> new RuntimeException("Apresentador não encontrado"));
                            evento.setApresentador(apresentador);
                        } else {
                            logger.warn("Apresentador não fornecido ou ID inválido");
                            return ResponseEntity.badRequest().<EventoDTO>build();
                        }
                        
                        evento.setCapacidade(eventoDTO.getCapacidade());
                        evento.setValor(eventoDTO.getValor());
                        
                        Evento eventoAtualizado = eventoRepository.save(evento);
                        logger.info("Evento atualizado com sucesso: {}", eventoAtualizado.getId());
                        
                        return ResponseEntity.ok(converterParaDTO(eventoAtualizado));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao atualizar evento: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().<EventoDTO>build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        logger.info("Deletando evento com ID: {}", id);
        try {
            return eventoRepository.findById(id)
                    .map(evento -> {
                        inscricaoRepository.deleteByEventoId(id);
                        eventoRepository.delete(evento);
                        logger.info("Evento deletado com sucesso: {}", id);
                        return ResponseEntity.ok().build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao deletar evento: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    private EventoDTO converterParaDTO(Evento evento) {
        EventoDTO dto = new EventoDTO();
        dto.setId(evento.getId());
        dto.setTitulo(evento.getTitulo());
        dto.setDescricao(evento.getDescricao());
        dto.setDataInicio(evento.getDataInicio());
        dto.setDataFim(evento.getDataFim());
        dto.setLocal(evento.getLocal());
        dto.setApresentador(evento.getApresentador());
        dto.setCapacidade(evento.getCapacidade());
        dto.setValor(evento.getValor());
        return dto;
    }
} 