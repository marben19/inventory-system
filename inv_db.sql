-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2024 at 08:12 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_locations`
--

CREATE TABLE `tbl_locations` (
  `id` int(11) NOT NULL,
  `location` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_locations`
--

INSERT INTO `tbl_locations` (`id`, `location`) VALUES
(1, 'CSS 1'),
(2, 'CSS 2'),
(3, 'TVET Office'),
(4, '2D Animation Lab'),
(5, 'VGD');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchased`
--

CREATE TABLE `tbl_purchased` (
  `id` int(11) NOT NULL,
  `product` varchar(225) DEFAULT NULL,
  `description` varchar(225) DEFAULT NULL,
  `serial_no` varchar(255) DEFAULT NULL,
  `amount` int(255) NOT NULL DEFAULT 0,
  `quantity` int(111) NOT NULL DEFAULT 0,
  `category` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `date_purchased` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_purchased`
--

INSERT INTO `tbl_purchased` (`id`, `product`, `description`, `serial_no`, `amount`, `quantity`, `category`, `img`, `date_purchased`) VALUES
(4, 'Tushiba1111', 'asdasd1111', 'NrnajUuTt1', 200, 2, 'Tool', 'products/download.png', '2024-06-11 09:26:05'),
(5, 'Monitor', 'asdasdasd', '20002', 200, 12, 'Equipment', 'products/3.png', '2024-06-11 13:35:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transfered`
--

CREATE TABLE `tbl_transfered` (
  `id` int(11) NOT NULL,
  `product_id` int(225) NOT NULL DEFAULT 0,
  `quantity` int(225) NOT NULL DEFAULT 0,
  `location` varchar(111) DEFAULT NULL,
  `status` varchar(225) DEFAULT NULL,
  `date_inserted` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transfered`
--

INSERT INTO `tbl_transfered` (`id`, `product_id`, `quantity`, `location`, `status`, `date_inserted`) VALUES
(9, 4, 1, 'CSS 1', 'Functional', '2024-06-11 09:26:18'),
(10, 4, 2, 'CSS 2', 'Select Status', '2024-06-11 13:00:24'),
(11, 5, 2, 'CSS 1', 'Functional', '2024-06-11 13:35:20'),
(12, 5, 3, '2D Animation Lab', 'Non-functional', '2024-06-11 14:11:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(249) NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `status` tinyint(2) UNSIGNED NOT NULL DEFAULT 0,
  `verified` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `resettable` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `roles_mask` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `registered` int(10) UNSIGNED NOT NULL,
  `last_login` int(10) UNSIGNED DEFAULT NULL,
  `force_logout` mediumint(7) UNSIGNED NOT NULL DEFAULT 0,
  `role` int(21) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `status`, `verified`, `resettable`, `roles_mask`, `registered`, `last_login`, `force_logout`, `role`) VALUES
(1, 'admin@gmail.com', '$2y$10$wpROkKeYYNpqbxxLnLGQJe7l3QbbG40JnowyacPCWocTeOkIHcqfC', 'Admin Master', 0, 1, 1, 0, 1705892221, 1718083399, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_confirmations`
--

CREATE TABLE `users_confirmations` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(249) NOT NULL,
  `selector` varchar(16) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `token` varchar(255) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_remembered`
--

CREATE TABLE `users_remembered` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `selector` varchar(24) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `token` varchar(255) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_resets`
--

CREATE TABLE `users_resets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `selector` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `token` varchar(255) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_throttling`
--

CREATE TABLE `users_throttling` (
  `bucket` varchar(44) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `tokens` float UNSIGNED NOT NULL,
  `replenished_at` int(10) UNSIGNED NOT NULL,
  `expires_at` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_throttling`
--

INSERT INTO `users_throttling` (`bucket`, `tokens`, `replenished_at`, `expires_at`) VALUES
('ejWtPDKvxt-q7LZ3mFjzUoIWKJYzu47igC8Jd9mffFk', 72.03, 1718083399, 1718623399),
('Jjl8HEbTSJpZBWoyXOajJXqciuUdngUbah061jwhliE', 19, 1710381858, 1710417858),
('PjjNRSnirFPbKG1QbUDTnHEQyqaRlS59vSGT-2LqeBI', 499, 1710381858, 1710554658),
('QduM75nGblH2CDKFyk0QeukPOwuEVDAUFE54ITnHM38', 74, 1716186620, 1716726620);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_locations`
--
ALTER TABLE `tbl_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_purchased`
--
ALTER TABLE `tbl_purchased`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_transfered`
--
ALTER TABLE `tbl_transfered`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_confirmations`
--
ALTER TABLE `users_confirmations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `selector` (`selector`),
  ADD KEY `email_expires` (`email`,`expires`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users_remembered`
--
ALTER TABLE `users_remembered`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `selector` (`selector`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `users_resets`
--
ALTER TABLE `users_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `selector` (`selector`),
  ADD KEY `user_expires` (`user`,`expires`);

--
-- Indexes for table `users_throttling`
--
ALTER TABLE `users_throttling`
  ADD PRIMARY KEY (`bucket`),
  ADD KEY `expires_at` (`expires_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_locations`
--
ALTER TABLE `tbl_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_purchased`
--
ALTER TABLE `tbl_purchased`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_transfered`
--
ALTER TABLE `tbl_transfered`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_confirmations`
--
ALTER TABLE `users_confirmations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_remembered`
--
ALTER TABLE `users_remembered`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_resets`
--
ALTER TABLE `users_resets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
