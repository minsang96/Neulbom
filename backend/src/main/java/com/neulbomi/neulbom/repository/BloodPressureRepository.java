package com.neulbomi.neulbom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.BloodPressure;
import com.neulbomi.neulbom.entity.BloodSugar;

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long> {

	@Query("SELECT bp FROM BloodPressure bp WHERE bp.userSeq=:userSeq AND bp.bpDate=:bpDate AND bp.delYn='n'")
	public List<BloodPressure> findUserDailyBP(@Param("userSeq") int userSeq, @Param("bpDate") String bpDate);

}
