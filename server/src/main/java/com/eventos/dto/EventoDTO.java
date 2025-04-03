package com.eventos.dto;

import com.eventos.model.Local;
import com.eventos.model.Apresentador;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EventoDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private Local local;
    private Apresentador apresentador;
    private Integer capacidadeMaxima;
    private Double preco;
} 