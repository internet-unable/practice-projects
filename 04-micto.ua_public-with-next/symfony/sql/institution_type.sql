-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: micto
-- ------------------------------------------------------
-- Server version	5.7.34

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
-- Table structure for table `institution_type`
--

DROP TABLE IF EXISTS `institution_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institution_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `old_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution_type`
--

LOCK TABLES `institution_type` WRITE;
/*!40000 ALTER TABLE `institution_type` DISABLE KEYS */;
INSERT INTO `institution_type` VALUES (1,'Алергологічна лікарня','alergologicna-likarna',39),(2,'Амбулаторія загальної практики - сімейної медицини','ambulatoria-zagal-noi-praktiki-simejnoi-medicini',54),(3,'Аптека','apteka',56),(4,'База спеціального медичного постачання (республіканська, обласна)','baza-special-nogo-medicnogo-postacanna-respublikans-ka-oblasna',70),(5,'Бальнеологічна лікарня','bal-neologicna-likarna',2),(6,'Будинок дитини','budinok-ditini',3),(7,'Бюро (центр) судово-психіатричної експертизи (республіканське, обласне)','buro-centr-sudovo-psihiatricnoi-ekspertizi-respublikans-ke-oblasne',59),(8,'Бюро (центр) судово-психіатричної експертизи міське','buro-centr-sudovo-psihiatricnoi-ekspertizi-mis-ke',69),(9,'Бюро судово-медичної експертизи','buro-sudovo-medicnoi-ekspertizi',5),(10,'Бюро судово-медичної експертизи (республіканське, обласне)','buro-sudovo-medicnoi-ekspertizi-respublikans-ke-oblasne',72),(11,'ВО \"Фармація\"','vo-farmacia',64),(12,'Госпіталь для інвалідів війни','gospital-dla-invalidiv-vijni',6),(13,'Державне підприємство','derzavne-pidpriemstvo',76),(14,'Дерматовенерологічна лікарня','dermatovenerologicna-likarna',7),(15,'Диспансер радіаційного захисту населення','dispanser-radiacijnogo-zahistu-naselenna',35),(16,'Дитяча лікарня','ditaca-likarna',8),(17,'Дитяча поліклініка','ditaca-poliklinika',9),(18,'Дитяча стоматологічна поліклініка','ditaca-stomatologicna-poliklinika',10),(19,'Діагностичний центр','diagnosticnij-centr',11),(20,'Ендокринологічний диспансер','endokrinologicnij-dispanser',13),(21,'Заклад освіти І-ІІ рівнів акредитації','zaklad-osviti-i-ii-rivniv-akreditacii',48),(22,'Інфекційна лікарня','infekcijna-likarna',14),(23,'Інформаціонно-аналітичний центр медичної статистики','informacionno-analiticnij-centr-medicnoi-statistiki',52),(24,'Кардіологічний диспансер','kardiologicnij-dispanser',15),(25,'Косметологічна лікарня','kosmetologicna-likarna',60),(26,'Лікарня','likarna',12),(27,'Лікарня відновного лікування','likarna-vidnovnogo-likuvanna',17),(28,'Лікарня на водному транспорті басейнова','likarna-na-vodnomu-transporti-basejnova',65),(29,'Лікарня швидкої допомоги','likarna-svidkoi-dopomogi',20),(30,'Лікарська амбулаторія','likars-ka-ambulatoria',1),(31,'Лікарсько-фізкультурний диспансер','likars-ko-fizkul-turnij-dispanser',18),(32,'Медико-санітарна частина (у т.ч. спеціалізована)','mediko-sanitarna-castina-u-t-c-specializovana',66),(33,'Медичний центр','medicnij-centr',19),(34,'Міська лікарня','mis-ka-likarna',62),(35,'Міський центр первинної медичної допомоги','mis-kij-centr-pervinnoi-medicnoi-dopomogi',78),(36,'Наркологічна амбулаторія','narkologicna-ambulatoria',74),(37,'Наркологічна лікарня','narkologicna-likarna',21),(38,'Наркологічний диспансер','narkologicnij-dispanser',22),(39,'Онкологічний диспансер','onkologicnij-dispanser',24),(40,'Орган управління охорони здоров\'я','organ-upravlinna-ohoroni-zdorov-a',47),(41,'Офтальмологічна лікарня','oftal-mologicna-likarna',25),(42,'Патолого-анатомічне бюро','patologo-anatomicne-buro',26),(43,'Поліклініка','poliklinika',28),(44,'Пологовий будинок','pologovij-budinok',27),(45,'Пологовий будинок обласний','pologovij-budinok-oblasnij',68),(46,'Протитуберкульозний диспансер','protituberkul-oznij-dispanser',29),(47,'Психіатрична лікарня','psihiatricna-likarna',30),(48,'Психіатрична лікарня (у т.ч. дитяча)','psihiatricna-likarna-u-t-c-ditaca',71),(49,'Психіатричний диспансер','psihiatricnij-dispanser',31),(50,'Психоневрологічна лікарня','psihonevrologicna-likarna',32),(51,'Психоневрологічний диспансер','psihonevrologicnij-dispanser',33),(52,'Санаторій','sanatorij',34),(53,'Станція переливання крові','stancia-perelivanna-krovi',36),(54,'Стоматологічна поліклініка','stomatologicna-poliklinika',37),(55,'Стоматологічна поліклініка районна','stomatologicna-poliklinika-rajonna',73),(56,'Туберкульозна лікарня','tuberkul-ozna-likarna',38),(57,'ФАП','fap',40),(58,'Фізіотерапевтична лікарня','fizioterapevticna-likarna',41),(59,'Фізіотерапевтична поліклініка','fizioterapevticna-poliklinika',44),(60,'Хоспіс','hospis',16),(61,'Центр (курси, коледж) підвищення кваліфікації (для середніх медпрацівників)','centr-kursi-koledz-pidvisenna-kvalifikacii-dla-serednih-medpracivnikiv',58),(62,'Центр екстреної та невідкладної медичної допомоги','centr-ekstrenoi-ta-nevidkladnoi-medicnoi-dopomogi',23),(63,'Центр здоров\'я міський','centr-zdorov-a-mis-kij',57),(64,'Центр здоров\'я обласний, республіканський','centr-zdorov-a-oblasnij-respublikans-kij',53),(65,'Центр здоров\'я районний','centr-zdorov-a-rajonnij',63),(66,'Центр медико-соціальної експертизи','centr-mediko-social-noi-ekspertizi',4),(67,'Центр первинної медико-санітарної допомоги','centr-pervinnoi-mediko-sanitarnoi-dopomogi',46),(68,'Центр реабілітації дітей з огранічним ураженням нервової системи','centr-reabilitacii-ditej-z-ogranicnim-urazennam-nervovoi-sistemi',75),(69,'Центр репродукції людини','centr-reprodukcii-ludini',45),(70,'Центр СНІД','centr-snid',42),(71,'Шкірно-венерологічний диспансер','skirno-venerologicnij-dispanser',43);
/*!40000 ALTER TABLE `institution_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-11 15:17:58
