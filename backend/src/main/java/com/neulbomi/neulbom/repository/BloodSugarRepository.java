package com.neulbomi.neulbom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.BloodSugar;

@Repository
public interface BloodSugarRepository extends JpaRepository<BloodSugar, Long> {
	
	@Query("SELECT bs FROM BloodSugar bs WHERE bs.userSeq=:userSeq AND bs.bsDate=:bsDate AND bs.delYn='n'")
	public List<BloodSugar> findUserDailyBS(@Param("userSeq") int userSeq, @Param("bsDate") String bsDate);

	@Query("SELECT bs FROM BloodSugar bs WHERE bs.userSeq=:userSeq AND bs.bsDate BETWEEN :startDate AND :endDate AND bs.bsCode='beforeBreakfast' AND bs.delYn='n'")
	public List<BloodSugar> findBBWeeklyBS(@Param("userSeq") int userSeq, @Param("startDate") String startDate, @Param("endDate") String endDate);

	public List<BloodSugar> findByDelYnAndUserSeqAndBsDateStartsWith(String delYn, int userSeq, String date);
	
	public Optional<BloodSugar> findByDelYnAndBsSeq(String delYn, long bsSeq);
}
