package com.br.fiap.vision_hive.model;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Moto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Placa não pode estar em branco")
    @Size(min = 7, max = 7, message = "A placa deve conter 7 caracteres")
    private String placa;

    @NotBlank(message = "Chassi não pode estar em branco")
    @Size(min = 5, message = "O chassi deve ter no mínimo 5 caracteres")
    private String chassi;

    @NotNull(message = "O campo 'possuiLote' deve ser informado")
    private Boolean possuiLote;

    @Enumerated(EnumType.STRING)
    private TipoArea area;


    
}
