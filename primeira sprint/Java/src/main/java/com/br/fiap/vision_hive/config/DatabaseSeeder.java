package com.br.fiap.vision_hive.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.br.fiap.vision_hive.model.Moto;
import com.br.fiap.vision_hive.model.TipoArea;
import com.br.fiap.vision_hive.repository.MotoRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DatabaseSeeder {

    @Autowired
    private MotoRepository motoRepository;



    @PostConstruct
     public void init() {
        var placas = List.of("ABC1D23", "XYZ9K88", "MNO4F67", "GHJ2L34", "QWE3R56");
        var chassiBase = "CHS12345";
        var tipos = TipoArea.values();
        var motos = new ArrayList<Moto>();

        for (int i = 0; i < 20; i++) {
            motos.add(Moto.builder()
                .placa(placas.get(new Random().nextInt(placas.size())))
                .chassi(chassiBase + i)
                .possuiLote(new Random().nextBoolean())
                .area(tipos[new Random().nextInt(tipos.length)])
                .build()
            );
        }

        motoRepository.saveAll(motos);
    }

    
}
