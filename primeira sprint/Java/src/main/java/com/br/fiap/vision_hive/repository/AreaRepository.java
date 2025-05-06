package com.br.fiap.vision_hive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.br.fiap.vision_hive.model.Area;

public interface AreaRepository extends JpaRepository<Area, Long>, JpaSpecificationExecutor<Area> {
    // Exemplo de busca por nome ignorando letras maiúsculas/minúsculas
    // Page<Area> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
    
}
