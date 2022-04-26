package com.neulbomi.neulbom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Diet;

@Repository
public interface DietRepository extends JpaRepository<Diet, Long> {

}
