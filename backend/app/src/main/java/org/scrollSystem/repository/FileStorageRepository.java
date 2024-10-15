package org.scrollSystem.repository;

import org.scrollSystem.models.FileStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileStorageRepository extends JpaRepository<FileStorage, Integer> {

    Optional<FileStorage> getFileStorageByFileId(Integer id);
    Optional<FileStorage> getFileStorageByTitle(String title);

}
