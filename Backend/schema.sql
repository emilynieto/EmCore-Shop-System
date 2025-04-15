CREATE DATABASE htms_system;

USE htms_system;

create table Company(
CompanyID int auto_increment primary key,
CompanyName varchar(255) not null unique,
address text not null,
paymentEmail varchar(255) not null unique,
BillTo Text not null,
ShipTo text not null
);

create table Estimate(
EstimateID int auto_increment primary key,
PartNo varchar(50) not null,
CompanyID int not null,
partDescription text,
QTY int not null,
Price decimal(10,2) not null,
DateCreated date not null default (CURDATE()),
foreign key(CompanyID) references Company(CompanyID)

);

create table WorkOrder(
WorkOrderID int auto_increment primary key,
EstimateID int not null,
QTY int not null,
Price decimal(10,2) not null,
foreign key(EstimateID) references Estimate(EstimateID)
);

create table Invoice(
InvoiceID int auto_increment primary key,
ShipmentNo int not null,
InvoiceDate date not null default (curdate()),
foreign	key(ShipmentNo) references PackingList(ShipmentNo)
);

create table PackingList(
ShipmentNo int auto_increment primary key,
WorkOrderID int not null,
ShipmentDate date not null,
foreign key(WorkOrderID) references WorkOrder(WorkOrderID)
);

#change starting value of all of the autoincrements when ready for use

Create table User(
UserID int auto_increment primary key,
Username varchar(50) not null unique,
Password varchar(50) not null,
role ENUM('admin', 'user') default 'user',
DateCreated date not null default (CURDATE())
)