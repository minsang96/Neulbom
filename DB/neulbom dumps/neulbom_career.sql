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
-- Table structure for table `career`
--

DROP TABLE IF EXISTS `career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `career`
--

LOCK TABLES `career` WRITE;
/*!40000 ALTER TABLE `career` DISABLE KEYS */;
INSERT INTO `career` VALUES (1,3,'서울대병원 근무','n','expert@gmail.com','2022-04-26 01:43:28','expert@gmail.com','2022-04-26 01:43:28'),(2,3,'율제병원 근무','n','expert@gmail.com','2022-04-26 01:43:28','expert@gmail.com','2022-04-26 01:43:28'),(3,4,'중구 보건소 근무','n','expert2@gmail.com','2022-04-26 01:43:28','expert2@gmail.com','2022-04-26 01:43:28'),(4,7,'string','n','string','2022-04-27 11:23:26','string','2022-04-27 11:23:26'),(5,15,'싸피 병원 수정 테스트','y','sdi1358_@naver.com','2022-04-27 15:09:05','sdi1358_@naver.com','2022-04-28 17:47:02'),(6,15,'싸피보건소 근무','y','sdi1358_@naver.com','2022-04-27 15:09:05','sdi1358_@naver.com','2022-04-27 15:09:05'),(7,15,'새 이력 추가','y','sdi1358_@naver.com','2022-04-28 17:42:15','sdi1358_@naver.com','2022-04-28 17:42:15'),(8,15,'새 이력 추가','y','sdi1358_@naver.com','2022-04-28 17:47:02','sdi1358_@naver.com','2022-04-28 17:47:02'),(9,15,'새 이력 추가','y','sdi1358_@naver.com','2022-04-28 17:48:26','sdi1358_@naver.com','2022-04-28 17:48:26'),(10,15,'이력 추가 테스트','y','sdi1358_@naver.com','2022-04-28 17:50:04','sdi1358_@naver.com','2022-04-28 17:50:04'),(11,15,'싸피 병원 근무','y','sdi1358_@naver.com','2022-04-29 12:13:00','sdi1358_@naver.com','2022-04-29 12:13:00'),(12,15,'싸피 보건소 근무','y','sdi1358_@naver.com','2022-04-29 12:13:00','sdi1358_@naver.com','2022-04-29 12:13:00'),(13,17,'싸피 보건소','n','freessafy104@gmail.com','2022-05-04 15:36:03','freessafy104@gmail.com','2022-05-04 15:36:03'),(14,17,'싸피 병원','n','freessafy104@gmail.com','2022-05-04 15:36:03','freessafy104@gmail.com','2022-05-04 15:36:03');
/*!40000 ALTER TABLE `career` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:47:49
