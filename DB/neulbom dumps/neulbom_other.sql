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
-- Table structure for table `other`
--

DROP TABLE IF EXISTS `other`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other`
--

LOCK TABLES `other` WRITE;
/*!40000 ALTER TABLE `other` DISABLE KEYS */;
INSERT INTO `other` VALUES (1,'exercise',1,'2022-04-25 05:34:57','n','blue8957@gmail.com','2022-04-25 05:34:57','blue8957@gmail.com','2022-04-25 05:34:57'),(2,'coffee',1,'2022-04-25 05:34:58','n','blue8957@gmail.com','2022-04-25 05:34:58','blue8957@gmail.com','2022-04-25 05:34:58'),(3,'exercise',2,'2022-04-25 05:54:27','n','ssafy@gmail.com','2022-04-25 05:54:27','ssafy@gmail.com','2022-04-25 05:54:27'),(4,'coffee',2,'2022-04-25 05:54:28','n','ssafy@gmail.com','2022-04-25 05:54:28','ssafy@gmail.com','2022-04-25 05:54:28');
/*!40000 ALTER TABLE `other` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-25 15:05:08
