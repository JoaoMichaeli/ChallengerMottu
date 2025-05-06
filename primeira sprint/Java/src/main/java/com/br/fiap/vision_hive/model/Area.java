package com.br.fiap.vision_hive.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Descrição não pode estar em branco")
    @Size(min = 3, message = "Descrição deve ter no mínimo 3 caracteres")
    private String descricao; // Ex: "Baixa Prioridade", "Sucata", etc.
    
    @NotBlank(message = "Localização não pode estar em branco")
    @Pattern(regexp = "^[A-Z].*", message = "Localização deve começar com letra maiúscula")
    private String localizacao;
    
}
