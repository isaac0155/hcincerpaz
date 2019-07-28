create database hcincerpaz;
 use hcincerpaz;

create table cargo
(
  id_cargo integer primary key not null auto_increment,
  cargo varchar(70)
);
create table personal
(
  id_personal integer primary key not null auto_increment,
  nombre varchar(70),
  apellidos varchar(70),
  ci integer,
  correo varchar(70),
  fecha_nacimiento date,
  id_cargo integer not null,
  foreign key (id_cargo)references cargo(id_cargo),
  actividad integer
);
create table empresa
(
  id_empresa integer primary key  not null auto_increment,
  nombre varchar(70),
  nit integer,
  telefono varchar(70),
  direccion text
);
create table proveedor
(
  id_proveedor integer primary key not null auto_increment,
  nombre varchar(70),
  apellido integer,
  telefono varchar(70),
  ci integer,
  id_empresa integer not null,
  foreign key (id_empresa)references empresa(id_empresa)
);
create table cliente
(
  id_cliente integer primary key not null auto_increment,
  nombre varchar(70),
  apellido integer,
  telefono varchar(70),
  ci integer
);
CREATE TABLE venta
(
  id_venta integer not null primary key auto_increment,
  fecha varchar(50),
  id_cliente integer not null ,
  foreign key (id_cliente)references cliente(id_cliente),
  direccion_entrega text,
  id_personal integer not null ,
  foreign key (id_personal)references personal(id_personal),
  total double
);
create table tipo_producto
(
  id_tipo_producto integer not null primary key auto_increment,
  nombre_tipo varchar(70)
);
create table categoria_producto
(
  id_categoria_producto integer not null auto_increment primary key ,
  nombre_categoria varchar(70),
  id_tipo_producto integer not null,
  foreign key (id_tipo_producto)references tipo_producto(id_tipo_producto)
);
create table producto
(
  id_producto integer not null primary key auto_increment,
  id_categoria_producto integer not null ,
  id_tipo_producto integer not null ,
  id_empresa integer not null ,
  foreign key (id_categoria_producto)references categoria_producto(id_categoria_producto),
  foreign key (id_tipo_producto)references tipo_producto(id_tipo_producto),
  foreign key (id_empresa)references empresa(id_empresa),
  precio_compra double,
  precio_venta double,
  stock integer
);
create table detalle
(
  id_detalle integer not null primary key auto_increment,
  id_venta integer not null,
  id_producto integer not null ,
  foreign key (id_venta)references venta(id_venta),
  foreign key (id_producto)references producto(id_producto),
  cantidad_total integer,
  cantidad_entregada integer
);
create table compra_proveedor
(
  id_compra_proveedor integer not null primary key auto_increment,
  id_proveedor integer not null ,
  fecha date,
  total double,
  foreign key (id_proveedor)references proveedor(id_proveedor)
);
create table detalle_compra_proveedor
(
  id_detalle_compra_proveedor integer not null primary key auto_increment,
  id_producto integer not null ,
  id_compra_proveedor integer not null,
  cantidad_total_compra integer,
  cantidad_entregada_compra integer not null ,
  foreign key (id_producto)references producto(id_producto),
  foreign key (id_compra_proveedor)references compra_proveedor(id_compra_proveedor)
);
