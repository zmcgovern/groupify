-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2021 at 12:05 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupify`
--

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `top_genre` varchar(30) NOT NULL,
  `genre_name` varchar(30) NOT NULL,
  `discord_link` varchar(50) NOT NULL,
  `genre_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`top_genre`, `genre_name`, `discord_link`, `genre_description`) VALUES
('country', 'country', 'https://discord.gg/vNAFEyTY42', 'You like songs that are largely string-accompanied, generally simple in form and harmony, and typified by romantic ballads accompanied by acoustic or electric sounds.'),
('edm', 'edm', 'https://discord.gg/6VB78AuhTU', 'You like songs that have a broad range of percussive electronic music genres made largely for nightclubs, raves, and festivals.'),
('hh', 'hip hop', 'https://discord.gg/DteZNeQFRw', 'You like songs that accompanies rapping and a rhythmic and rhyming speech that is chanted.'),
('house', 'house', 'https://discord.gg/PNdNvS5RF9', 'You like songs that are electronic dance music characterized by a repetitive four-on-the-floor beat and a typical tempo of 120 to 130 beats per minute. House has had a large impact on pop and dance music.'),
('indie', 'indie', 'https://discord.gg/gPAQYadbYb', 'You are independent in music and listen to songs produced independently from commercial record labels or their subsidiaries.'),
('pop', 'pop', 'https://discord.gg/HfWBQMyjNA', 'You like songs that have a good rhythm, catchy melody, and are easy to remember and sing along to.'),
('rap', 'rap', 'https://discord.gg/9sJzC3zRpx', 'You like songs that have a rhythmic and rhyming speech that is chanted.'),
('rb', 'R&B', 'https://discord.gg/jRcx2g28Ty', 'You like songs that combine rhythm and blues with elements of pop, soul, funk, hip hop and electronic music. '),
('rock', 'rock', 'https://discord.gg/vNBejMnPNT', 'You like songs that mostly use the electric guitar as part of a rock group with bass guitar and drums.'),
('unique', 'unique', 'https://discord.gg/3t4C7XvFW2', 'Like the songs you listen to, you push the boundries of what is normal.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `accessToken` varchar(50) NOT NULL,
  `refreshToken` varchar(50) NOT NULL,
  `top_genre` varchar(30) NOT NULL,
  `top_artists` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `accessToken`, `refreshToken`, `top_genre`, `top_artists`) VALUES
('bellalabrasca', 'bellalabrasca', 'bellybeans234@gmail.com', 'BQASEyzkLT-P1v298NCxCDYeltuKDfudyeJcWXKSL2NDPSmc60', 'AQBVor9WovXrzMJcHUh_yKQe2Gk1WLbHTvFpoBmdC9NUwzR168', 'rock', ''),
('braden.gogin', 'braden.gogin', 'bgogin@wisc.edu', '', '', '', ''),
('cr709fzazs8tvbwqb3ce6kzyo', 'Andrew', 'abresina@wisc.edu', 'BQC-9opBEZ4ZqvUQGTpGm4KIpKT_XR9rMY-y-369TXkb8cRUXJ', 'AQBx1vLrckfihU2MzwPldBNiHyF0TLItp0UhSPUYPVnMg2yu5N', 'pop', ''),
('kitkat12322', 'kitkat12322', 'kitkat12322@gmail.com', 'BQCqS1iobl_xS9vW6ioYgSzkDCX5MVOYmox4DnoRStDEX7CXj_', 'AQBJLZpDJdnLAW-nZkMKgbjiLDPouOmKQLeI8OAe1W5af9YeIf', 'indie', ''),
('zachmcgovern7', 'zachmcgovern7', 'zmcgovern@wisc.edu', 'BQAiByUIAGv-JI9K8YB1LaatBwNF3TBERE-KIPdwvWWchyjcjZ', 'AQCIvCgdXFjdwW3lteoBBCNTsboh0kM9hQ6Db4p5YBB_AlqZoa', 'pop', '[\"Glass Animals\",\"Quinn XCII\",\"Joji\",\"BENEE\",\"Aries\",\"Christian French\",\"Dominic Fike\",\"Tame Impala\",\"slowthai\",\"Aminé\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`top_genre`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `top_genre` (`top_genre`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`top_genre`) REFERENCES `genres` (`top_genre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
