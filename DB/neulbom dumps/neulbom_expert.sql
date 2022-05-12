-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: k6a104.p.ssafy.io    Database: neulbom
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `expert`
--

DROP TABLE IF EXISTS `expert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expert` (
  `expert_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `expert_name` varchar(10) NOT NULL,
  `expert_img` varchar(200) NOT NULL,
  `expert_desc` varchar(100) NOT NULL,
  `expert_cert` varchar(30) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expert`
--

LOCK TABLES `expert` WRITE;
/*!40000 ALTER TABLE `expert` DISABLE KEYS */;
INSERT INTO `expert` VALUES (1,3,'박전문가','tkwls','경력 많은 의사','의사 자격증','y','n','expert@gmail.com','2022-04-26 01:43:28','expert@gmail.com','2022-04-26 01:43:28'),(2,4,'김선생님','kim','경력 많은 보건소 선생님','보건 자격증','y','n','expert2@gmail.com','2022-04-26 01:43:28','expert2@gmail.com','2022-04-26 01:43:28'),(3,7,'string','string','string',NULL,'n','n','string','2022-04-27 11:23:26','string','2022-04-27 11:23:26'),(4,15,'허은아','https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Diet/1_profile_1651197572906.jpg','건강한 식습관 만들어요.',NULL,'n','n','sdi1358_@naver.com','2022-04-27 15:09:05','sdi1358_@naver.com','2022-04-27 15:09:05'),(5,17,'김의사','profile.jpg','건강한 식습관 만들어요.',NULL,'n','n','freessafy104@gmail.com','2022-05-04 15:36:03','freessafy104@gmail.com','2022-05-04 15:36:03');
/*!40000 ALTER TABLE `expert` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:47:47
