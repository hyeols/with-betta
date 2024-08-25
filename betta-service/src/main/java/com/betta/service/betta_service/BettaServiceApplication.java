package com.betta.service.betta_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.betta"})
public class BettaServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(BettaServiceApplication.class, args);
	}
}
