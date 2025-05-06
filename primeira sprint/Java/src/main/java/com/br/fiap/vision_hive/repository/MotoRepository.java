package com.br.fiap.vision_hive.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.br.fiap.vision_hive.model.Moto;


public interface MotoRepository extends JpaRepository<Moto, Long>, JpaSpecificationExecutor<Moto>{

    // Exemplo de busca por placa ignorando letras maiúsculas/minúsculas
    // Page<Moto> findByPlacaContainingIgnoreCase(String placa, Pageable pageable);
    
}
