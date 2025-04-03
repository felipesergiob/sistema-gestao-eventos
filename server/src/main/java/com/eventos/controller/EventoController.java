package com.eventos.controller;

import com.eventos.dto.EventoDTO;
import com.eventos.model.Evento;
import com.eventos.model.Local;
import com.eventos.model.Apresentador;
import com.eventos.repository.EventoRepository;
import com.eventos.repository.LocalRepository;
import com.eventos.repository.ApresentadorRepository;
import com.eventos.repository.InscricaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

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
        return eventoRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> buscarPorId(@PathVariable Long id) {
        return eventoRepository.findById(id)
                .map(evento -> ResponseEntity.ok(converterParaDTO(evento)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EventoDTO> criar(@RequestBody EventoDTO eventoDTO) {
        Evento evento = new Evento();
        evento.setTitulo(eventoDTO.getTitulo());
        evento.setDescricao(eventoDTO.getDescricao());
        evento.setDataInicio(eventoDTO.getDataInicio());
        evento.setDataFim(eventoDTO.getDataFim());
        
        if (eventoDTO.getLocal() != null && eventoDTO.getLocal().getId() != null) {
            Local local = localRepository.findById(eventoDTO.getLocal().getId())
                    .orElseThrow(() -> new RuntimeException("Local não encontrado"));
            evento.setLocal(local);
        }
        
        if (eventoDTO.getApresentador() != null && eventoDTO.getApresentador().getId() != null) {
            Apresentador apresentador = apresentadorRepository.findById(eventoDTO.getApresentador().getId())
                    .orElseThrow(() -> new RuntimeException("Apresentador não encontrado"));
            evento.setApresentador(apresentador);
        }
        
        evento.setCapacidadeMaxima(eventoDTO.getCapacidadeMaxima());
        evento.setPreco(eventoDTO.getPreco());
        
        return ResponseEntity.ok(converterParaDTO(eventoRepository.save(evento)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoDTO> atualizar(@PathVariable Long id, @RequestBody EventoDTO eventoDTO) {
        return eventoRepository.findById(id)
                .map(evento -> {
                    evento.setTitulo(eventoDTO.getTitulo());
                    evento.setDescricao(eventoDTO.getDescricao());
                    evento.setDataInicio(eventoDTO.getDataInicio());
                    evento.setDataFim(eventoDTO.getDataFim());
                    
                    if (eventoDTO.getLocal() != null && eventoDTO.getLocal().getId() != null) {
                        Local local = localRepository.findById(eventoDTO.getLocal().getId())
                                .orElseThrow(() -> new RuntimeException("Local não encontrado"));
                        evento.setLocal(local);
                    }
                    
                    if (eventoDTO.getApresentador() != null && eventoDTO.getApresentador().getId() != null) {
                        Apresentador apresentador = apresentadorRepository.findById(eventoDTO.getApresentador().getId())
                                .orElseThrow(() -> new RuntimeException("Apresentador não encontrado"));
                        evento.setApresentador(apresentador);
                    }
                    
                    evento.setCapacidadeMaxima(eventoDTO.getCapacidadeMaxima());
                    evento.setPreco(eventoDTO.getPreco());
                    return ResponseEntity.ok(converterParaDTO(eventoRepository.save(evento)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return eventoRepository.findById(id)
                .map(evento -> {
                    inscricaoRepository.deleteByEventoId(id);
                    eventoRepository.delete(evento);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
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
        dto.setCapacidadeMaxima(evento.getCapacidadeMaxima());
        dto.setPreco(evento.getPreco());
        return dto;
    }
} 