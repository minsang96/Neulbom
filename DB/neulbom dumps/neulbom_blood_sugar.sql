-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: k6a104.p.ssafy.io    Database: neulbom
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_sugar`
--

LOCK TABLES `blood_sugar` WRITE;
/*!40000 ALTER TABLE `blood_sugar` DISABLE KEYS */;
INSERT INTO `blood_sugar` VALUES (1,'beforeBreakfast',2,100,'2022-04-25 05:54:25','n','ssafy@gmail.com','2022-04-25 05:54:25','ssafy@gmail.com','2022-04-25 05:54:25'),(2,'afterBreakfast',2,130,'2022-04-25 05:54:26','n','ssafy@gmail.com','2022-04-25 05:54:26','ssafy@gmail.com','2022-04-25 05:54:26');
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

-- Dump completed on 2022-04-25 15:05:10
