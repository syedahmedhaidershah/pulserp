-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2019 at 09:01 AM
-- Server version: 5.7.22-log
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pulserp`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consumer_sales`
--

CREATE TABLE `consumer_sales` (
  `invoice_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `deposit` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `discounts` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `consumer_sales`
--

INSERT INTO `consumer_sales` (`invoice_id`, `customer_id`, `item_id`, `quantity`, `deposit`, `balance`, `discounts`, `date_time`) VALUES
(12, 3, 22, 11, 25, 492, '4_', '2019-03-25 12:04:00'),
(13, 4, 22, 21, 2, 1065, '4_', '2019-03-25 12:24:49'),
(14, 4, 24, 50, 0, 2500, '', '2019-03-25 12:46:43'),
(15, 4, 23, 50, 100, 1150, '', '2019-03-25 12:46:43'),
(16, 4, 24, 23, 0, 1150, '', '2019-03-25 12:49:36'),
(17, 3, 24, 100, 0, 5000, '', '2019-03-25 12:53:08');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nic` bigint(14) NOT NULL,
  `empty` int(11) NOT NULL,
  `contact_no` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `nic`, `empty`, `contact_no`) VALUES
(3, 'Ahmed Haider', 4210117961449, 0, 3003573769),
(4, 'Walk-in Customer', 0, 0, 0),
(5, 'murtaza', 4210140392621, 0, 3343254171);

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `discount_id` int(11) NOT NULL,
  `scheme_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deduction` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE `information` (
  `uid` int(11) NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`uid`, `data`) VALUES
(19, '{\'name\':\'Pulsate Technologies\',\'employeeCount\':21,\'yourShare\':20,\'yourPosition\':\'own\'}');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `consumer` tinyint(1) NOT NULL DEFAULT '0',
  `rental` tinyint(1) NOT NULL DEFAULT '0',
  `cost` int(11) NOT NULL,
  `selling` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `empty` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `name`, `consumer`, `rental`, `cost`, `selling`, `quantity`, `empty`) VALUES
(23, 'pepsi 250ml', 1, 0, 20, 25, 200, 250),
(24, 'pepsi 500ml', 1, 0, 45, 50, 327, -1),
(25, 'slice 500ml', 1, 0, 45, 50, 100, -1);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `package_id` int(11) NOT NULL,
  `name` varchar(24) NOT NULL,
  `color` varchar(6) NOT NULL,
  `price` double(6,2) NOT NULL,
  `description` text NOT NULL,
  `method` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`package_id`, `name`, `color`, `price`, `description`, `method`) VALUES
(1, 'Inventora', '552387', 5.99, '{\"data\":[{\"cloud\":false},{\"inventory\":true},{\"sales\":true}]}', 1),
(2, 'Inventora Plus', '008800', 39.99, '{\"data\":[{\"cloud\":true},{\"inventory\":true},{\"sales\":true}]}', 0),
(3, 'Accountant PRO', '0089cf', 71.99, '{\"data\":[{\"cloud\":false},{\"acc\":true},{\"management\":true},{\"storage\":false}]}', 0),
(4, 'ERP Plus', 'd6960b', 129.99, '{\"data\":[{\"cloud\":true},{\"acc\":true},{\"management\":true},{\"storage\":true}]}', 0),
(1, 'Inventora', '552387', 5.99, '{\"data\":[{\"cloud\":false},{\"inventory\":true},{\"sales\":true}]}', 1),
(2, 'Inventora Plus', '008800', 39.99, '{\"data\":[{\"cloud\":true},{\"inventory\":true},{\"sales\":true}]}', 0),
(3, 'Accountant PRO', '0089cf', 71.99, '{\"data\":[{\"cloud\":false},{\"acc\":true},{\"management\":true},{\"storage\":false}]}', 0),
(4, 'ERP Plus', 'd6960b', 129.99, '{\"data\":[{\"cloud\":true},{\"acc\":true},{\"management\":true},{\"storage\":true}]}', 0);

-- --------------------------------------------------------

--
-- Table structure for table `rental_sales`
--

CREATE TABLE `rental_sales` (
  `invoice_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `deposit` int(11) NOT NULL,
  `total_paid` int(11) NOT NULL,
  `last_paid` int(11) NOT NULL,
  `return_date` datetime NOT NULL,
  `returned` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(24) NOT NULL,
  `password` varchar(48) NOT NULL,
  `firstname` varchar(16) NOT NULL,
  `lastname` varchar(16) NOT NULL,
  `email` varchar(48) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `package` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `firstname`, `lastname`, `email`, `phone`, `package`) VALUES
(19, 'sahs9996', 'b4af804009cb036a4ccdc33431ef9ac9', 'Ahmed', 'Haider', 'haidershah@pulsatechs.com', '03003573769', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `consumer_sales`
--
ALTER TABLE `consumer_sales`
  ADD PRIMARY KEY (`invoice_id`,`customer_id`,`item_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discount_id`);

--
-- Indexes for table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `rental_sales`
--
ALTER TABLE `rental_sales`
  ADD PRIMARY KEY (`invoice_id`,`customer_id`,`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consumer_sales`
--
ALTER TABLE `consumer_sales`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
