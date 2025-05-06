package com.br.fiap.vision_hive.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.br.fiap.vision_hive.model.Moto;
import com.br.fiap.vision_hive.repository.MotoRepository;


import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("motos")
@Slf4j
public class MotoController {

    @Autowired
    MotoRepository repository;

    // Retorna todas as motos cadastradas
    @GetMapping
    @Cacheable("motos")
    public List<Moto> index() {
        return repository.findAll();
    }

    // Retorna todas as motos cadastradas com o status 200 OK
    @PostMapping
    @CacheEvict(value = "motos", allEntries = true)
    @ResponseStatus(code = HttpStatus.CREATED)
    public Moto create(@RequestBody @Valid Moto moto) {
        log.info("Cadastrando moto " + moto.getPlaca());
        return repository.save(moto);
    }

    // Retorna uma moto cadastrada pelo id com o status 200 OK
    @GetMapping("{id}")
    public ResponseEntity<Moto> get(@PathVariable Long id) {
        log.info("Buscando moto " + id);
        return ResponseEntity.ok(getMoto(id));
    }

    // Deleta uma moto cadastrada pelo id com o status 204 NO CONTENT
    @DeleteMapping("{id}")
    public ResponseEntity<Moto> delete(@PathVariable Long id) {
        log.info("Deletando moto " + id);
        repository.delete(getMoto(id));
        return ResponseEntity.noContent().build();
    }

    // Atualiza uma moto cadastrada pelo id com o status 200 OK
    @PutMapping("{id}")
    public ResponseEntity<Moto> update(@PathVariable Long id, @RequestBody @Valid Moto moto) {
        log.info("Atualizando moto " + id + " com " + moto);
        getMoto(id);
        moto.setId(id);
        return ResponseEntity.ok(repository.save(moto));
    }

    private Moto getMoto(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Moto não encontrada"));
    }
}