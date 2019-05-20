-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2018 at 07:47 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blossom_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `senderemail` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `receiveremail` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`senderemail`, `receiveremail`, `content`) VALUES
('npdung@gmail.com', 'tadashii1417@gmail.com', 'Hello'),
('tadashii1417@gmail.com', 'npdung@gmail.com', 'Hi'),
('tadashii1417@gmail.com', 'npdung@gmail.com', 'aa'),
('npdung@gmail.com', 'undefined', 'File: app.js</br><a download=app.js href=/uploads/app.js>Click here to download</a>'),
('binh@gmail.com', 'tadashii1417@gmail.com', 'a'),
('binh@gmail.com', 'npdung@gmail.com', 'b'),
('npdung@gmail.com', 'tadashii1417@gmail.com', 'ee'),
('npdung@gmail.com', 'tadashii1417@gmail.com', 'dsadasdas'),
('npdung@gmail.com', 'tadashii1417@gmail.com', 'dasdas'),
('npdung@gmail.com', 'tadashii1417@gmail.com', 'dsdas'),
('npdung@gmail.com', 'tadashii1417@gmail.com', 'e'),
('tadashii1417@gmail.com', 'npdung@gmail.com', '2'),
('binh@gmail.com', 'npdung@gmail.com', 'aaa'),
('binh@gmail.com', 'npdung@gmail.com', 'File: 589.jpg</br><a download=589.jpg href=uploads/589.jpg>Click here to download</a>'),
('tadashii1417@gmail.com', 'npdung@gmail.com', 'dsa'),
('tadashii1417@gmail.com', 'npdung@gmail.com', '234');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
