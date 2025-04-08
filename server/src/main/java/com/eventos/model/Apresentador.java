package com.eventos.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Data;

@Data
@Entity
@Table(name = "apresentador")
@JsonIgnoreProperties("eventos")
public class Apresentador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(length = 20)
    private String telefone;

    private String biografia;

    private String especialidade;

    @JsonIgnore
    @OneToMany(mappedBy = "apresentador")
    private Set<Evento> eventos;
} 