DROP DATABASE IF EXISTS bexpert;
CREATE DATABASE IF NOT EXISTS bexpert;
USE bexpert;

DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar
(50) COLLATE utf8mb3_slovenian_ci,
  `fname` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `lname` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `email` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `phone` varchar
(200) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `Address` varchar
(200) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `bdate` date NOT NULL,
  `psw` varchar
(255) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `role` varchar
(200) COLLATE utf8mb3_slovenian_ci NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_slovenian_ci;

DROP TABLE IF EXISTS `expert`;
CREATE TABLE `expert`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `lname` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `about` varchar
(1000) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `edu_highschool` varchar
(200) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `edu_uni` varchar
(200) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `skills` varchar
(400) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `license` varchar
(200) COLLATE utf8mb3_slovenian_ci DEFAULT NULL,
  `email` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `linkedin` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `mobile_num` varchar
(200) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `pic_link` varchar
(500) COLLATE utf8mb3_slovenian_ci DEFAULT NULL,
  `bg_link` varchar
(500) COLLATE utf8mb3_slovenian_ci DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_slovenian_ci;

DROP TABLE IF EXISTS `login_info`;
CREATE TABLE `login_info`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar
(100) COLLATE utf8mb3_slovenian_ci NOT NULL,
  `psw` varchar
(255) COLLATE utf8mb3_slovenian_ci NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_slovenian_ci;

INSERT INTO `admin_info` (`id`,`username`, `fname`, `lname`, `email`, `phone`, `Address`, `bdate`, `psw`, `role`) VALUES
(1, 'navaluck020', 'Navaluck', 'Duwa', 'tanushka.duwa@outlook.com', '098-261-8964', 'Bangkok', '2003-09-01', 'Janice1234', 'Admin'),
(2, 'ramita018', 'Ramita', 'Deeprom', 'ramita.deeprom@gmail.com', '086-602-1559', 'Chonburi', '2003-02-26', 'Tingting1234', 'Admin'),
(3, 'phawida057', 'Phawida', 'Phungchuen', 'phawidabery@gmail.com', '083-291-4888', 'Suratthani', '2003-02-04', 'Berry1234', 'Admin'),
(4, 'burit079', 'Burit', 'Sihabut', 'burit.sih@gmail.com', '098-261-8964', 'Chonburi', '2002-11-27', 'Best1234', 'Admin'),
(5, 'suwiboon012', 'Suwiboon', 'Chamniwikaikangwan', 'suwiboon.cha@outlook.com', '062-548-8853', 'Hua-Hin', '2002-03-28', 'Pond1234', 'Admin');

INSERT INTO `expert` (`id`,`fname`,`lname`,`about`,`edu_highschool`, `edu_uni`, `skills`, `license`, `email`, `linkedin`, `mobile_num`, `pic_link`, `bg_link`) VALUES
(1, 'Navaluck', 'Duwa', 'Navaluck Duwa (Janice) a sophomore at the Faculty of ICT, Mahidol University. she is a detailed and responsible person also \na team player, where she serves as President of the MUICT Speakers Club. Janice is interested in Database where her expected major is \nDatabase and Intelligent Systems.', 'Chindamanee School English program', 'Faculty of ICT, Mahidol University', 'Soft Skills: Communication, Leadership, Public Speaking; Language Skills: English, Thai, Hindi, Punjabi; Computer Skills: HTML,CSS,C programming,Python; Data Area: SQL,ERD,Data analysis', NULL, 'tanushka.duwa@outlook.com', 'https://www.linkedin.com/in/navaluckduwa/', '098-261-8964', 'https://drive.google.com/uc?export=view&id=1rzSfO_M0B2pdBrRWPgrrNO89Z4e7rOve', NULL),
(2, 'Ramita', 'Deeprom', 'Ramita Deeprom (Tingting) a sophomore at the Faculty of ICT, Mahidol University, with a keen interest in Business Analyst\nand software. Her passion for learning and experimenting with new things extends beyond technology and includes business and psychology. \nHer expected major is Software Engineering.', 'Chonkanyanukoon School, Engineering and Applied Mathematics, English program', 'Faculty of ICT, Mahidol University', 'Soft Skills: Open minded, Collaboration, Adaptability, Leadership, Decision-Making, Growth mindset, Lifelong learning, Creativity; Language Skills: English, Thai; Computer Skills: HTML5, CSS, JS, C, Java, Python; Data Area: SQL, ERD, Business analysis', NULL, 'ramita.deeprom@gmail.com', 'https://www.linkedin.com/in/ramita-deeprom-tingting', '086-602-1559', 'https://drive.google.com/uc?export=view&id=1L93ySujh_CoF-RKcd_fn_lYKRJHYxI6O', NULL),
(3, 'Phawida', 'Phungchuen', 'Phawida Phungchuen (Berry) a sophomore at the Faculty of ICT, Mahidol University.She has a passion for programming \nstarted at a young age, and she achieved high scores on the projects in C, SQL and HTML. Her expected major is Database and Intelligent Systems.', 'Suratthani School English program', 'Faculty of ICT, Mahidol University', 'Soft Skills: Communication, Public Speaking; Language Skills: English, Thai,Japanese ,Computer Skills: HTML,CSS,C programming,Python; Data Area: SQL,ERD,Data analysis', NULL, 'phawidabery@gmail.com', 'https://www.linkedin.com/in/phawida Phungchuen /', '083-291-4888', 'https://drive.google.com/uc?export=view&id=1Kldb68Qs1Jg66yekVGhTUIRWvXmZkaCY', NULL),
(4, 'Burit', 'Sihabut', 'Burit Sihabut (Best) a sophomore at the Faculty of ICT, Mahidol University. He is a passionate software engineer who combines \nlogic and creativity to provide the best solutions possible. Best takes pride in their attention to detail, responsibility, critical thinking skills,\nand strong analytical abilities. His expected major is Software Engineering.', 'Assumption College (AC)', 'Faculty of ICT, Mahidol University', 'Soft Skills: Time Management, Responsibility, Public Speaking; Language Skills: English, Thai, Japan; Computer Skills: C programming, Java, Assembly, HTML, CSS, Javascript, Python, MySQL, R; Data Area: ERD Diagram, SQL, Data analysis', NULL, 'burit.sih@gmail.com', 'https://www.linkedin.com/in/burit-sihabut-best/', '098-839-6603', 'https://drive.google.com/uc?export=view&id=1kGC-zQpll7fLaMvZw7ZoJJWqe0CplsE2', NULL),
(5, 'Suwiboon', 'Chamniwikaikangwan', 'Suwiboon Chamniwikaikangwan (Pond) a sophomore at the Faculty of ICT, Mahidol University. He is an expert in graphic design where he had experience graphic design, video editing, web design, photography, short film production, streaming, and YouTube creation. Aside from that He has also developed valuable soft skill, programming, crirical thinking and public Speaking. His expected major is Multimedia', 'Hua Hin Vitthayalai School', 'Faculty of ICT, Mahidol University', 'Soft Skills: Photography, Graphic Design, Public Speaking; Language Skills: English, Thai, Japan; Computer Skills: C programming, Java, HTML, CSS, Javascript, Python; Data Area: SQL,ERD', NULL, 'swbpond@gmail.com', 'https://www.linkedin.com/in/suwiboon/', '062-548-8853', 'https://drive.google.com/uc?export=view&id=1366kzRVwQ3doo3OEjeHroJ0hGuXCN-Rt', NULL);

INSERT INTO `login_info` (`id`,`email`, `psw`) VALUES
(1, 'tanushka.duwa@outlook.com', 'Janice1234'),
(2, 'ramita.deeprom@gmail.com', 'Tingting1234'),
(3, 'phawidabery@gmail.com', 'Berry1234'),
(4, 'burit.sih@gmail.com', 'Best1234'),
(5, 'suwiboon.cha@outlook.com', 'Pond1234');