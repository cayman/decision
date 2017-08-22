--
-- Структура таблицы `fa_indicator`
--

CREATE TABLE IF NOT EXISTS `fa_indicator` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `unit` varchar(16) DEFAULT NULL,
  `unit2` varchar(16) DEFAULT NULL,
  `quantity` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251 COMMENT='Финансовые показатели';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
