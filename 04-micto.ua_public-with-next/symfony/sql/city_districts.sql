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
-- Table structure for table `city_districts`
--

DROP TABLE IF EXISTS `city_districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city_districts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `katottg` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_CCB704C98BAC62AF` (`city_id`),
  CONSTRAINT `fk_city_districts_city_id_cities_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_districts`
--

LOCK TABLES `city_districts` WRITE;
/*!40000 ALTER TABLE `city_districts` DISABLE KEYS */;
INSERT INTO `city_districts` VALUES (1,11734,'Автозаводський','avtozavodskyi-rn','UA53020110010112104',30762),(2,6802,'Амур-Нижньодніпровський','amur-nyzhnodniprovskyi-rn','UA12020010010114149',30763),(3,13316,'Артемівський','artemivskyi-rn','UA44060010010186225',30764),(4,32775,'Балаклавський','balaklavskyi-rn','UA85000000000155841',30765),(5,7639,'Богунський','bohunskyi-rn','UA18040190010115253',30766),(6,7081,'Будьоннівський','budonnivskyi-rn','UA14080030010114109',30767),(7,8265,'Вознесенівський','voznesenivskyi-rn','UA23060070010154443',30768),(8,7081,'Ворошиловський','voroshylovskyi-rn','UA14080030010212449',30769),(9,32775,'Гагарінський','haharinskyi-rn','UA85000000000259923',30770),(10,13496,'Галицький','halytskyi-rn','UA46060250010121390',30771),(11,13792,'Гірницький','hirnytskyi-rn','UA14080070010143690',30772),(12,32774,'Голосіївський','holosiivskyi-rn','UA80000000000126643',30773),(13,32774,'Дарницький','darnytskyi-rn','UA80000000000210193',30774),(14,27102,'Деснянський','desnianskyi-rn','UA74100390010122363',30775),(15,32774,'Деснянський','desnianskyi-rn','UA80000000000336424',30776),(16,8265,'Дніпровський','dniprovskyi-rn','UA23060070010228148',30777),(17,9760,'Дніпровський','dniprovskyi-rn','UA12040150010118924',30778),(18,32774,'Дніпровський','dniprovskyi-rn','UA80000000000479391',30779),(19,26252,'Дніпровський','dniprovskyi-rn','UA65100150010123057',30780),(20,11787,'Довгинцівський','dovhyntsivskyi-rn','UA12060170010145934',30781),(21,13316,'Жовтневий','zhovtnevyi-rn','UA44060010010286453',30782),(22,8265,'Заводський','zavodskyi-rn','UA23060070010385728',30783),(23,14898,'Заводський','zavodskyi-rn','UA48060150010139573',30784),(24,9760,'Заводський','zavodskyi-rn','UA12040150010213957',30785),(25,13496,'Залізничний','zaliznychnyi-rn','UA46060250010259421',30786),(26,22964,'Залізничний','zaliznychnyi-rn','UA01160330010143565',30787),(27,24543,'Зарічний','zarichnyi-rn','UA59080270010111002',30788),(28,11787,'Інгулецький','inhuletskyi-rn','UA12060170010270453',30789),(29,14898,'Інгульський','inhulskyi-rn','UA48060150010235917',30790),(30,6802,'Індустріальний','industrialnyi-rn','UA12020010010231764',30791),(31,26201,'Індустріальний','industrialnyi-rn','UA63120270010158723',30792),(32,7081,'Калінінський','kalininskyi-rn','UA14080030010347304',30793),(33,5529,'Калінінський','kalininskyi-rn','UA14060030010124146',30794),(34,14485,'Кальміуський','kalmiuskyi-rn','UA14140050010166965',30795),(35,13316,'Кам’янобрідський','kamianobridskyi-rn','UA44060010010390215',30796),(36,26201,'Київський','kyivskyi-rn','UA63120270010216514',30797),(37,20338,'Київський','kyivskyi-rn','UA53080370010183642',30798),(38,7081,'Київський','kyivskyi-rn','UA14080030010433681',30799),(39,22964,'Київський','kyivskyi-rn','UA01160330010252081',30800),(40,17813,'Київський','kyivskyi-rn','UA51100270010196805',30801),(41,7081,'Кіровський','kirovskyi-rn','UA14080030010547389',30802),(42,13792,'Кіровський','kirovskyi-rn','UA14080070010228327',30803),(43,24543,'Ковпаківський','kovpakivskyi-rn','UA59080270010287243',30804),(44,8265,'Комунарський','komunarskyi-rn','UA23060070010474202',30805),(45,26252,'Корабельний','korabelnyi-rn','UA65100150010217771',30806),(46,14898,'Корабельний','korabelnyi-rn','UA48060150010393291',30807),(47,7639,'Корольовський','korolovskyi-rn','UA18040190010281147',30808),(48,11734,'Крюківський','krukivskyi-rn','UA53020110010228624',30809),(49,7081,'Куйбишевський','kuibyshevskyi-rn','UA14080030010618421',30810),(50,32775,'Ленінський','leninskyi-rn','UA85000000000334608',30811),(51,7081,'Ленінський','leninskyi-rn','UA14080030010729653',30812),(52,13316,'Ленінський','leninskyi-rn','UA44060010010431242',30813),(53,13496,'Личаківський','lychakivskyi-rn','UA46060250010364817',30814),(54,14485,'Лівобережний','livoberezhnyi-rn','UA14140050010258579',30815),(55,17813,'Малиновський','malynovskyi-rn','UA51100270010275193',30816),(56,11787,'Металургійний','metalurhiinyi-rn','UA12060170010378670',30817),(57,5529,'Микитівський','mykytivskyi-rn','UA14060030010237008',30818),(58,26201,'Московський','moskovskyi-rn','UA63120270010315719',30819),(59,32775,'Нахімовський','nakhimovskyi-rn','UA85000000000449437',30820),(60,26201,'Немишлянський','nemyshlianskyi-rn','UA63120270010423479',30821),(61,26201,'Новобаварський','novobavarskyi-rn','UA63120270010565081',30822),(62,27102,'Новозаводський','novozavodskyi-rn','UA74100390010268220',30823),(63,6802,'Новокодацький','novokodatskyi-rn','UA12020010010350200',30824),(64,32774,'Оболонський','obolonskyi-rn','UA80000000000551439',30825),(65,8265,'Олександрівський','oleksandrivskyi-rn','UA23060070010595678',30826),(66,26201,'Основ’янський','osnovianskyi-rn','UA63120270010681864',30827),(67,7081,'Петровський','petrovskyi-rn','UA14080030010876839',30828),(68,32774,'Печерський','pecherskyi-rn','UA80000000000624772',30829),(69,9760,'Південний','pivdennyi-rn','UA12040150010395824',30830),(70,32774,'Подільський','podilskyi-rn','UA80000000000719633',30831),(71,20338,'Подільський','podilskyi-rn','UA53080370010266780',30832),(72,11958,'Подільський','podilskyi-rn','UA35040210010145346',30833),(73,11787,'Покровський','pokrovskyi-rn','UA12060170010439451',30834),(74,27034,'Придніпровський','prydniprovskyi-rn','UA71080490010144486',30835),(75,14485,'Приморський','prymorskyi-rn','UA14140050010350963',30836),(76,17813,'Приморський','prymorskyi-rn','UA51100270010320268',30837),(77,7081,'Пролетарський','proletarskyi-rn','UA14080030010948068',30838),(78,11787,'Саксаганський','saksahanskyi-rn','UA12060170010585703',30839),(79,6802,'Самарський','samarskyi-rn','UA12020010010475293',30840),(80,32774,'Святошинський','sviatoshynskyi-rn','UA80000000000875983',30841),(81,13496,'Сихівський','sykhivskyi-rn','UA46060250010457177',30842),(82,26201,'Слобідський','slobidskyi-rn','UA63120270010736370',30843),(83,6802,'Соборний','sobornyi-rn','UA12020010010512802',30844),(84,13792,'Совєтський','sovietskyi-rn','UA14080070010311962',30845),(85,32774,'Солом’янський','solomianskyi-rn','UA80000000000980793',30846),(86,27034,'Соснівський','sosnivskyi-rn','UA71080490010259590',30847),(87,17813,'Суворовський','suvorovskyi-rn','UA51100270010413116',30848),(88,26252,'Суворовський','suvorovskyi-rn','UA65100150010361097',30849),(89,11787,'Тернівський','ternivskyi-rn','UA12060170010643671',30850),(90,11958,'Фортечний','fortechnyi-rn','UA35040210010286392',30851),(91,13496,'Франківський','frankivskyi-rn','UA46060250010515336',30852),(92,26201,'Холодногірський','kholodnohirskyi-rn','UA63120270010877312',30853),(93,8265,'Хортицький','khortytskyi-rn','UA23060070010618511',30854),(94,6802,'Центральний','tsentralnyi-rn','UA12020010010639502',30855),(95,14898,'Центральний','tsentralnyi-rn','UA48060150010443183',30856),(96,22964,'Центральний','tsentralnyi-rn','UA01160330010375460',30857),(97,14485,'Центральний','tsentralnyi-rn','UA14140050010437700',30858),(98,11787,'Центрально-Міський','tsentralno-miskyi-rn','UA12060170010720279',30859),(99,5529,'Центрально-Міський','tsentralno-miskyi-rn','UA14060030010314375',30860),(100,13792,'Центрально-Міський','tsentralno-miskyi-rn','UA14080070010462038',30861),(101,13792,'Червоногвардійський','chervonohvardiiskyi-rn','UA14080070010574833',30862),(102,6802,'Чечелівський','chechelivskyi-rn','UA12020010010757287',30863),(103,26201,'Шевченківський','shevchenkivskyi-rn','UA63120270010948820',30864),(104,8265,'Шевченківський','shevchenkivskyi-rn','UA23060070010748330',30865),(105,32774,'Шевченківський','shevchenkivskyi-rn','UA80000000001078669',30866),(106,20338,'Шевченківський','shevchenkivskyi-rn','UA53080370010339303',30867),(107,13496,'Шевченківський','shevchenkivskyi-rn','UA46060250010615203',30868),(108,6802,'Шевченківський','shevchenkivskyi-rn','UA12020010010816623',30869);
/*!40000 ALTER TABLE `city_districts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-12 14:38:48
