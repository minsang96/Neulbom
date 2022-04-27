package com.neulbomi.neulbom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.BloodSugar;

@Repository
public interface BloodSugarRepository extends JpaRepository<BloodSugar, Long> {
	
	public List<BloodSugar> findAll();
	
	@Query("SELECT bs FROM BloodSugar bs WHERE bs.userSeq=:userSeq AND bs.bsDate=:bsDate AND bs.delYn='n'")
	public List<BloodSugar> findUserDailyBS(@Param("userSeq") int userSeq, @Param("bsDate") String bsDate);

}
