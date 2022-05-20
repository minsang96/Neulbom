package com.neulbomi.neulbom.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

	@Query("SELECT f FROM food f WHERE f.foodCode =:foodCode AND f.delYn='n'")
	public Food findFood(@Param("foodCode") String foodCode);
	
	public Page<Food> findByDelYnAndFoodNameContaining(@Param("delYn") String delYn, @Param("keyword") String keyword, Pageable pageable);

	@Modifying
	@Transactional
	@Query("UPDATE food f SET f.foodCode=:foodcode WHERE f.foodName=:foodName AND f.foodSeq <= 400")
	public void updateFoodCode(@Param("foodcode") String foodcode, @Param("foodName") String foodName);
}
