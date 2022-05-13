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
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,1,'bloodPressure','y','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-28 15:25:20'),(2,2,'bloodSugar','n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(5,14,'bloodPressure','y','string151','2022-04-27 14:33:17','string151','2022-04-27 16:48:10'),(6,14,'bloodSugar','y','string151','2022-04-27 14:33:17','string151','2022-04-28 15:25:14'),(7,14,'bloodPressure','y','string151','2022-04-27 16:48:25','string151','2022-04-27 17:53:48'),(8,14,'bloodPressure','y','string151','2022-05-04 16:34:31','string151','2022-05-04 16:34:57'),(9,14,'bloodSugar','y','string151','2022-05-04 16:34:43','string151','2022-05-04 16:35:10'),(10,14,'bloodPressure','n','string151','2022-05-04 16:35:10','string151','2022-05-04 16:35:10'),(12,23,'bloodPressure','n','ddd','2022-05-04 09:23:48','ddd','2022-05-04 09:23:48'),(13,25,'bloodPressure','n','neulbom104@gmail.com','2022-05-12 11:42:58','neulbom104@gmail.com','2022-05-12 11:42:58');
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:47:48
