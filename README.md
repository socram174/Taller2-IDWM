
# Instrucciones de uso

Para iniciar el backend y el frontend se necesita lo siguiente:



# Instalaciones obligatorias
Como respaldo comparto esta carpeta de google drive con imagenes y comentarios en las mismas imagenes de como fui instalando cada programa requerido en una maquina virtual con windows 11 desde 0.

Tambien hay registro de la instalacion, configuracion y ejecucion de la parte web y la api.

https://drive.google.com/drive/folders/1a0_NFVEGsPihNT9BanOKycUOB2mChhoD?usp=sharing

## Instalar en el siguiente orden

### Se puede hacer click en los nombres para ir a la pagina de descarga correspondiente.

#### 1- [NodeJS](https://nodejs.org/en/)
La version current: 21.3.0 al momento de hacer el readme.

Una ves iniciado el instalador hacer click en siguiente hasta llegar a una ventana en la que aparece una opcion en donde se pide instalar chocolatey, y seleccionarla:

https://drive.google.com/file/d/1j3g-FQwF8ihNeiDYo0YeBOPsddGpEX6t/view

Seguir haciendo click a siguiente hasta que se abra una consola en la que se pide un par de veces presionar cualquier tecla, hasta que pida permiso para abrir un powershell y continuar con la instalacion:

https://drive.google.com/file/d/17JtyI-UoSyjMuqzZfCpXxge_6uFJiqdt/view
https://drive.google.com/file/d/1vq0IYomako_GneL4AX-PchvoYsMhNDW-/view

Desde aqui esperar a que termine la instalacion

#### 2- [VS Code](https://code.visualstudio.com/)
En la ventana de instalacion, al llegar a Select additional tasks dejar lo que viene predeterminado:

https://drive.google.com/file/d/1siDOTktethEyZA3jQ1gIDbRW5hE_-Tx2/view


#### 3- [Git](https://git-scm.com/download/win)
En la ventana de instalacion, al llegar a Choosing the default editor used by git, seleccionar use visual studio code as git's default editor:

https://drive.google.com/file/d/1O-iFW7-k26FTH7w2R8ftYNXtbAKUYx7F/view

Luego el resto de pasos es simplemente dejar todas las configuraciones predeterminadas haciendo click en next hasta terminar la instalacion.

https://drive.google.com/drive/folders/1yx8ojlO5nGDMXOXNYozKmt-9fvXD4DbB?usp=drive_link

#### 4- [Community server de MongoDB](https://www.mongodb.com/try/download/community) 

Al ingresar al la pagina de descarga, hacer click en el boton verde que dice "Select package" el cual lleva la vista a una seccion en donde se ve la plataforma, la version y el paquete el cual debe estar en formato msi, luego hacer click en download.

En la ventana de instalacion al llegar a "Select Setup Type", elegir el que dice "Complete", luego en la ventana que dice "Service Configuration", si no estan seleccionadas(deberian por default) seleccionar "Install MongoD as a Service" y "Run service as Network Service user".
Finalmente verificar que este seleccionada la opcion para instalar mongodb compass y continuar hasta finalizar la instalacion.

Una vez finalizado se abre automaticamente mongodb Compass, y aparecera por default una ventana con la direccion "mongodb://localhost:27017" y un boton que dice "Connect", hacer click en el boton y esperar a que se conecte (puede que la primera vez tarde un poco o falle, por lo que se debe intentar hasta que conecte y se vean las bases de datos predeterminadas), luego cerrar la ventana o dejarala abierta para ver la informacion creada desde la app web(usuarios).
Si esta usando mongodb compass, al ingesar datos desde la app web, debe refrescar la ventana de mongodb compass para ver los cambios. 

https://drive.google.com/drive/folders/1qHu2zq4yfUXEBJjL19n33GR-YM3sHFSq?usp=drive_link

---

## Luego de instalar los programas requeridos, clonar el proyecto y seguir los siguientes pasos

Aqui se encuentra el paso a paso en imagenes:

https://drive.google.com/drive/folders/1kxO4S7jG4e2EXIdyVwGKw7Vub48f04zO?usp=drive_link


## Para el frontend

Abrir una nueva consola y en la raíz ingresar a la carpeta web con el comando:
```bash
 cd web
```

#### Instalar las dependencias:
```bash
 npm install 
```

#### Para iniciar el servidor:

```bash
 npm run dev
```
Para verificar su funcionamiento ingresar a: http://localhost:5173, en donde deberia verse inicialmente el login.

## Para la API

Abrir una nueva consola y desde la raíz ingresar a la carpeta api con el comando:
```bash
 cd api
```

### Variables de entorno

#### En la carpeta api crear un archivo .env con las siguientes variables de entorno:

String de conexión a mongodb
```
MONGO_URL = "mongodb://localhost:27017/Taller2-IDWM"
```

Clave secreta usada al momento de generar y validar los jwt del administrador:

por simplicidad se dejo como "secret key", pero deberia ser una cadena mas segura en un caso de uso real
```
JWT_SECRET = "secret key"
```

(Opcional) La api usa por defecto el puerto 3000, pero si por algun motivo este ya esta en uso, puede añadir la variable PORT con un puerto diferente si asi lo desea (tener en cuenta que tambien debe cambiarse el puerto en la parte web a cada peticion que se haga con fetch):
```
PORT = 4000
```

#### Instalar las dependencias:
```bash
 npm install 
```

#### Correr los seeders de la base de datos
Tener en cuenta que cada vez que se corre un seeder se eliminan todos los datos existentes en la base de datos para ese tipo de seeder:

Para crear al administrador solicitado:
```bash
 npm run seed:admins
```
Para crear 4 usuarios iniciales:
```bash
 npm run seed:users
```

#### Para iniciar el servidor:

```bash
 npm run dev
```

Para verificar su funcionamiento entrar a http://localhost:3000 o con el puerto elegido, lo que deberia devolver un json:

```bash
 {"message": "DUMBO"}
```



## POSTMAN

Para la ruta delete primero puede usar la ruta get users para obtener algun id, luego en la ruta delete agregar el id de algun usuario para eliminarlo en el Path Variables llamado id.

Para la ruta de edición debe cambiar el rut o dni para poder editar.

Para la creacion debe cambiar el rut y/o correo, ya que ambos son unicos

