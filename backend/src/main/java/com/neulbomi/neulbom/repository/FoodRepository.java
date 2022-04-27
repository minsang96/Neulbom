package com.neulbomi.neulbom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

}
