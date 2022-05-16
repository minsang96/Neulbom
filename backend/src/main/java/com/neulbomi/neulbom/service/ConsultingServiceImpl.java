package com.neulbomi.neulbom.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.entity.Expert;
import com.neulbomi.neulbom.repository.ExpertRepository;

@Service
public class ConsultingServiceImpl implements ConsultingService {

	@Autowired
	private ExpertRepository expertRepository;
	
	@Override
	public LinkedList<Object> getInfo() {
		
		List<Expert> experts = expertRepository.findByDelYnAndEnabledYnOrderByRegDtAsc("n", "y");
		
		LinkedList<Object> result = new LinkedList<>();
		for (int i = 0; i < experts.size(); i++) {
			Expert cur = experts.get(i);
			
			Map<String, Object> obj = new HashMap<>();
			obj.put("expertName", cur.getExpertName());
			obj.put("expertDesc", cur.getExpertDesc());
			obj.put("expertImg", cur.getExpertImg());
			obj.put("userSeq", cur.getUserSeq());
			
			result.add(obj);
		}
				
		return result;
	}

}
