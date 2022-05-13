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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `user_type` varchar(1) NOT NULL COMMENT '0(일반회원), 1(전문가)',
  `user_email` varchar(30) NOT NULL,
  `user_pwd` varchar(100) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_seq_UNIQUE` (`user_seq`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'0','blue8957@gmail.com','ssafy104!','n','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-26 01:43:28'),(2,'0','ssafy@gmail.com','ssafy104!','n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(3,'1','expert@gmail.com','ssafy104!','n','expert@gmail.com','2022-04-26 01:43:28','expert@gmail.com','2022-04-26 01:43:28'),(4,'1','expert2@gmail.com','ssafy104!','n','expert2@gmail.com','2022-04-26 01:43:28','expert2@gmail.com','2022-04-26 01:43:28'),(5,'1','string22','string','n','string','2022-04-27 11:12:59','string','2022-04-27 11:12:59'),(6,'1','string21','string','n','string','2022-04-27 11:22:24','string','2022-04-27 11:22:24'),(7,'1','string','$2a$10$fbKBYSkmMNJiwwgBArTAsOITWVJyvG9uqzCZqV165mkjwewAglAT6','n','string','2022-04-27 11:23:26','string','2022-04-27 11:23:26'),(14,'0','string151','$2a$10$fbKBYSkmMNJiwwgBArTAsOITWVJyvG9uqzCZqV165mkjwewAglAT6','n','string151','2022-04-27 14:33:17','string151','2022-04-27 14:33:17'),(15,'1','sdi1358_@naver.com','$2a$10$HUSHP3HAGIjqQEyIaHXcPOX2WwONJ21w/nVTE6Q4SRIPK8W8oU7SS','n','sdi1358_@naver.com','2022-04-27 15:09:05','sdi1358_@naver.com','2022-04-27 15:09:05'),(16,'0','sdi1358@naver.com','$2a$10$NP2I0NyMxjCyqxY8erPySey2FcZ.WDCrlMGmbKL6XodhGZuF9n/Am','n','sdi1358@naver.com','2022-04-29 12:19:48','sdi1358@naver.com','2022-04-29 12:19:48'),(17,'1','freessafy104@gmail.com','$2a$10$TO6JPQtZwDcoZJiReFJ4luB2Cu5KBbhVsa1W80FV7D6OVZhnSZKl6','n','freessafy104@gmail.com','2022-05-04 15:36:03','freessafy104@gmail.com','2022-05-04 15:36:03'),(22,'0','Dddd','$2a$10$x1ZdY2HYLNfwliPvN0grhOTqQxnMqXd2j8rDfk4qYghBoL8Jpeyd.','n','Dddd','2022-05-04 08:51:00','Dddd','2022-05-04 08:51:00'),(23,'0','ddd','$2a$10$oQMPA2qBl1/F8tJfWSdUw.nqM2aQ1XunTXhmT3ECDh0kHO21CMNr.','n','ddd','2022-05-04 09:23:48','ddd','2022-05-04 09:23:48'),(24,'0','','$2a$10$JXGJAqXVOO/zmU8/BzsL.OknuDz40S8dHgkiyxCS4wf2KCiXdKUp6','n','','2022-05-04 13:58:11','','2022-05-04 13:58:11'),(25,'0','neulbom104@gmail.com','$2a$10$qxTRsDgGB/QHO405NU4ubuqZFF9JEnV6VIT.nOz.E.bHOzvSOljma','n','neulbom104@gmail.com','2022-05-12 11:42:58','neulbom104@gmail.com','2022-05-12 11:42:58');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:47:45
