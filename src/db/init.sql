-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: nest_db
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ev_dept`
--

DROP TABLE IF EXISTS `ev_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_dept` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createTime` datetime DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sort` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1010107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_dept`
--

LOCK TABLES `ev_dept` WRITE;
/*!40000 ALTER TABLE `ev_dept` DISABLE KEYS */;
INSERT INTO `ev_dept` VALUES (1,NULL,'XXX科技有限公司',1,'2024-05-22 08:02:59','总部',10),(5,101,'测试部',1,'2024-05-22 08:02:59','',9),(6,101,'运维部',1,'2024-05-22 08:02:59','运维部',12),(7,10101,'研发一组',1,'2024-05-22 08:02:59','研发一组',4),(101,1,'北京总部',1,'2024-05-22 08:02:59','北京总部3',3),(10101,101,'研发部',1,'2024-05-22 08:02:59','研发',2);
/*!40000 ALTER TABLE `ev_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_dict`
--

DROP TABLE IF EXISTS `ev_dict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_dict` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_dict`
--

LOCK TABLES `ev_dict` WRITE;
/*!40000 ALTER TABLE `ev_dict` DISABLE KEYS */;
INSERT INTO `ev_dict` VALUES (1,'性别','gender',1,'性别字典','1900-01-20 23:24:40'),(2,'状态','status',1,'通用状态字典1','1900-01-20 23:36:06'),(3,'爱好','hobbys',1,'基础表单-兴趣爱好','1900-01-20 19:30:40');
/*!40000 ALTER TABLE `ev_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_dict_info`
--

DROP TABLE IF EXISTS `ev_dict_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_dict_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pid` int NOT NULL,
  `value` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_dict_info`
--

LOCK TABLES `ev_dict_info` WRITE;
/*!40000 ALTER TABLE `ev_dict_info` DISABLE KEYS */;
INSERT INTO `ev_dict_info` VALUES (1,'男',1,0,1),(2,'女',1,1,1),(3,'正常',2,1,1),(4,'禁用',2,0,1),(5,'运动',3,1,1),(6,'音乐',3,2,1),(8,'未知1',3,3,1),(13,'大是的请问',3,4,1),(14,'ww',12,1,1);
/*!40000 ALTER TABLE `ev_dict_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_menu`
--

DROP TABLE IF EXISTS `ev_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int NOT NULL DEFAULT '0',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` int NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `svgIcon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `keepAlive` tinyint DEFAULT NULL,
  `hidden` tinyint DEFAULT NULL,
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `activeMenu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `breadcrumb` tinyint DEFAULT NULL,
  `status` int DEFAULT '0',
  `roles` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `showInTabs` tinyint DEFAULT NULL,
  `alwaysShow` tinyint DEFAULT NULL,
  `affix` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=946 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_menu`
--

LOCK TABLES `ev_menu` WRITE;
/*!40000 ALTER TABLE `ev_menu` DISABLE KEYS */;
INSERT INTO `ev_menu` VALUES (1,0,'/analyse','Layout','/analyse/index',1,'分析页','menu-chart','',0,0,'1','',1,1,'[\"role_admin\",\"role_user\"]','',1,0,0),(8,0,'/system','Layout','/system/user',1,'系统管理','menu-system','',0,0,'9','',1,1,'[\"role_admin\"]','',1,0,0),(9,0,'/demo','Layout','/demo/index',1,'示例页','menu-data','',0,0,'2','',1,1,'[\"role_admin\",\"role_user\"]','',1,0,0),(101,1,'/analyse/index','analyse/index','',2,'分析页','','',0,0,'1','',0,1,'[\"role_admin\",\"role_user\"]','',1,0,1),(801,8,'/system/user','system/user/index','',2,'用户管理','','icon-user',0,0,'1','',1,1,'[\"role_admin\"]','',1,0,0),(802,8,'/system/role','system/role/index','',2,'角色管理','','icon-common',0,0,'2','',1,1,'[\"role_admin\"]','',1,0,0),(803,8,'/system/dept','system/dept/index','',2,'部门管理','','icon-mind-mapping',0,0,'3','',1,1,'[\"role_admin\"]','',1,0,0),(804,8,'/system/menu','system/menu/index','',2,'菜单管理','','icon-menu',0,0,'4','',1,1,'[\"role_admin\"]','',1,0,0),(805,8,'/system/dict','system/dict/index','',2,'字典管理','','icon-bookmark',0,0,'5','',1,1,'[\"role_admin\"]','',1,0,0),(901,9,'/demo/index','demo/index','',2,'示例页','menu-example','',0,0,'0','',0,1,'[\"role_admin\",\"role_user\"]','',1,0,0),(913,801,'','','',3,'添加用户','','',0,1,'0',NULL,1,1,NULL,'sys:btn:add',1,0,NULL),(914,801,'','','',3,'bianji','','',0,1,'0',NULL,1,1,NULL,'sys:user:edit',1,0,NULL),(932,0,'/webChat','Layout','/webChat/index',1,'webChat','wechat','',0,0,'5',NULL,1,1,NULL,'',1,0,0),(933,932,'/webChat/index','socketio/index','',2,'webChat','wechat','',1,0,'0',NULL,0,1,NULL,'',1,0,0),(934,0,'/info','Layout','/info/index',1,'个人信息','avatar-man','',1,1,'0',NULL,0,1,NULL,'',1,0,0),(935,934,'/info/index','userinfo/index','',2,'个人信息','avatar-man','',0,1,'0',NULL,1,1,NULL,'',1,0,NULL),(936,0,'/schedule','Layout','/schedule/index',1,'日程','calendar','',0,0,'6',NULL,1,1,NULL,'',1,0,0),(937,936,'/schedule/index','schedule/index','',2,'日程','calendar','',1,0,'0',NULL,0,1,NULL,'',1,0,0),(938,0,'/file','Layout','/file/index',1,'文件管理','file-open','',0,0,'7',NULL,1,1,NULL,'',1,0,0),(940,938,'/file/index','file/main/index','',2,'文件管理','file-open','',0,0,'0',NULL,0,1,NULL,'',1,0,NULL),(942,0,'/inline','Layout','/inline/ppt',1,'内链','icon-num','IconAttachment',0,0,'8',NULL,1,1,NULL,'',1,0,0),(943,942,'/inline/ppt','inline/ppt','',2,'PPT','file-ppt','',0,0,'0',NULL,1,1,NULL,'',1,0,NULL),(944,942,'/inline/draw','inline/drawingBoard','',2,'画板','menu-edit','IconEdit',0,0,'0',NULL,1,1,NULL,'',1,0,0),(945,942,'/inline/mindMap','inline/mindMap','',2,'思维导图','icon-process','',0,0,'0',NULL,1,1,NULL,'',1,0,NULL);
/*!40000 ALTER TABLE `ev_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_message`
--

DROP TABLE IF EXISTS `ev_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `formName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `formId` int NOT NULL,
  `formUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'http://www.jy2002.love/assets/infourl-3lzKe2gJ.png',
  `toName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `toId` int NOT NULL,
  `toUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'http://www.jy2002.love/assets/infourl-3lzKe2gJ.png',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_message`
--

LOCK TABLES `ev_message` WRITE;
/*!40000 ALTER TABLE `ev_message` DISABLE KEYS */;
INSERT INTO `ev_message` VALUES (175,'阿松大','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','jiaoy',56,'/int/img/1719039471700.png',NULL,'2024-06-27 17:52:10',0),(176,'阿松大','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','测试',57,'http://api.jy2002.love/img/1719469287853.png','user','2024-06-27 17:52:15',0),(177,'顶顶顶','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-27 17:52:18',0),(178,'阿三','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','测试',57,'http://api.jy2002.love/img/1719469287853.png','user','2024-06-27 17:52:24',0),(179,'我','admin',59,'http://api.jy2002.love/img/1719469287853.png','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-27 17:53:05',0),(180,'123','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-27 18:42:33',0),(181,'3261614','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','测试',57,'http://api.jy2002.love/img/1719469287853.png','user','2024-06-27 18:42:46',0),(182,'2222','admin',59,'http://api.jy2002.love/img/1719469287853.png','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-27 18:42:51',0),(183,'33','admin',59,'http://api.jy2002.love/img/1719469287853.png','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-27 18:43:11',0),(184,'\n66','admin',59,'http://api.jy2002.love/img/1719469287853.png','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-27 18:43:21',0),(185,'让人','admin',59,'http://api.jy2002.love/img/1719469287853.png','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-28 09:10:45',0),(186,'1','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-28 11:24:50',0),(187,'ddd','测试',57,'http://api.jy2002.love/img/1719469287853.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-29 16:40:48',0),(188,'asdas','测试007',57,'http://api.jy2002.love/img/1719469287853.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-29 16:43:39',0),(189,'df','测试007',57,'http://api.jy2002.love/img/1719469287853.png','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-29 16:44:42',0),(190,'asd','测试007',57,'https://api.jy2002.love/img/1719650730933.webp','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-29 16:48:13',0),(191,'啊实打实','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-29 16:51:39',0),(192,'asd ','测试007',57,'https://api.jy2002.love/img/1719650730933.webp','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-06-29 16:51:44',0),(193,'fff','测试007',57,'https://api.jy2002.love/img/1719652576766.webp','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-29 17:16:30',1),(194,'ssssss','测试007',57,'https://api.jy2002.love/img/1719652576766.webp','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','user','2024-06-29 17:16:46',0),(195,'啊圣诞袜','jiaoy',56,'http://api.jy2002.love/img/1719472865433.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-07-06 17:04:00',0),(196,'我','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','测试007',57,'https://api.jy2002.love/img/1719652576766.webp','user','2024-07-15 13:41:13',0),(197,'阿松大','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-07-26 11:18:42',0),(198,'阿松大','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-08-09 17:24:32',0),(199,'阿松大','admin',59,'https://api.jy2002.love/img/1720689428239.webp','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-08-09 17:25:19',0),(200,'阿松大','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','admin',59,'https://api.jy2002.love/img/1720689428239.webp','user','2024-08-09 17:25:34',0),(201,'阿松大我我阿松大','admin',59,'https://api.jy2002.love/img/1720689428239.webp','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','user','2024-08-09 17:25:42',0),(202,'W ','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-08-14 15:33:51',0),(203,'杀杀杀','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-08-15 14:27:55',1),(204,'呵呵呵','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-08-15 14:28:28',0),(205,'ss','admin',59,'https://api.jy2002.love/img/1720689428239.webp','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','user','2024-08-15 14:28:35',0),(206,'asd ','多可悲',56,'https://api.jy2002.love/img/1720513431685.png','聊天室',1,'https://p26-passport.byteacctimg.com/img/user-avatar/9df05ee4be63fc38375bdfeb9931fa6f~50x50.awebp','room','2024-09-12 10:28:08',0);
/*!40000 ALTER TABLE `ev_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_roles`
--

DROP TABLE IF EXISTS `ev_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `menus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_roles`
--

LOCK TABLES `ev_roles` WRITE;
/*!40000 ALTER TABLE `ev_roles` DISABLE KEYS */;
INSERT INTO `ev_roles` VALUES (1,'2024-06-19 11:25:38','超级管理员','role_admin',0,'系统初始角色','[1,2,9,906,909,911,802,803,804,805,913,101,201,202,203,901,907,910,912,914,801,8,905,931,932,933,934,935,936,937,938,940,942,943,944,945]'),(2,'2024-06-19 11:25:38','普通用户','role_user',1,'普通用户，无系统管理权限，系统管理菜单无权访问','[2,201,202,203,902,905,1,101,9,906,909,911,910,912,907,901,932,933,934,935,936,937,938,940,942,943,944,945]'),(5,'2024-06-19 11:25:38','Joker','Use_Joker',1,'小丑','[1,101,9,901,8,906,907,909,910,932,933,934,935,936,937,938,940,942,943,944,945]');
/*!40000 ALTER TABLE `ev_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_schedule`
--

DROP TABLE IF EXISTS `ev_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `desc` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `createId` int NOT NULL,
  `remind` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `participants` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_schedule`
--

LOCK TABLES `ev_schedule` WRITE;
/*!40000 ALTER TABLE `ev_schedule` DISABLE KEYS */;
INSERT INTO `ev_schedule` VALUES (1,'2024-07-05 22:02:00','2024-07-11 00:00:00','你不要哇哇叫','#5856D6','三十三',56,'5','[56]'),(2,'2024-07-13 17:59:00','2024-07-24 00:00:00','356456','#5ac8fa','7444',56,'0','[56,57,59]'),(3,'2024-07-06 17:13:00','2024-07-12 00:00:00','哇哇哇三十三','#5856D6','',59,'0','[59]'),(5,'2024-08-13 17:47:00','2024-08-14 00:00:00','嘻嘻嘻','#00C1D4','',56,'5','[56]'),(7,'2024-10-01 00:00:00','2024-10-08 00:00:00','国庆假期','#4290f7','假期',56,'','[56]'),(8,'2024-09-09 00:00:00','2024-09-12 00:00:00','撒旦撒旦','#AF52DE','',56,'','[56,57,59,62]');
/*!40000 ALTER TABLE `ev_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_upload`
--

DROP TABLE IF EXISTS `ev_upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_upload` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `src` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `extendName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isDir` tinyint NOT NULL,
  `filePath` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `size` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_upload`
--

LOCK TABLES `ev_upload` WRITE;
/*!40000 ALTER TABLE `ev_upload` DISABLE KEYS */;
/*!40000 ALTER TABLE `ev_upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `disabled` tinyint NOT NULL DEFAULT '0',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint NOT NULL DEFAULT '1',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  `gender` tinyint NOT NULL DEFAULT '1',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `roleIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '[]',
  `roleNames` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deptName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deptId` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_users`
--

LOCK TABLES `ev_users` WRITE;
/*!40000 ALTER TABLE `ev_users` DISABLE KEYS */;
INSERT INTO `ev_users` VALUES (56,0,'2024-06-19 11:36:53',1,'jiaoy','$2a$10$HXGqLU79cnPgnbqS6jOinu3Y9j/hFUoLDnOr8U2JGRPL0k0rVhNve','多可悲','18888888888@163.com','https://api.jy2002.love/img/1720513431685.png',1,'18888888888','[\"role_admin\",\"role_user\"]','超级管理员','XXX科技有限公司',1),(57,0,'2024-06-19 11:36:53',1,'ceshi','$2a$10$UYp0nNCR2Fg02DhEZDkvTO6qgvp6F642ey5V1ZmyrV4N7SiwQ0jfq','测试007','18888888888@163.com','https://api.jy2002.love/img/1719652576766.webp',2,'18888888888','[\"role_user\"]','string','运维部',6),(59,0,'2024-06-21 16:26:09',1,'admin','$2a$10$xmTbHWgt.Kj6.iadtWgINepRnhIMZA4NUOrwI3jOXuxEy2JnZSywS','admin','1677253255@163.com','https://api.jy2002.love/img/1720689428239.webp',1,'18888888888','[\"role_user\"]',NULL,'运维部',6),(62,0,'2024-06-22 11:05:18',1,'test007','$2a$10$KI/8lNdZK.IoAyy6nCfcg.9g8XE1zZFRxm8GeYvSdjl.yNq731ghe','test007','453271736@qq.com','http://api.jy2002.love/img/1719469287853.png',1,'18888888888','[\"role_user\"]',NULL,'测试部',5);
/*!40000 ALTER TABLE `ev_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 17:34:09
