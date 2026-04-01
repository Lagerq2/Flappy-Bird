package se.jensen.elias.flappybird.dto;

import org.springframework.context.annotation.Configuration;
import se.jensen.elias.flappybird.model.HighScoreModel;

@Configuration
public class Mapper {

    public HighScoreDTO mapToDTO(HighScoreModel highScoreModel) {

        return new HighScoreDTO(
                highScoreModel.getName(),
                highScoreModel.getScore());
    }

    public HighScoreModel mapToModel(HighScoreDTO highScoreDTO) {
        return new HighScoreModel(
                highScoreDTO.name(),
                highScoreDTO.score());
    }
}
