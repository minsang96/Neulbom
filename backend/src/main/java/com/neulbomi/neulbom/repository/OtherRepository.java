package com.neulbomi.neulbom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Other;

@Repository
public interface OtherRepository extends JpaRepository<Other, Long> {

	@Query("SELECT o FROM other o WHERE o.userSeq=:userSeq AND o.delYn='n' AND o.otherDate BETWEEN :startDate AND :endDate")
	List<Other> findUserOther(@Param("userSeq") int userSeq, @Param("startDate") String startDate, @Param("endDate") String endDate);

}
