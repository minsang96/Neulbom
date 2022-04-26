package com.neulbomi.neulbom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Other;

@Repository
public interface OtherRepository extends JpaRepository<Other, Long> {

}
