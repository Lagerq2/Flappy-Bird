package se.jensen.elias.flappybird.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {


    @GetMapping("/game")
    public String getGame() {
        return "redirect:/index.html";
    }


}
