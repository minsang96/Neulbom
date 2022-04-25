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
-- Table structure for table `common_code`
--

DROP TABLE IF EXISTS `common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_code`
--

LOCK TABLES `common_code` WRITE;
/*!40000 ALTER TABLE `common_code` DISABLE KEYS */;
INSERT INTO `common_code` VALUES (1,'setting','bloodPressure','혈압',1,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(2,'setting','bloodSugar','혈당',2,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(3,'time','beforeBreakfast','아침식전',1,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(4,'time','breakfast','아침',2,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(5,'time','afterBreakfast','아침식후',3,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(6,'time','beforeLunch','점심식전',4,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(7,'time','lunch','점심',5,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(8,'time','afterLunch','점심식후',6,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(9,'time','beforeDinner','저녁식전',7,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(10,'time','dinner','저녁',8,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(11,'time','afterDinner','저녁식후',9,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(12,'other','alcohol','음주',1,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(13,'other','coffee','커피',2,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37'),(14,'other','exercise','운동',3,'n','freessafy104@gmail.com','2022-04-25 05:20:37','freessafy104@gmail.com','2022-04-25 05:20:37');
/*!40000 ALTER TABLE `common_code` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-25 15:05:09
