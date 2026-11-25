-- Additive Nestroam Holidays blog CMS migration.
-- Run this once against the same database used by the existing admin/package APIs.

CREATE TABLE IF NOT EXISTS `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(180) NOT NULL,
  `slug` varchar(180) NOT NULL,
  `excerpt` varchar(600) NOT NULL DEFAULT '',
  `content` longtext NOT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `featured_image_alt` varchar(255) DEFAULT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'Travel Guides',
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (`tags` IS NULL OR json_valid(`tags`)),
  `meta_title` varchar(180) DEFAULT NULL,
  `meta_description` varchar(320) DEFAULT NULL,
  `focus_keyword` varchar(180) DEFAULT NULL,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `author_name` varchar(120) NOT NULL DEFAULT 'Nestroam Holidays',
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_blogs_slug` (`slug`),
  KEY `idx_blogs_public` (`status`,`published_at`),
  KEY `idx_blogs_category` (`category`,`status`),
  KEY `idx_blogs_updated` (`updated_at`),
  CONSTRAINT `fk_blogs_author` FOREIGN KEY (`author_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
