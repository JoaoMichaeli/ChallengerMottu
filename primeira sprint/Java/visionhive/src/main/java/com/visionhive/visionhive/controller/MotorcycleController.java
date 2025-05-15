package com.visionhive.visionhive.controller;

import com.visionhive.visionhive.model.Motorcycle;
import com.visionhive.visionhive.repository.MotorcycleRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("motorcycles")
@Slf4j
public class MotorcycleController {

    @Autowired
    private MotorcycleRepository repository;

    @GetMapping
    @Operation(summary = "Listar todas as motocicletas", description = "Retorna um array com todas as motos")
    @Cacheable("motorcycles")
    public List<Motorcycle> index(){
        return repository.findAll();
    }

    @PostMapping
    @CacheEvict(value = "motorcycles", allEntries = true)
    @Operation(summary = "Inserir motocicletas", description = "Inserir uma motocicleta nova", responses = @ApiResponse(responseCode = "400", description = "Falha na validação"))
    @ResponseStatus(code = HttpStatus.CREATED)
    public Motorcycle create(@RequestBody @Valid Motorcycle motorcycle){
        log.info("Cadastrando motocicleta: " + motorcycle.getPlaca());
        return repository.save(motorcycle);
    }

    @GetMapping("{id}")
    @Operation(summary = "Buscar motocicleta", description = "Retorna a moto buscada pelo ID")
    public ResponseEntity<Motorcycle> get(@PathVariable Long id){
        log.info("Buscando motocicleta: " + id);
        return ResponseEntity.ok(getMotorcycle(id));
    }

    @DeleteMapping("{id}")
    @Operation(summary = "Deletar motocicleta", description = "Deleta a moto escolhida")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        log.info("Deletando motocicleta: " + id);
        repository.delete(getMotorcycle(id));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    @Operation(summary = "Atualizar motocicleta", description = "Atualizar os dados da motocicleta")
    public ResponseEntity<Motorcycle> update(@PathVariable Long id, @RequestBody @Valid Motorcycle motorcycle){
        log.info("Atualizando motocicleta: " + id + " com " + motorcycle);
        var oldMotorcycle = getMotorcycle(id);
        BeanUtils.copyProperties(motorcycle, oldMotorcycle, "id");
        repository.save(oldMotorcycle);
        return ResponseEntity.ok(oldMotorcycle);
    }

    private Motorcycle getMotorcycle(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Motocicleta não encontrada"));
    }
}
