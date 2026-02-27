CREATE TABLE IF NOT EXISTS cat_record (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  guild_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NOT NULL,
  type TINYINT NOT NULL,
  draw_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_cat_record_user_guild (user_id, guild_id),
  INDEX idx_cat_record_user_guild_draw_time (user_id, guild_id, draw_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
