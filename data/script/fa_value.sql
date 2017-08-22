--
-- Структура таблицы `fa_value`
--

CREATE TABLE IF NOT EXISTS `fa_value` (
  `company_id` int(11) NOT NULL,
  `indicator_id` int(11) NOT NULL,
  `currency` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `value` varchar(32) DEFAULT NULL,
  UNIQUE KEY `company_id` (`company_id`,`indicator_id`,`currency`,`year`),
  KEY `company_id_2` (`company_id`),
  KEY `indicator_id` (`indicator_id`),
  KEY `currency` (`currency`),
  KEY `year` (`year`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
