package com.neulbomi.neulbom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Diet;

@Repository
public interface DietRepository extends JpaRepository<Diet, Long> {
	
	@Query("SELECT d FROM diet d WHERE d.userSeq=:userSeq AND d.dietDate=:dietDate AND d.delYn='n'")
	public List<Diet> findDailyDiet(@Param("userSeq") int userSeq, @Param("dietDate") String dietDate);
	
	@Query("SELECT d FROM diet d WHERE d.userSeq=:userSeq AND d.dietDate BETWEEN :startDate AND :endDate AND d.delYn='n'")
	public List<Diet> findWeeklyDiet(@Param("userSeq") int userSeq, @Param("startDate") String startDate, @Param("endDate") String endDate);

	public Diet findByDelYnAndDietSeq(String string, long dietSeq);
	
	@Query("SELECT d FROM diet d WHERE d.userSeq=:userSeq AND d.delYn='n' AND d.dietDate BETWEEN :startDate AND :endDate")
	public List<Diet> findUserDiet(@Param("userSeq") int userSeq, @Param("startDate") String startDate, @Param("endDate") String endDate);
}
