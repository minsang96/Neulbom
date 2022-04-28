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
	public List<Diet> findDiet(@Param("userSeq") int userSeq, @Param("dietDate") String dietDate);

}
