DROP TABLE student_question;
DROP TABLE question;
DROP TABLE student;
DROP TABLE quiz; 
DROP TABLE teacher; 

CREATE TABLE teacher (
    teacherID INT PRIMARY KEY AUTO_INCREMENT, 
    firstName VARCHAR(80) NOT NULL,
    lastName VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(12) NOT NULL, 
    userType VARCHAR(1) DEFAULT 'T'
);

CREATE TABLE student (
    studentID INT PRIMARY KEY AUTO_INCREMENT, 
    firstName VARCHAR(80) NOT NULL,
    lastName VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(12) NOT NULL, 
    userType VARCHAR(1) DEFAULT 'S'
);

CREATE TABLE quiz (
    quizID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    numQuestion INT NOT NULL DEFAULT 0, 
    dateCreated DATETIME NOT NULL,
    teacherID INT,
    published VARCHAR(1) DEFAULT 'N',
    FOREIGN KEY (teacherID) 
        REFERENCES teacher(teacherID)
);

CREATE TABLE question (
    questionID INT PRIMARY KEY AUTO_INCREMENT, 
    type VARCHAR(2) NOT NULL, 
    question VARCHAR(80) NOT NULL, 
    answer VARCHAR(80) NOT NULL, 
    choiceA VARCHAR(80) DEFAULT NULL, 
    choiceB VARCHAR(80) DEFAULT NULL, 
    choiceC VARCHAR(80) DEFAULT NULL, 
    quizID INT NOT NULL, 
    FOREIGN KEY (quizID)
        REFERENCES quiz (quizID)
        ON DELETE CASCADE
);

CREATE TABLE student_question (
    studentID INT NOT NULL, 
    questionID INT NOT NULL, 
    studentAnswer VARCHAR(80) NOT NULL, 
    questionPT INT NOT NULL DEFAULT 1, 
    dateTaken DATETIME NOT NULL,
    quizID INT NOT NULL,
    questionOrder INT NOT NULL DEFAULT 0,
    PRIMARY KEY (studentID, questionID),
    FOREIGN KEY (studentID)
        REFERENCES student(studentID)
        ON DELETE CASCADE, 
    FOREIGN KEY(quizID)
        REFERENCES quiz(quizID), 
    FOREIGN KEY(questionID)
        REFERENCES question(questionID)
);

ALTER table quiz ADD CONSTRAINT unique_quizName UNIQUE(teacherID, name);

