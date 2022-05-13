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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `member_nickname` varchar(20) NOT NULL,
  `member_img` varchar(200) NOT NULL,
  `member_height` int NOT NULL,
  `member_weight` int NOT NULL,
  `member_year` int NOT NULL,
  `member_gender` varchar(1) NOT NULL,
  `member_desc` varchar(100) NOT NULL,
  `member_kcal` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_email` varchar(30) NOT NULL,
  `reg_dt` varchar(20) NOT NULL,
  `mod_email` varchar(30) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  PRIMARY KEY (`member_seq`),
  UNIQUE KEY `member_seq_UNIQUE` (`member_seq`),
  KEY `member_user_fk_idx` (`user_seq`),
  CONSTRAINT `member_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,1,'문서왕','https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f331.svg',170,55,1997,'f','고혈압,당뇨',1699,'n','blue8957@gmail.com','2022-04-26 01:43:28','blue8957@gmail.com','2022-04-28 15:25:20'),(2,2,'김싸피','image',171,68,1995,'m','질병 없음',1883,'n','ssafy@gmail.com','2022-04-26 01:43:28','ssafy@gmail.com','2022-04-26 01:43:28'),(7,14,'string','https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Profile/profile_1651121992083.jpg',172,58,1998,'m','고혈압과 당뇨가 있습니다..',1822,'n','string151','2022-04-27 14:33:17','string151','2022-05-12 14:13:24'),(8,16,'헝아','https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Profile/profile_1651121992083.jpg',200,100,1998,'f','고혈압,당뇨',2352,'n','sdi1358@naver.com','2022-04-29 12:19:48','sdi1358@naver.com','2022-04-29 12:19:48'),(13,23,'주변을 경계하는 관리자','https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Profile/profile_1651121992083.jpg',170,51,1995,'m','고혈압,당뇨adsd',1780,'n','ddd','2022-05-04 09:23:48','ddd','2022-05-12 15:32:27'),(14,25,'무서운 고수','https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f331.svg',170,50,2000,'f','NO',1699,'n','neulbom104@gmail.com','2022-05-12 11:42:58','neulbom104@gmail.com','2022-05-12 11:42:58');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
