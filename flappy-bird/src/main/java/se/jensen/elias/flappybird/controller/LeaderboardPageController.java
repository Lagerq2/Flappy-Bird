package se.jensen.elias.flappybird.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LeaderboardPageController {

    @GetMapping("/leaderboard")
    public String getLeaderboardPage() {
        return "leaderboard";
    }
}
