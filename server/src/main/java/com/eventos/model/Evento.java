package com.eventos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "evento")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String titulo;
    
    @Column(length = 500)
    private String descricao;
    
    @Column(nullable = false)
    private LocalDateTime dataInicio;
    
    @Column(nullable = false)
    private LocalDateTime dataFim;
    
    @Column(nullable = false)
    private Integer capacidade;
    
    @Column(nullable = false)
    private Double valor;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "local_id")
    @JsonIgnoreProperties("eventos")
    private Local local;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "apresentador_id")
    private Apresentador apresentador;
    
    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "evento_participante",
        joinColumns = @JoinColumn(name = "evento_id"),
        inverseJoinColumns = @JoinColumn(name = "participante_id")
    )
    private Set<Participante> participantes;
} 