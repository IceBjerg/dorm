-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Ápr 24. 09:48
-- Kiszolgáló verziója: 10.4.8-MariaDB
-- PHP verzió: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `dorm`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dorm_keys`
--

CREATE TABLE `dorm_keys` (
  `id` tinyint(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `dorm_keys` (`id`, `description`) VALUES
(1, 'key1'), 
(2, 'key2'), 
(3, 'key3'), 
(4, 'key4'), 
(5, 'key5'), 
(6, 'key6'), 
(7, 'key7');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dorm_key_usage`
--

CREATE TABLE `dorm_key_usage` (
  `id` int(11) NOT NULL,
  `key_id` tinyint(4) NOT NULL,
  `user` varchar(20) COLLATE utf8_bin NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `accepted_by` varchar(20) COLLATE utf8_bin NOT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `ended_by` varchar(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `error_reports`
--

CREATE TABLE `error_reports` (
  `id` int(11) NOT NULL,
  `reporter` varchar(20) COLLATE utf8_bin NOT NULL,
  `report_type` varchar(20) COLLATE utf8_bin NOT NULL,
  `report_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `translate_needed` tinyint(1) NOT NULL,
  `issue` text COLLATE utf8_bin NOT NULL,
  `location` varchar(50) COLLATE utf8_bin NOT NULL,
  `translated_by` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `translated_text` text COLLATE utf8_bin DEFAULT NULL,
  `translate_time` timestamp NULL DEFAULT NULL,
  `solved_by` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `solved_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event_organizer_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `event_organizer_neptun` varchar(20) COLLATE utf8_bin NOT NULL,
  `event_organizer_email` varchar(255) COLLATE utf8_bin NOT NULL,
  `event_organizer_tel` varchar(20) COLLATE utf8_bin NOT NULL,
  `event_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `participant_num` varchar(255) COLLATE utf8_bin NOT NULL,
  `event_time` varchar(255) COLLATE utf8_bin NOT NULL,
  `event_description` text COLLATE utf8_bin NOT NULL,
  `event_location` varchar(255) COLLATE utf8_bin NOT NULL,
  `participants_dorm` text COLLATE utf8_bin NOT NULL,
  `participants_out` text COLLATE utf8_bin NOT NULL,
  `approved_ov` enum('OK','NO','UNSET') COLLATE utf8_bin NOT NULL DEFAULT 'UNSET',
  `approved_hok` enum('OK','NO','UNSET') COLLATE utf8_bin NOT NULL DEFAULT 'UNSET'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `reporter` varchar(20) COLLATE utf8_bin NOT NULL,
  `host_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `guest_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `guest_id` varchar(50) COLLATE utf8_bin NOT NULL,
  `start` timestamp NOT NULL DEFAULT current_timestamp(),
  `end` timestamp NULL DEFAULT NULL,
  `ended_by` varchar(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `newpw`
--

CREATE TABLE `newpw` (
  `user_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `token` varchar(32) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- A tábla adatainak kiíratása `permissions`
--

INSERT INTO `permissions` (`id`, `description`) VALUES
(0, 'Kollégista'),
(1, 'Felhasználókezelés'),
(2, 'Szoba kezelés'),
(3, 'Szobabeosztás'),
(4, 'Jogosultságok'),
(5, 'Fordítók'),
(6, 'Karbantartók'),
(7, 'Recepció'),
(8, 'Események megtekintése'),
(9, 'Osztályvezető'),
(10, 'Diákbizottsági elnök');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rooms`
--

CREATE TABLE `rooms` (
  `id` varchar(20) COLLATE utf8_bin NOT NULL,
  `building` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` varchar(20) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `pw` varchar(255) COLLATE utf8_bin NOT NULL,
  `room_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `nationality` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT '',
  `gender` enum('male','female') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `pw`, `room_id`, `nationality`, `gender`) VALUES
('admin', 'Admin', 'none', '$2y$12$SqPj2gMqDqV3uIbeE85i3Oupjx7PZuygVRlRQtz3YQYGznItDS2QC', NULL, '', 'male');
-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_permissions`
--

CREATE TABLE `user_permissions` (
  `user_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- A tábla adatainak kiíratása `user_permissions`
--

INSERT INTO `user_permissions` (`user_id`, `permission_id`) VALUES
('admin', 0),
('admin', 1),
('admin', 2),
('admin', 3),
('admin', 4),
('admin', 5),
('admin', 6),
('admin', 7),
('admin', 8),
('admin', 9),
('admin', 10);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `dorm_keys`
--
ALTER TABLE `dorm_keys`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `dorm_key_usage`
--
ALTER TABLE `dorm_key_usage`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `error_reports`
--
ALTER TABLE `error_reports`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `newpw`
--
ALTER TABLE `newpw`
  ADD PRIMARY KEY (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `room_id` (`room_id`);

--
-- A tábla indexei `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD PRIMARY KEY (`user_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `dorm_keys`
--
ALTER TABLE `dorm_keys`
  MODIFY `id` tinyint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `dorm_key_usage`
--
ALTER TABLE `dorm_key_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `error_reports`
--
ALTER TABLE `error_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `newpw`
--
ALTER TABLE `newpw`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Megkötések a táblához `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
