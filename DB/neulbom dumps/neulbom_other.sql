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
-- Table structure for table `other`
--

DROP TABLE IF EXISTS `other`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `other` (
  `other_seq` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `user_seq` int NOT NULL,
  `other_date` varchar(10) NOT NULL,
  `other_time` varchar(5) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other`
--

LOCK TABLES `other` WRITE;
/*!40000 ALTER TABLE `other` DISABLE KEYS */;
INSERT INTO `other` VALUES (1,'alcohol',2,'2022-04-26','18:00','n','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-26 01:43:28'),(2,'coffee',2,'2022-04-26','10:15','n','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-26 01:43:28'),(3,'exercise',2,'2022-04-26','20:30','n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(4,'coffee',2,'2022-04-26','11:00','n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(5,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-04 13:51:18','string151','2022-05-04 13:51:18'),(6,'coffee',14,'2022-05-04','13:22','y','string151','2022-05-04 13:51:44','string151','2022-05-04 13:51:44'),(7,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:32:28','string151','2022-05-06 04:32:28'),(8,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:36:50','string151','2022-05-06 04:36:50'),(9,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:36:52','string151','2022-05-06 04:36:52'),(10,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:36:55','string151','2022-05-06 04:36:55'),(11,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:48:43','string151','2022-05-06 04:48:43'),(12,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:48:58','string151','2022-05-06 04:48:58'),(13,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:49:16','string151','2022-05-06 04:49:16'),(14,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:49:43','string151','2022-05-06 04:49:43'),(15,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:49:49','string151','2022-05-06 04:49:49'),(16,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:49:51','string151','2022-05-06 04:49:51'),(17,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:50:07','string151','2022-05-06 04:50:07'),(18,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 04:57:00','string151','2022-05-06 04:57:00'),(19,'exercise',14,'2022-05-05','13:22','n','string151','2022-05-06 04:58:04','string151','2022-05-06 04:58:04'),(20,'exercise',14,'2022-05-05','13:22','n','string151','2022-05-06 04:59:02','string151','2022-05-06 04:59:02'),(21,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 05:07:07','string151','2022-05-06 05:07:07'),(22,'exercise',1,'2022-04-26','13:22','n','blue8957@gmail.com','2022-05-06 15:12:01','blue8957@gmail.com','2022-05-06 15:12:01'),(23,'coffee',1,'2022-04-26','13:22','n','blue8957@gmail.com','2022-05-06 15:12:10','blue8957@gmail.com','2022-05-06 15:12:10'),(24,'alcohol',1,'2022-04-27','13:22','n','blue8957@gmail.com','2022-05-06 15:12:27','blue8957@gmail.com','2022-05-06 15:12:27'),(25,'exercise',14,'2022-05-04','13:22','n','string151','2022-05-06 07:35:44','string151','2022-05-06 07:35:44'),(26,'alcohol',14,'2022-05-04','13:22','n','string151','2022-05-06 07:36:16','string151','2022-05-06 07:36:16'),(27,'alcohol',14,'2022-05-04','13:22','n','string151','2022-05-06 07:36:39','string151','2022-05-06 07:36:39'),(28,'alcohol',14,'2022-05-04','13:22','n','string151','2022-05-06 07:37:52','string151','2022-05-06 07:37:52'),(29,'coffee',14,'2022-05-04','13:22','n','string151','2022-05-06 07:51:37','string151','2022-05-06 07:51:37'),(30,'alcohol',14,'2022-05-04','13:22','n','string151','2022-05-06 16:55:36','string151','2022-05-06 16:55:36'),(31,'alcohol',14,'2022-05-04','13:22','n','string151','2022-05-10 16:57:48','string151','2022-05-10 16:57:48'),(32,'alcohol',23,'2022-05-10','08:04','n','ddd','2022-05-10 17:04:59','ddd','2022-05-10 17:04:59'),(33,'alcohol',23,'2022-05-11','05:12','n','ddd','2022-05-11 14:21:42','ddd','2022-05-11 14:21:42'),(34,'alcohol',23,'2022-05-11','08:20','n','ddd','2022-05-11 14:22:12','ddd','2022-05-11 14:22:12'),(35,'coffee',23,'2022-05-12','16:25','n','ddd','2022-05-12 16:26:00','ddd','2022-05-12 16:26:00'),(36,'coffee',23,'2022-05-12','16:26','n','ddd','2022-05-12 16:28:04','ddd','2022-05-12 16:28:04'),(37,'exercise',23,'2022-05-12','16:26','n','ddd','2022-05-12 16:29:37','ddd','2022-05-12 16:29:37'),(38,'alcohol',23,'2022-05-12','16:26','n','ddd','2022-05-12 16:30:15','ddd','2022-05-12 16:30:15'),(39,'alcohol',23,'2022-05-12','16:26','n','ddd','2022-05-12 16:32:29','ddd','2022-05-12 16:32:29'),(40,'coffee',23,'2022-05-12','16:26','n','ddd','2022-05-12 16:32:48','ddd','2022-05-12 16:32:48'),(41,'coffee',23,'2022-05-11','16:26','n','ddd','2022-05-12 16:33:35','ddd','2022-05-12 16:33:35'),(42,'coffee',23,'2022-05-12','16:50','n','ddd','2022-05-12 16:51:33','ddd','2022-05-12 16:51:33'),(43,'alcohol',23,'2022-05-12','16:50','n','ddd','2022-05-12 16:55:26','ddd','2022-05-12 16:55:26'),(44,'alcohol',23,'2022-05-12','16:50','n','ddd','2022-05-12 16:55:59','ddd','2022-05-12 16:55:59'),(45,'exercise',23,'2022-05-12','16:56','n','ddd','2022-05-12 16:57:19','ddd','2022-05-12 16:57:19'),(46,'exercise',23,'2022-05-12','11:50','n','ddd','2022-05-12 17:02:06','ddd','2022-05-12 17:02:06'),(47,'coffee',23,'2022-05-12','16:57','n','ddd','2022-05-12 17:02:38','ddd','2022-05-12 17:02:38'),(48,'exercise',23,'2022-05-12','07:50','n','ddd','2022-05-12 17:02:52','ddd','2022-05-12 17:02:52'),(49,'alcohol',23,'2022-05-12','16:57','n','ddd','2022-05-12 17:03:50','ddd','2022-05-12 17:03:50'),(50,'exercise',23,'2022-05-12','07:50','n','ddd','2022-05-12 17:04:10','ddd','2022-05-12 17:04:10'),(51,'exercise',23,'2022-05-12','07:50','n','ddd','2022-05-12 17:04:31','ddd','2022-05-12 17:04:31'),(52,'coffee',23,'2022-05-12','16:57','n','ddd','2022-05-12 17:04:50','ddd','2022-05-12 17:04:50'),(53,'alcohol',23,'2022-05-12','16:57','n','ddd','2022-05-12 17:05:05','ddd','2022-05-12 17:05:05'),(54,'exercise',23,'2022-05-08','07:50','n','ddd','2022-05-12 17:31:37','ddd','2022-05-12 17:31:37'),(55,'alcohol',23,'2022-05-09','16:57','n','ddd','2022-05-12 17:31:37','ddd','2022-05-12 17:31:37'),(56,'alcohol',23,'2022-05-12','16:57','n','ddd','2022-05-12 17:31:37','ddd','2022-05-12 17:31:37');
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

-- Dump completed on 2022-05-12 17:47:46
