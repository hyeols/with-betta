package com.betta.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

  @GetMapping("/getHelloWorld")
  public String getHelloWorld() {
    return "Hello!";
  }
  
  @RequestMapping("/")
  public String getTest() {
	  return "";
  }
}
