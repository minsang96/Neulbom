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
-- Table structure for table `blood_pressure`
--

DROP TABLE IF EXISTS `blood_pressure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_pressure` (
  `bp_seq` bigint NOT NULL AUTO_INCREMENT,
  `bp_code` varchar(45) NOT NULL,
  `user_seq` int NOT NULL,
  `bp_high` int NOT NULL,
  `bp_low` int NOT NULL,
  `bp_date` varchar(10) NOT NULL,
  `bp_time` varchar(5) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`bp_seq`),
  UNIQUE KEY `bp_seq_UNIQUE` (`bp_seq`),
  KEY `blood_pressure_member_fk_idx` (`user_seq`),
  KEY `blood_pressure_common_code_fk_idx` (`bp_code`),
  CONSTRAINT `blood_pressure_common_code_fk` FOREIGN KEY (`bp_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `blood_pressure_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_pressure`
--

LOCK TABLES `blood_pressure` WRITE;
/*!40000 ALTER TABLE `blood_pressure` DISABLE KEYS */;
INSERT INTO `blood_pressure` VALUES (1,'beforeBreakfast',2,120,80,'2022-04-26','09:00','n','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-26 01:43:28'),(2,'beforeLunch',2,130,85,'2022-04-26','12:30','n','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-26 01:43:28'),(3,'beforeDinner',2,110,70,'2022-04-26','18:00','n','blue8957@gmail.com','2022-04-28 10:18:11','blue8957@gmail.com','2022-04-28 10:18:11'),(4,'afterBreakfast',2,100,70,'2022-04-27','09:00','n','blue8957@gmail.com','2022-04-28 10:20:09','blue8957@gmail.com','2022-04-28 10:20:09'),(5,'afterLunch',2,104,75,'2022-04-27','12:30','n','blue8957@gmail.com','2022-04-28 10:20:09','blue8957@gmail.com','2022-04-28 10:20:09'),(6,'afterDinner',2,110,80,'2022-04-27','18:00','n','blue8957@gmail.com','2022-04-28 10:20:09','blue8957@gmail.com','2022-04-28 10:20:09'),(7,'afterBreakfast',14,120,80,'2022-04-29','15:42','n','string151','2022-04-29 16:41:59','string151','2022-04-29 16:41:59'),(8,'afterBreakfast',14,120,80,'2022-04-29','15:42','y','string151','2022-04-29 16:51:35','string151','2022-04-29 16:51:35'),(9,'afterBreakfast',14,120,80,'2022-04-29','15:42','n','string151','2022-05-04 06:27:28','string151','2022-05-04 06:27:28'),(10,'afterBreakfast',14,120,80,'2022-05-04','13:22','n','string151','2022-05-09 08:36:08','string151','2022-05-09 08:36:08'),(11,'afterBreakfast',14,120,80,'2022-05-04','13:22','n','string151','2022-05-09 09:26:18','string151','2022-05-09 09:26:18'),(12,'beforeLunch',14,120,80,'2022-05-04','13:22','n','string151','2022-05-09 09:27:07','string151','2022-05-09 09:27:07'),(13,'afterBreakfast',14,120,80,'2022-05-09','00:30','n','string151','2022-05-09 09:48:06','string151','2022-05-09 09:48:06'),(14,'afterBreakfast',14,120,80,'2022-05-12','15:10','n','string151','2022-05-12 15:11:08','string151','2022-05-12 15:11:08'),(15,'afterBreakfast',23,123,89,'2022-05-12','15:11','n','ddd','2022-05-12 15:12:07','ddd','2022-05-12 15:12:07'),(16,'beforeLunch',23,125,50,'2022-05-12','15:11','n','ddd','2022-05-12 15:12:31','ddd','2022-05-12 15:12:31'),(17,'beforeLunch',23,123,12,'2022-05-11','16:14','n','ddd','2022-05-12 16:15:26','ddd','2022-05-12 16:15:26');
/*!40000 ALTER TABLE `blood_pressure` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:47:46
