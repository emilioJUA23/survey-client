# Web Site - DIGITALIZACIÓN DE ENCUESTAS

El presente proyecto, presenta una programación orientada al Modelo Vista Controlador (MVC) para la gestión de encuestas, con los siguientes sistemas transversales.

1. Logeo (Usuarios - JWT)
2. Seguimiento de usuarios
3. Seguimiento de roles
4. Seguimiento de Encuestas

Cabe mencionar que se presenta la siguiente arquitectura del proyecto:

```
*---------------*                                         *----------------*
|     NGINX     |                                         |                |
|    Port 80    |<-----upstream Mongo-managestment------->| Rest Api: 8080 |
|               |                                         |                |
| *-----------* |                                         *----------------*
| |           | |
| | Web Site  | |
| | (Static)  | |
| *-----------* |
*---------------*
```

## Antes de comenzar

Debes clonar el proyecto (Via HTTPS):
```
git clone https://github.com/emilioJUA23/survey-client.git
```

Debe tomarse en cuenta que en el presente proyecto, no se instala los paquetes respectivos (Ver sección de instalación).

Así mismo debe comprender la estructura del proyecto (carpeta app):

* home : Pantalla de inicio
  * configuration : Menú de configuraciones generales de seguridad
    * rol: Seguimiento de roles
      * insert-rol: Insertar un nuevo rol
      * rol-edit: Editar o ver un rol existente
      * rol-index: Listado de roles o eliminación de un rol
    * user: Seguimiento de usuario
      * sign-up: Creación de un usuario
      * user-edit: Editar o ver un usuario
      * user-index: Listado de usuarios o eliminación de un usuario
    * view: Seguimiento de vistas
      * view-index: Listado jerárquico de vistas
  * survey-home: Menú correspondiente de las opciones respectivas de una encuesta
    * Result-display: Exportación a excel de las encuestas existentes
    * survey-editor-wrapper: Construcción de la última encuesta
    * Survey-wrapper: Visualización de la última encuesta
  * welcome: Mensaje de bienvenida o cambio de contraseña
* user
  * forgot-password: Vista de recuperación de contraseña
  * sign-in: Vista de logeo
* helper-components: Vistas de ayuda al sistema
  * not-found: Vista no encontrada
  * unauthorized: Vista de acceso no autorizado
 
A continuación se presentará los controladores respectivos (carpeta app):

* auth: Servicios correspondiente a las autentificación y autorización del usuario
* shared: Carpeta de modelos y servicios correspondientes al REST API
  * data-tables-response: Servicio de datables (Pagineo y tabulación)
  * rol: Servicios y modelos correspondiente al rol
  * user: Servicio y modelos correspondiente al usuario
  * view: Servicio y modelos correspondientes a las vistas
* app.constants.ts: Archivo en la cual se enlista todas las constantes respectivas del sistema
* app.utils.ts: Funciones y métodos que se utilizan en todo el sistema
* routes.ts: Sistema de ruteos del sistema

### Prerequesitos

Antes de comenzar a trabajar, es necesario instalar los siguientes componentes (Sistema operativo: Linux, Ubuntu):

**Nodejs**
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

Posteriormente a la instalación de Nodejs, se recomienda seguir la [instalación de Docker (En el Sistema operativo: linux, Ubuntu)](https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-16-04-es). 

**Observación**: Se debe tomar en cuenta, que para crear una imagen de docker de producción, es necesario tener un repositorio de imagenes (Para el presente proyecto se utilizó Dockerhub).

### Instalación

Para instalar el proyecto en su local, debe ejecutar el siguiente comando:

```
cd Ruta-Proyecto
npm install
```

Este comando descargará todos los paquetes dependientes del proyecto hacia la carpeta NODE_MODULES.

Así mismo es necesario instanciar el contenedor de REST API:

```
sudo docker run -d \
--name mongo-managment \
-p 8080:8080 \
-e PORT='8080' \
-e NODE_ENV='PROD' \
-e NAMEDB='iarna' \
-e URLDB='mongodb://mongo:27017' \
-e CADUCIDAD_TOKEN='2592000' \
-e SEED='3sT3-3S-3L-S33d-D3-Pr0duCc10N-p4R4-t0K3n' \
-e DESDE='0' \
-e LIMITE='5' \
-e SMTP_HOST='smtp.gmail.com' \
-e SMTP_PORT='465' \
-e SMTP_SECURE='true' \
-e SMTP_AUTH_USER='djob195@gmail.com' \
-e SMTP_AUTH_PASS='22880207DiegoOrellana' \
-e ADMIN_PASSWORD='123456' \
--link mongo:mongo \
{{usuario}}/{{nombreProyecto}}
```
Comandos:
* **docker run:**  Crea y ejecuta el contenedor de Mongo, con los siguientes parámetros:
  * -d: Instancia un servicio demonio (Daemon)
  * --name: Nombre del contenedor
  * -e key=value : Nombre y valor de una variable de entrono
  * -link local:Contenedor : Nombre DNS que permitirá comunicar con otros contenedores

#### Variables de entornos

A continuación se encontrará todos los parámetros necesarios para la ejecución del proyecto (del archivo src/app/app.constants.ts):
* baseURL: URL correspondiente a los servicios API
* pageLength: Tamaño del pagineo.

## Ejecutar la aplicación

Para compilar la aplicación, debe ejecutar los siguientes comandos:

```
cd Ruta-Proyecto
npm start
```

**Ojo**: La aplicación comenzará a ejecutarse con las variables entorno de defecto (Ver archivo src/app/app.constants.ts)

## Built
Para crear una imagen de producción, debe seguir los siguientes pasos:

```
cd Ruta-Proyecto
npm run build
docker login #Autentificación del usuario y contraseña 
docker build -t {{usuario}}/{{nombreProyecto}} .
docker push {{usuario}}/{{nombreProyecto}}
```

## Ejecutar la imagen de docker
Para crear un contenedor y ejecutar la imagen de la aplicación, debe seguir los siguientes pasos:

```
sudo docker run -d \
--link mongo-managment:mongo-managment  \
--name survey-client \
-p 80:80 \
{{usuario}}/{{nombreProyecto}}
```
Comandos:
* **docker run:**  Crea y ejecuta el contenedor de Mongo, con los siguientes parámetros:
  * -d: Instancia un servicio demonio (Daemon)
  * --name: Nombre del contenedor
  * -e key=value : Nombre y valor de una variable de entrono
  * -link local:Contenedor : Nombre DNS que permitirá comunicar con otros contenedores

**Observación:** Es necesario tener corriendo el contenedor del REST-API, mongo-managment.

## Construcción de la aplicación

* [Node.js](https://nodejs.org/es/) - Entorno de Javascript
* [Docker](https://www.docker.com/) - Manejo de contenedores
* [SurveyJS](https://surveyjs.io/Overview/Library/) - Manejo de encuestas dinámicas


## Versión

Para el presente proyecto se realizó la versión final de los estudiantes del año 2018 de la Universidad Rafael Landívar 

## Authors

* **Luis Juaréz** - [emilioJUA23](https://github.com/emilioJUA23)
* **Diego Orellana** - [djob195](https://github.com/djob195)
* Estudiantes de la Universidad Rafael Landívar


## Agradecimiento

* Universidad Rafael Landívar 
* Framework: SURVEYJS (2018)
