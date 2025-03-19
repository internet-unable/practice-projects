-- MySQL dump 10.13  Distrib 5.7.39, for Linux (x86_64)
--
-- Host: localhost    Database: micto
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `katottg` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Автономна Республіка Крим','avtonomna-respublika-krym','UA01000000000013043',890),(2,'Вінницька','vinnytska-obl','UA05000000000010236',891),(3,'Волинська','volynska-obl','UA07000000000024379',892),(4,'Дніпропетровська','dnipropetrovska-obl','UA12000000000090473',893),(5,'Донецька','donetska-obl','UA14000000000091971',894),(6,'Житомирська','zhytomyrska-obl','UA18000000000041385',895),(7,'Закарпатська','zakarpatska-obl','UA21000000000011690',896),(8,'Запорізька','zaporizka-obl','UA23000000000064947',897),(9,'Івано-Франківська','ivano-frankivska-obl','UA26000000000069363',898),(10,'Київська','kyivska-obl','UA32000000000030281',900),(11,'Кіровоградська','kirovohradska-obl','UA35000000000016081',901),(12,'Луганська','luhanska-obl','UA44000000000018893',902),(13,'Львівська','lvivska-obl','UA46000000000026241',903),(14,'Миколаївська','mykolaivska-obl','UA48000000000039575',904),(15,'Одеська','odeska-obl','UA51000000000030770',905),(16,'Полтавська','poltavska-obl','UA53000000000028050',906),(17,'Рівненська','rivnenska-obl','UA56000000000066151',907),(18,'Сумська','sumska-obl','UA59000000000057109',909),(19,'Тернопільська','ternopilska-obl','UA61000000000060328',910),(20,'Харківська','kharkivska-obl','UA63000000000041885',911),(21,'Херсонська','khersonska-obl','UA65000000000030969',912),(22,'Хмельницька','khmelnytska-obl','UA68000000000099709',913),(23,'Черкаська','cherkaska-obl','UA71000000000010357',914),(24,'Чернівецька','chernivetska-obl','UA73000000000044923',915),(25,'Чернігівська','chernihivska-obl','UA74000000000025378',916);
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-08 11:37:26
