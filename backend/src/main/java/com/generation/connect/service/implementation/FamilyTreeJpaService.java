package com.generation.connect.service.implementation;

import com.generation.connect.entity.PostEntity;
import com.generation.connect.repository.FamilyTreeRepository;
import com.generation.connect.repository.ManageUserAccessRepository;
import com.generation.connect.repository.PostRepository;
import com.generation.connect.repository.ResearchRecordLinkRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FamilyTreeJpaService {

    @Autowired
    private ManageUserAccessRepository manageUserAccessRepository;

    @Autowired
    private FamilyTreeRepository familyTreeRepository;

    @Autowired
    private ResearchRecordLinkRepository researchRecordLinkRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public void deleteJpaResources(Long familyTreeId) {
        researchRecordLinkRepository.deleteByFamilyTree_FamilyTreeId(familyTreeId);
        manageUserAccessRepository.deleteAllById_FamilyTreeId(familyTreeId);
        familyTreeRepository.deleteById(familyTreeId);
        List<PostEntity> posts = postRepository.findAllByFamilyTreeId(familyTreeId);
        postRepository.deleteAll(posts);
    }
}
