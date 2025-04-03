package com.eventos.repository;

import com.eventos.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findByEventoId(Long eventoId);
    List<Inscricao> findByParticipanteId(Long participanteId);
    boolean existsByEventoIdAndParticipanteId(Long eventoId, Long participanteId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Inscricao i WHERE i.evento.id = :eventoId")
    void deleteByEventoId(Long eventoId);
} 