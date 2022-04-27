package com.neulbomi.neulbom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.BloodPressure;

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long> {

}
