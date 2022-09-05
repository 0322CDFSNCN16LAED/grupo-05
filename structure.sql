CREATE DATABASE  IF NOT EXISTS `easyfix` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `easyfix`;
-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: easyfix
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `localidad` varchar(255) NOT NULL,
  `barrio` varchar(255) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `piso` int(11) DEFAULT NULL,
  `departamento` varchar(45) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addressesFk_userId_idx` (`userId`),
  CONSTRAINT `addressesFk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (39,'Capital Federal','Nuñez','Olaya 1075',5,'A ',40,'2022-08-16','2022-08-19'),(40,'Capital Federal','Nuñez','Araoz 750',9,'A      ',41,'2022-08-17','2022-08-22'),(41,'Capital Federal','Nuñez','Olaya 1045',9,'A',42,'2022-08-26','2022-08-26'),(42,'Capital Federal','Floresta','calle falsa 1234',4,'C',43,'2022-09-04','2022-09-04');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `categoryPhoto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Albañileria','albañil.jpg'),(2,'Seguridad','cam-seguridad.jpg'),(3,'Carpinteria','carpintero.jpg'),(4,'Electricidad','electricista.jpg'),(5,'Gas','gasista.jpg'),(6,'Jardineria','jardineria.jpg'),(7,'Niñera','niñera.jpg'),(8,'Pintura','pintor.jpg'),(9,'Plomeria','plomero.jpg'),(10,'Climatizacion','tec-aire.png'),(11,'PC','tec-pc.jpg'),(12,'Mudanza','mudanza.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) DEFAULT NULL,
  `jobDescription` longtext DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servicesFk_categoryId_idx` (`categoryId`),
  KEY `servicesFk_userId_idx` (`userId`),
  CONSTRAINT `servicesFk_categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `servicesFk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (19,4,'aa',4000,40),(20,3,'hola',4000,40),(21,3,'aa',800,40),(22,4,'aa',800,40),(23,4,'1',7000,40),(24,10,'a',1,40),(25,2,'seguridad',800,41),(26,4,'Electricidad',8000,40),(27,2,'security',9000,40),(28,3,'a',7000,40),(29,3,'carp',90,40),(30,3,'carp 2',90,40),(31,3,'carp 3',90,40),(32,3,'carp 4',90,40),(33,3,'carp 5',90,40);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_solicitations`
--

DROP TABLE IF EXISTS `services_solicitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_solicitations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serviceDate` date NOT NULL,
  `solicitationState` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `serviceTime` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `services_solicitatonsFk_serviceId_idx` (`serviceId`),
  KEY `services_solicitatonsFk_userId_idx` (`userId`),
  CONSTRAINT `services_solicitatonsFk_serviceId` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `services_solicitatonsFk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_solicitations`
--

LOCK TABLES `services_solicitations` WRITE;
/*!40000 ALTER TABLE `services_solicitations` DISABLE KEYS */;
INSERT INTO `services_solicitations` VALUES (4,'2022-08-31','Aceptada',40,33,'00:00:00'),(5,'2022-09-24','Pendiente',42,33,'11:30:00'),(6,'2022-08-18','Pendiente',42,33,'00:00:00');
/*!40000 ALTER TABLE `services_solicitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicesphotos`
--

DROP TABLE IF EXISTS `servicesphotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicesphotos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) DEFAULT NULL,
  `serviceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servicesphotosFk_serviceId_idx` (`serviceId`),
  CONSTRAINT `servicesphotosFk_serviceId` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicesphotos`
--

LOCK TABLES `servicesphotos` WRITE;
/*!40000 ALTER TABLE `servicesphotos` DISABLE KEYS */;
INSERT INTO `servicesphotos` VALUES (5,'1660693733989.png',NULL),(6,'default.jpg',NULL),(7,'default.jpg',24),(8,'default.jpg',24),(9,'default.jpg',26),(10,'default.jpg',26),(11,'default.jpg',26),(12,'default.jpg',26),(13,'default.jpg',27),(14,'1661198131083.jpg',29),(15,'1661198249223.jpg',30),(16,'1661198249223.jpg',30),(17,'1661198249226.jpg',30),(18,'1661198360934.jpg',31),(19,'1661198360934.jpg',31),(20,'1661198360938.jpg',31),(21,'1661198424609.webp',32),(22,'1661198424609.jpg',32),(23,'1661198424611.jpg',32),(24,'1661198516260.jpg',33),(25,'1661198516260.webp',33),(26,'1661198516262.webp',33),(27,'1661198516263.jpg',33),(28,'1661198516266.jpg',33),(29,'1662257649558.sql',NULL);
/*!40000 ALTER TABLE `servicesphotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profilePicture` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) NOT NULL,
  `phoneNumber` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (40,'1660693714029.png','Martin',12341234,'coca@gmail.com','$2a$12$w5MkZH7kQq0Cg3pfrojoF.RXc7V7Nsu7fAbVwl/AL/uKA9JzQjoQe','2022-08-16','2022-08-19'),(41,'1660942097546.png','Martin',12341234,'ilan@gmail.com','$2a$12$usnDEoFEbxM24wuBVLpI3OWJVc/QXBRpMZFYPzDRseL94gD6ScCy.','2022-08-17','2022-08-22'),(42,'1661530203213.jpg','Martin',12341234,'martin@gmail.com','$2a$12$Dj9WUO00.HuhR45UsXQgAukrmVSiDvCJt/AxSWgHhV5ZZoepz7UBS',NULL,NULL),(43,'1662257610473.jpg','Javier',15123645,'jaalonsosilva@gmail.com','$2a$12$aQqdTHi/K8XeIFrcsKpDMOF/y62rDV8rVQljc3fxpuiItA37I4uxW','2022-09-04','2022-09-04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-05 19:36:31
