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
-- Table structure for table `blood_sugar`
--

DROP TABLE IF EXISTS `blood_sugar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_sugar` (
  `bs_seq` bigint NOT NULL AUTO_INCREMENT,
  `bs_code` varchar(45) NOT NULL,
  `user_seq` int NOT NULL,
  `bs_level` int NOT NULL,
  `bs_date` varchar(10) NOT NULL,
  `bs_time` varchar(5) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`bs_seq`),
  UNIQUE KEY `bs_seq_UNIQUE` (`bs_seq`),
  KEY `blood_sugar_member_fk_idx` (`user_seq`),
  KEY `blood_sugar_common_code_fk_idx` (`bs_code`),
  CONSTRAINT `blood_sugar_common_code_fk` FOREIGN KEY (`bs_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `blood_sugar_member_fk` FOREIGN KEY (`user_seq`) REFERENCES `member` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_sugar`
--

LOCK TABLES `blood_sugar` WRITE;
/*!40000 ALTER TABLE `blood_sugar` DISABLE KEYS */;
INSERT INTO `blood_sugar` VALUES (1,'beforeBreakfast',2,100,'2022-04-26','08:30','n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(2,'afterBreakfast',2,130,'2022-04-26','09:30','n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(3,'beforeLunch',2,90,'2022-04-26','11:30','n','ssafy@gmail.com','2022-04-27 15:43:36','ssafy@gmail.com','2022-04-27 15:43:36'),(4,'afterLunch',2,130,'2022-04-26','12:30','n','ssafy@gmail.com','2022-04-27 15:43:36','ssafy@gmail.com','2022-04-27 15:43:36'),(5,'beforeDinner',2,120,'2022-04-26','17:30','n','ssafy@gmail.com','2022-04-27 15:43:36','ssafy@gmail.com','2022-04-27 15:43:36'),(6,'afterDinner',2,150,'2022-04-26','19:00','n','ssafy@gmail.com','2022-04-27 15:43:36','ssafy@gmail.com','2022-04-27 15:43:36'),(7,'beforeBreakfast',2,90,'2022-04-27','08:30','n','ssafy@gmail.com','2022-04-27 15:44:44','ssafy@gmail.com','2022-04-27 15:44:44'),(8,'afterBreakfast',2,110,'2022-04-27','09:30','n','ssafy@gmail.com','2022-04-27 15:44:44','ssafy@gmail.com','2022-04-27 15:44:44'),(9,'beforeLunch',2,100,'2022-04-27','11:30','n','ssafy@gmail.com','2022-04-27 15:44:44','ssafy@gmail.com','2022-04-27 15:44:44'),(10,'afterLunch',2,140,'2022-04-27','12:30','n','ssafy@gmail.com','2022-04-27 15:44:44','ssafy@gmail.com','2022-04-27 15:44:44'),(11,'beforeDinner',2,115,'2022-04-27','17:30','n','ssafy@gmail.com','2022-04-27 15:44:44','ssafy@gmail.com','2022-04-27 15:44:44'),(12,'afterDinner',2,155,'2022-04-27','19:00','n','ssafy@gmail.com','2022-04-27 15:44:44','ssafy@gmail.com','2022-04-27 15:44:44'),(20,'afterBreakfast',14,100,'2022-04-28','16:42','y','string151','2022-05-04 15:08:33','string151','2022-05-04 15:08:33'),(21,'afterBreakfast',14,100,'2022-05-04','13:22','n','string151','2022-05-09 09:33:47','string151','2022-05-09 09:33:47'),(22,'afterLunch',14,100,'2022-05-12','04:12','n','string151','2022-05-12 13:13:21','string151','2022-05-12 13:13:21'),(23,'afterLunch',14,100,'2022-05-12','04:14','n','string151','2022-05-12 13:17:33','string151','2022-05-12 13:17:33'),(24,'afterDinner',14,100,'2022-05-12','04:14','n','string151','2022-05-12 13:17:42','string151','2022-05-12 13:17:42'),(25,'beforeLunch',14,100,'2022-05-11','14:58','n','string151','2022-05-12 14:59:10','string151','2022-05-12 14:59:10'),(26,'beforeLunch',14,100,'2022-05-02','14:58','n','string151','2022-05-12 14:59:34','string151','2022-05-12 14:59:34'),(27,'beforeLunch',14,100,'2022-05-12','15:04','n','string151','2022-05-12 15:05:29','string151','2022-05-12 15:05:29'),(28,'beforeBreakfast',23,100,'2022-05-12','15:05','n','ddd','2022-05-12 15:06:18','ddd','2022-05-12 15:06:18'),(29,'afterBreakfast',23,123,'2022-05-12','15:07','n','ddd','2022-05-12 15:08:25','ddd','2022-05-12 15:08:25'),(30,'afterLunch',23,13,'2022-05-12','16:57','n','ddd','2022-05-12 17:01:39','ddd','2022-05-12 17:01:39');
/*!40000 ALTER TABLE `blood_sugar` ENABLE KEYS */;
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
