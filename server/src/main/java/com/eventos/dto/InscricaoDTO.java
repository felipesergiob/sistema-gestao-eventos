package com.eventos.dto;

import com.eventos.model.Inscricao;
import java.time.LocalDateTime;

public class InscricaoDTO {
    private Long id;
    private Long eventoId;
    private Long participanteId;
    private LocalDateTime dataInscricao;
    private Inscricao.StatusInscricao status;
    private String nomeEvento;
    private String nomeParticipante;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventoId() {
        return eventoId;
    }

    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }

    public Long getParticipanteId() {
        return participanteId;
    }

    public void setParticipanteId(Long participanteId) {
        this.participanteId = participanteId;
    }

    public LocalDateTime getDataInscricao() {
        return dataInscricao;
    }

    public void setDataInscricao(LocalDateTime dataInscricao) {
        this.dataInscricao = dataInscricao;
    }

    public Inscricao.StatusInscricao getStatus() {
        return status;
    }

    public void setStatus(Inscricao.StatusInscricao status) {
        this.status = status;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public String getNomeParticipante() {
        return nomeParticipante;
    }

    public void setNomeParticipante(String nomeParticipante) {
        this.nomeParticipante = nomeParticipante;
    }
} 