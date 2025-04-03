package com.eventos.controller;

import com.eventos.dto.InscricaoDTO;
import com.eventos.model.*;
import com.eventos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inscricoes")
@CrossOrigin(origins = "http://localhost:5173")
public class InscricaoController {

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private ParticipanteRepository participanteRepository;

    @GetMapping
    public List<InscricaoDTO> listarTodos() {
        return inscricaoRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscricaoDTO> buscarPorId(@PathVariable Long id) {
        return inscricaoRepository.findById(id)
                .map(inscricao -> ResponseEntity.ok(converterParaDTO(inscricao)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<InscricaoDTO> criar(@RequestBody InscricaoDTO inscricaoDTO) {
        Evento evento = eventoRepository.findById(inscricaoDTO.getEventoId())
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        
        Participante participante = participanteRepository.findById(inscricaoDTO.getParticipanteId())
                .orElseThrow(() -> new RuntimeException("Participante não encontrado"));

        if (inscricaoRepository.existsByEventoIdAndParticipanteId(evento.getId(), participante.getId())) {
            throw new RuntimeException("Participante já inscrito neste evento");
        }

        Inscricao inscricao = new Inscricao();
        inscricao.setEvento(evento);
        inscricao.setParticipante(participante);
        inscricao.setDataInscricao(LocalDateTime.now());
        inscricao.setStatus(Inscricao.StatusInscricao.PENDENTE);

        return ResponseEntity.ok(converterParaDTO(inscricaoRepository.save(inscricao)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<InscricaoDTO> atualizarStatus(@PathVariable Long id, @RequestBody String status) {
        return inscricaoRepository.findById(id)
                .map(inscricao -> {
                    inscricao.setStatus(Inscricao.StatusInscricao.valueOf(status));
                    return ResponseEntity.ok(converterParaDTO(inscricaoRepository.save(inscricao)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return inscricaoRepository.findById(id)
                .map(inscricao -> {
                    inscricaoRepository.delete(inscricao);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private InscricaoDTO converterParaDTO(Inscricao inscricao) {
        InscricaoDTO dto = new InscricaoDTO();
        dto.setId(inscricao.getId());
        dto.setEventoId(inscricao.getEvento().getId());
        dto.setParticipanteId(inscricao.getParticipante().getId());
        dto.setDataInscricao(inscricao.getDataInscricao());
        dto.setStatus(inscricao.getStatus());
        dto.setNomeEvento(inscricao.getEvento().getTitulo());
        dto.setNomeParticipante(inscricao.getParticipante().getNome());
        return dto;
    }
} 