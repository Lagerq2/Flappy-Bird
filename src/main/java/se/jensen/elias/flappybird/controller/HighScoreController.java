package se.jensen.elias.flappybird.controller;

import org.springframework.web.bind.annotation.*;
import se.jensen.elias.flappybird.dto.HighScoreDTO;
import se.jensen.elias.flappybird.service.HighScoreService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HighScoreController {
    private final HighScoreService highScoreService;

    HighScoreController(HighScoreService highScoreService) {
        this.highScoreService = highScoreService;
    }


    @GetMapping("/scores")
    public List<HighScoreDTO> getHighScores() {
        return highScoreService.getHighScore();
    }

    @PostMapping("/scores")
    public HighScoreDTO saveHighScore(@RequestBody HighScoreDTO highScoreDTO) {
        return highScoreService.saveHighScore(highScoreDTO);
    }
}
