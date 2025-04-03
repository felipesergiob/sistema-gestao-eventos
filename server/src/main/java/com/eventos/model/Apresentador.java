package com.eventos.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "apresentador")
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
} 