CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tour_packages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  short_description VARCHAR(500) NULL,
  description TEXT NULL,
  destination VARCHAR(180) NULL,
  duration VARCHAR(80) NULL,
  price DECIMAL(10,2) NULL,
  price_label VARCHAR(80) NULL,
  cover_image VARCHAR(500) NOT NULL,
  itinerary JSON NULL,
  inclusions JSON NULL,
  exclusions JSON NULL,
  gallery JSON NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  display_order INT NOT NULL DEFAULT 0,
  meta_title VARCHAR(180) NULL,
  meta_description VARCHAR(320) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_packages_public (status, is_featured, display_order),
  INDEX idx_packages_updated (updated_at)
);
