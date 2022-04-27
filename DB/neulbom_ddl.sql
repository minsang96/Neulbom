DROP SCHEMA IF EXISTS `neulbom`;
CREATE SCHEMA `neulbom` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE neulbom;

-- user table
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `user_type` varchar(1) NOT NULL COMMENT '0(일반회원), 1(전문가)',
  `user_email` varchar(30) NOT NULL,
  `user_pwd` varchar(20) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_seq_UNIQUE` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- expert table
CREATE TABLE `expert` (
  `expert_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `expert_name` varchar(10) NOT NULL,
  `expert_img` varchar(100) NOT NULL,
  `expert_desc` varchar(100) NOT NULL,
  `expert_cert` varchar(30) NOT NULL,
  `enabled_yn` varchar(1) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`expert_seq`),
  UNIQUE KEY `expert_seq_UNIQUE` (`expert_seq`),
  KEY `expert_user_fk_idx` (`user_seq`),
  CONSTRAINT `expert_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- career table
CREATE TABLE `career` (
  `career_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `career_content` varchar(100) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`career_seq`),
  UNIQUE KEY `career_seq_UNIQUE` (`career_seq`),
  KEY `career_expert_fk_idx` (`user_seq`),
  CONSTRAINT `career_expert_fk` FOREIGN KEY (`user_seq`) REFERENCES `expert` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- member table
CREATE TABLE `member` (
  `member_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `member_nickname` varchar(20) NOT NULL,
  `member_img` varchar(100) NOT NULL,
  `member_height` int NOT NULL,
  `member_weight` int NOT NULL,
  `member_year` int NOT NULL,
  `member_gender` varchar(1) NOT NULL,
  `member_desc` varchar(100) NOT NULL,
  `member_kcal` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`member_seq`),
  UNIQUE KEY `member_seq_UNIQUE` (`member_seq`),
  KEY `member_user_fk_idx` (`user_seq`),
  CONSTRAINT `member_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- common code table
CREATE TABLE `common_code` (
  `code_seq` int NOT NULL AUTO_INCREMENT,
  `code_group` varchar(20) NOT NULL,
  `code` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL,
  `code_order` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`code_seq`),
  UNIQUE KEY `code_seq_UNIQUE` (`code_seq`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- food table
CREATE TABLE `food` (
  `food_seq` bigint NOT NULL AUTO_INCREMENT,
  `food_code` varchar(8) NOT NULL,
  `food_name` varchar(150) NOT NULL,
  `food_amount` int NOT NULL,
  `food_kcal` decimal(7,2) DEFAULT NULL,
  `food_carbohydrate` decimal(7,2) DEFAULT NULL,
  `food_sugars` decimal(7,2) DEFAULT NULL,
  `food_fat` decimal(7,2) DEFAULT NULL,
  `food_protein` decimal(7,2) DEFAULT NULL,
  `food_calcium` decimal(7,2) DEFAULT NULL,
  `food_phosphorus` decimal(7,2) DEFAULT NULL,
  `food_natrium` decimal(7,2) DEFAULT NULL,
  `food_kalium` decimal(7,2) DEFAULT NULL,
  `food_magnesium` decimal(7,2) DEFAULT NULL,
  `food_iron` decimal(7,2) DEFAULT NULL,
  `food_zinc` decimal(7,2) DEFAULT NULL,
  `food_cholesterol` decimal(7,2) DEFAULT NULL,
  `food_transfat` decimal(7,2) DEFAULT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`food_seq`),
  UNIQUE KEY `food_seq_UNIQUE` (`food_seq`),
  UNIQUE KEY `food_code_UNIQUE` (`food_code`)
) ENGINE=InnoDB AUTO_INCREMENT=139178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- diet table
CREATE TABLE `diet` (
  `diet_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `diet_time` varchar(45) NOT NULL,
  `food_code` varchar(8) NOT NULL,
  `diet_img` varchar(100) NOT NULL,
  `diet_amount` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`diet_seq`),
  UNIQUE KEY `diet_seq_UNIQUE` (`diet_seq`),
  KEY `diet_member_fk_idx` (`user_seq`),
  KEY `diet_common_code_fk_idx` (`diet_time`),
  KEY `diet_food_kf_idx` (`food_code`),
  CONSTRAINT `diet_common_code_fk` FOREIGN KEY (`diet_time`) REFERENCES `common_code` (`code`),
  CONSTRAINT `diet_food_kf` FOREIGN KEY (`food_code`) REFERENCES `food` (`food_code`),
  CONSTRAINT `diet_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- blood_pressure table
CREATE TABLE `blood_pressure` (
  `bp_seq` bigint NOT NULL AUTO_INCREMENT,
  `bp_time` varchar(45) NOT NULL,
  `user_seq` int NOT NULL,
  `bp_high` int NOT NULL,
  `bp_low` int NOT NULL,
  `bp_date` varchar(20) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`bp_seq`),
  UNIQUE KEY `bp_seq_UNIQUE` (`bp_seq`),
  KEY `blood_pressure_member_fk_idx` (`user_seq`),
  KEY `blood_pressure_common_code_fk_idx` (`bp_time`),
  CONSTRAINT `blood_pressure_common_code_fk` FOREIGN KEY (`bp_time`) REFERENCES `common_code` (`code`),
  CONSTRAINT `blood_pressure_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- blood_sugar_table
CREATE TABLE `blood_sugar` (
  `bs_seq` bigint NOT NULL AUTO_INCREMENT,
  `bs_time` varchar(45) NOT NULL,
  `user_seq` int NOT NULL,
  `bs_level` int NOT NULL,
  `bs_date` varchar(20) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`bs_seq`),
  UNIQUE KEY `bs_seq_UNIQUE` (`bs_seq`),
  KEY `blood_sugar_member_fk_idx` (`user_seq`),
  KEY `blood_sugar_common_code_fk_idx` (`bs_time`),
  CONSTRAINT `blood_sugar_common_code_fk` FOREIGN KEY (`bs_time`) REFERENCES `common_code` (`code`),
  CONSTRAINT `blood_sugar_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- other table
CREATE TABLE `other` (
  `other_seq` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `user_seq` int NOT NULL,
  `other_date` varchar(20) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`other_seq`),
  UNIQUE KEY `other_seq_UNIQUE` (`other_seq`),
  KEY `other_member_fk_idx` (`user_seq`),
  KEY `other_common_code_fk_idx` (`code`),
  CONSTRAINT `other_common_code_fk` FOREIGN KEY (`code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `other_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- setting table
CREATE TABLE `setting` (
  `setting_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `code` varchar(45) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`setting_seq`),
  UNIQUE KEY `setting_seq_UNIQUE` (`setting_seq`),
  KEY `setting_member_fk_idx` (`user_seq`),
  KEY `setting_common_code_fk_idx` (`code`),
  CONSTRAINT `setting_common_code_fk` FOREIGN KEY (`code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `setting_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

alter table user auto_increment = 1;
alter table expert auto_increment =1;
alter table career auto_increment = 1 ;
alter table member auto_increment = 1;
alter table common_code auto_increment = 1;
alter table food auto_increment = 1;
alter table diet auto_increment = 1;
alter table blood_pressure auto_increment = 1;
alter table blood_sugar auto_increment = 1;
alter table other auto_increment = 1;
alter table setting auto_increment = 1;

-- common_code values
insert into common_code values(0, 'setting', 'bloodPressure', '혈압', 1, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'setting', 'bloodSugar', '혈당', 2, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'beforeBreakfast', '아침식전', 1, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'breakfast', '아침', 2, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'afterBreakfast', '아침식후', 3, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'beforeLunch', '점심식전', 4, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'lunch', '점심', 5, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'afterLunch', '점심식후', 6, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'beforeDinner', '저녁식전', 7, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'dinner', '저녁', 8, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'time', 'afterDinner', '저녁식후', 9, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'other', 'alcohol', '음주', 1, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'other', 'coffee', '커피', 2, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());
insert into common_code values(0, 'other', 'exercise', '운동', 3, 'n', 'freessafy104@gmail.com', now(), 'freessafy104@gmail.com', now());