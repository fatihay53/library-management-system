DROP DATABASE IF EXISTS library_managment_system;

create database library_managment_system;
use library_managment_system;


create table member(
memberID int auto_increment primary key,
firstName varchar(30),
lastName varchar (30),
phoneNumber varchar(10),
email varchar(100),
address varchar(300)
);

create table book(
bookID int auto_increment primary key,
bookName varchar(60),
author varchar(100),
publishingYear int(4),
memberID int null ,
FOREIGN KEY(memberID) REFERENCES member(memberID) on delete set null,
categoryID int null,
FOREIGN KEY(categoryID) REFERENCES category(categoryID) on delete set null,
borrowDate date
);

create table category (
categoryID int auto_increment primary key,
categoryName varchar(60),
categoryDes varchar(300)
);




