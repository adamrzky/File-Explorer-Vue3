/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : file_explorer_db

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 25/12/2024 10:49:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `folder_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_folder_id`(`folder_id` ASC) USING BTREE,
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES (1, 'ProjectPlan.docx', '.docx', 2, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (2, '2024Budget.xlsx', '.xlsx', 3, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (3, 'Presentation.pptx', '.pptx', 2, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (4, 'Report.pdf', '.pdf', 3, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (5, 'MeetingNotes.txt', '.txt', 1, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (6, 'Resume.docx', '.docx', 2, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (7, 'Budget2025.xlsx', '.xlsx', 3, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (8, 'DesignMockup.png', '.png', 4, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (9, 'ProjectTimeline.mpp', '.mpp', 2, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (10, 'Photos.zip', '.zip', 5, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (11, 'CodeSnippet.js', '.js', 6, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (12, 'Contract.pdf', '.pdf', 1, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `files` VALUES (13, 'NewFile.txt', '.txt', 2, '2024-12-24 23:28:09', '2024-12-24 23:28:09');
INSERT INTO `files` VALUES (14, 'NewFile.txt', '.txt', 1, '2024-12-25 00:47:47', '2024-12-25 00:47:47');

-- ----------------------------
-- Table structure for folders
-- ----------------------------
DROP TABLE IF EXISTS `folders`;
CREATE TABLE `folders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `folders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of folders
-- ----------------------------
INSERT INTO `folders` VALUES (1, 'Documents', NULL, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `folders` VALUES (2, 'Pictures', NULL, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `folders` VALUES (3, 'Music', NULL, '2024-12-24 14:16:48', '2024-12-24 14:16:48');
INSERT INTO `folders` VALUES (4, 'Downloads', NULL, '2024-12-24 23:11:28', '2024-12-24 23:11:28');
INSERT INTO `folders` VALUES (5, 'Videos', NULL, '2024-12-24 23:12:08', '2024-12-24 23:12:08');
INSERT INTO `folders` VALUES (6, 'Works', 1, '2024-12-24 23:12:24', '2024-12-24 23:12:24');
INSERT INTO `folders` VALUES (7, 'Reports', 1, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (8, 'Invoices', 1, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (9, 'Plans', 1, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (10, 'Vacation', 2, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (11, 'Family', 2, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (12, 'Friends', 2, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (13, 'Rock', 3, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (14, 'Jazz', 3, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (15, 'Classical', 3, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (16, 'Software', 4, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (17, 'Ebooks', 4, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (18, 'Archives', 4, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (19, 'Movies', 5, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (20, 'Tutorials', 5, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (21, 'Clips', 5, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (22, 'Projects', 6, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (23, 'Clients', 6, '2024-12-24 23:14:15', '2024-12-24 23:14:15');
INSERT INTO `folders` VALUES (24, 'Documents', 6, '2024-12-24 23:14:15', '2024-12-24 23:14:15');

SET FOREIGN_KEY_CHECKS = 1;
