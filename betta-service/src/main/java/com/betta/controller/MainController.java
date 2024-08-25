package com.betta.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

  @GetMapping("/getHelloWorld")
  public String getHelloWorld() {
    return "Hello World2";
  }
}
