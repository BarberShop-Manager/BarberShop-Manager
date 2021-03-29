/* 
Criando o banco de dados
*/
create database db_bsm
default character set utf8
default collate utf8_general_ci;

/* 
Ativando o banco de dados
*/
use db_bsm;

/* 
Criando a tabela de usuário
*/
create table users (
user_id int not null auto_increment unique,
_name varchar(30) not null,
_username varchar(30) not null,
_email varchar(60) not null unique,
_cpf int(11) unique,
_date date,
_password varchar(100) not null,
_telephone int(12),
_nivel int(0)
);

/* 
Criando a tabela de perfil funcionario
*/
create table _profile_employee (
profileemployee_id int not null auto_increment unique,
user_id int,
_img longblob,
_description varchar(300),
_stars int(1),
_workdays int(2),
constraint fk_ProfileemployeeUser foreign key (user_id) references users (user_id)
);
/* 
Criando a tabela de perfil cliente
*/
create table _profile_client (
profileclient_id int not null auto_increment unique,
user_id int,
_img longblob,
_description varchar(300),
constraint fk_ProfileclientUser foreign key (user_id) references users (user_id)
);
/* 
Criando a tabela de pesquisa de serviço
*/
create table search_service (
service_id int not null auto_increment unique,
_type_service varchar(30),
_value decimal(5,2) 
);
/* 
Criando a tabela de controle de caixa
*/
create table box_control (
box_id int not null auto_increment unique,
user_id int,
_machine int(1),
_scissors int(1),
_scissors_machine int(1),
_start date,
_end date,
_title varchar(20),
_color varchar(20),
constraint fk_BoxControlUser foreign key (user_id) references users (user_id)
);
/* 
Criando a tabela de negocio
*/
create table business (
schedule_id int not null auto_increment unique,
user_id int,
service_id int,
box_id int,
_hour decimal(4,2),
_telephone int(12),
_description varchar(300),
constraint fk_BusinessUser foreign key (user_id) references users (user_id),
constraint fk_BusinessService foreign key (service_id) references search_service (service_id),
constraint fk_BusinessBox foreign key (box_id) references box_control (box_id)
);
/* 
Criando a tabela de feedback
*/
create table feedback (
avalia_id int not null auto_increment unique,
schedule_id int,
profile_id int,
_description_notification varchar(300),
constraint fk_FeedbackSchedule foreign key (schedule_id) references business (schedule_id),
constraint fk_FeedbackProfile foreign key (profile_id) references _profile_ (profile_id)
);
/* 
Verificando a configuração das tabelas
*/
desc users;
desc _profile_client;
desc _profile_employee;
desc search_service;
desc box_control;
desc business;
desc feedback;
/*
testando as tabelas
*/
insert into users 
values
(default,"2212434","gumeta","b12ewqe333212ola@gmail.com","9831321","1990-12-01",MD5("123"),"21312321","0"),
(default,"2212434","gumeta","mowb12ewqe333212ola@gmail.com","8131321","1990-12-01",MD5("123"),"21312321","1"),
(default,"2212434","gumeta","mamowbwqe333212ola@gmail.com","9813132","1990-12-01",MD5("123"),"21312321","2");

insert into _profile_client
values
(default,default,"","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
(default,default,"","bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"),
(default,default,"","cccccccccccccccccccccccccccccccccccccccccccccc");

insert into _profile_employee
values
(default,default,"","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","5","20"),
(default,default,"","bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","1","23"),
(default,default,"","cccccccccccccccccccccccccccccccccccccccccccccc","0","10");

select * from users;
select * from _profile_client;
select * from _profile_employee;

select users.user_id, _profile_employee.profileemployee_id, _profile_employee.level_profile, users._nivel
from users inner join _profile_employee
on _profile_employee.profileemployee_id = users.user_id where users._nivel=1;

drop table _profile_employee;
drop table _profile_client;

alter table _profile_client
add column level_profile int(1) default "2";

alter table _profile_employee
add column level_profile int(1) default "1";





