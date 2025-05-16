package com.visionhive.visionhive.config;

import com.visionhive.visionhive.model.Branch;
import com.visionhive.visionhive.model.Motorcycle;
import com.visionhive.visionhive.model.Patio;
import com.visionhive.visionhive.repository.BranchRepository;
import com.visionhive.visionhive.repository.MotorcycleRepository;
import com.visionhive.visionhive.repository.PatioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private MotorcycleRepository motorcycleRepository;

    @Autowired
    private PatioRepository patioRepository;

    @PostConstruct
    public void init(){

        Branch filialA = Branch.builder()
                .nome("Filial Central")
                .bairro("Butantã")
                .cnpj("96895689000139")
                .build();

        branchRepository.save(filialA);

        Patio patioEmplacamento = Patio.builder()
                .nome("Pátio de emplacamento")
                .branch(filialA)
                .build();

        patioRepository.save(patioEmplacamento);

        Motorcycle motoA = Motorcycle.builder()
                .placa("ABC1234")
                .chassi("9BWZZZ377VT0042245")
                .numeracaoMotor("MTR12345678")
                .patio(patioEmplacamento)
                .build();

        motorcycleRepository.save(motoA);
    }
}
