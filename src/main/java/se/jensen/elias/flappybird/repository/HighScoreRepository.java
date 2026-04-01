package se.jensen.elias.flappybird.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.jensen.elias.flappybird.model.HighScoreModel;

public interface HighScoreRepository extends JpaRepository<HighScoreModel, Long> {
}
