package com.neulbomi.neulbom.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

	@Query("SELECT f FROM food f WHERE f.foodCode =:foodCode AND f.delYn='n'")
	public Food findFood(@Param("foodCode") String foodCode);
	
	public Page<Food> findByDelYnAndFoodNameContaining(@Param("delYn") String delYn, @Param("keyword") String keyword, Pageable pageable);

}
