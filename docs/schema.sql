DROP DATABASE IF EXISTS library_managment_system;


create database library_managment_system;

create table member(
member_id int auto_increment primary key,
first_name varchar(30),
last_name varchar (30),
phone_number varchar(10),
email varchar(100),
address varchar(300)
);

create table book(
book_id int auto_increment primary key,
book_name varchar(60),
author varchar(100),
publishing_year int(4),
member_ID int not null ,
FOREIGN KEY(member_ID) REFERENCES member(member_id),
category_id int,
FOREIGN KEY(category_id) REFERENCES category(category_ID),
borrow_date date
);

create table category (
category_ID int auto_increment primary key,
category_name varchar(60),
category_des varchar(60)
)