
# Instrucciones de uso

Para iniciar el backend y el frontend se necesita lo siguiente:


## Instalaciones obligatorias

#### - [Git](https://git-scm.com/download/win)
#### - [NodeJS](https://nodejs.org/en/)
Pude ser tanto la versión LTS como la actual (current).
#### - [VS Code](https://code.visualstudio.com/)
#### - [Community server de MongoDB](https://www.mongodb.com/try/download/community) 

Instalar community server como servicio y mongodb compass (que aparece como opción en la misma ventana de instalación del community server) para poder revisar facilmente la información almacenada en la base de datos.

---

### Una vez clonado el proyecto:

## Para la API

Desde la raíz ingresar a la carpeta api con el comando:
```bash
 cd api
```

### Variables de entorno

#### En la carpeta api crear un archivo .env con las siguientes variables de entorno:

String de conexión a mongodb
```
MONGO_URL = "mongodb://127.0.0.1:27017/Catedra2-IDWM";
```

Clave secreta usada al momento de generar y validar los jwt del administrador:

por simplicidad se dejo como "secret key", pero deberia ser una cadena mas segura en un caso de uso real
```
JWT_SECRET = "secret key";
```

(Opcional) La api usa por defecto el puerto 3000, pero puede añadir la variable PORT con un puerto diferente si asi lo desea:
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


## Para el frontend

Abrir una nueva consola y en la raíz e ingresar a la carpeta web con el comando:
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
Para verificar su funcionamiento ingresar a: http://localhost:5173


## POSTMAN

Para la ruta delete primero puede usar la ruta get users para obtener algun id, luego en la ruta delete agregar el id de algun usuario para eliminarlo en el Path Variables llamado id.

Para la ruta de edición debe cambiar el rut o dni para poder editar.

Para la creacion debe cambiar el rut y/o correo, ya que ambos son unicos