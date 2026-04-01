package se.jensen.elias.flappybird.service;

import org.springframework.stereotype.Service;
import se.jensen.elias.flappybird.dto.HighScoreDTO;
import se.jensen.elias.flappybird.dto.Mapper;
import se.jensen.elias.flappybird.model.HighScoreModel;
import se.jensen.elias.flappybird.repository.HighScoreRepository;

import java.util.Comparator;
import java.util.List;

@Service
public class HighScoreService {
    private final HighScoreRepository highScoreRepository;
    private final Mapper mapper;

    public HighScoreService(HighScoreRepository highScoreRepository, Mapper mapper) {
        this.highScoreRepository = highScoreRepository;
        this.mapper = mapper;
    }

    public List<HighScoreDTO> getHighScore() {
        List<HighScoreModel> model = highScoreRepository.findAll();

        List<HighScoreDTO> DTOList = model
                .stream()
                .map(mapper::mapToDTO)
                .sorted(Comparator.comparingInt(HighScoreDTO::score).reversed())
                .toList();

        return DTOList;
    }


    public HighScoreDTO saveHighScore(HighScoreDTO highScoreDTO) {
        highScoreRepository.save(mapper.mapToModel(highScoreDTO));

        return highScoreDTO;
    }
}
