package com.eventos.repository;

import com.eventos.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByDataInicioBetween(LocalDateTime inicio, LocalDateTime fim);
} 