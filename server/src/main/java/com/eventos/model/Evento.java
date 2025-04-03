package com.eventos.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;
    private String descricao;
    
    @Column(name = "data_inicio")
    private LocalDateTime dataInicio;
    
    @Column(name = "data_fim")
    private LocalDateTime dataFim;
    
    @ManyToOne
    @JoinColumn(name = "local_id")
    private Local local;
    
    @ManyToOne
    @JoinColumn(name = "apresentador_id")
    private Apresentador apresentador;
    
    @Column(name = "capacidade_maxima")
    private Integer capacidadeMaxima;
    
    private Double preco;
} 