package com.neulbomi.neulbom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.CommonCode;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, Integer> {

}
