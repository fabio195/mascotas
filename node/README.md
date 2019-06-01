# Mascotas

Red social de ejemplo para la cátedra Programación Avanzada UTN/FRM.

[Documentación de API](./README-API.md)

## Entorno de Desarrollo

El proyecto se desarrollo con [Visual Studio Code](https://code.visualstudio.com/download), Si bien podrían utilizarse alternativas como [Atom](https://atom.io/), [Sublime](https://www.sublimetext.com/download).

Algunos plugins interesantes para VSCode que facilitan el desarrollo :

- __JavasScript (ES6) code snippets__ by charlampos karypidis
- __ESLint__ by egamma
- Typescript React code snippets
- React Native Tools
- ES7 React/Redux/GraphQL/React-native snippets

Existe un Workspace configurado para VSCode en la raíz del proyecto :

```bash
Microservicios.code-workspace
```

## Dependencias

### MongoDB

Seguir las guías de instalación de mongo desde el sitio oficial [mongodb.com](https://www.mongodb.com/download-center#community)

No se requiere ninguna configuración adicional, solo levantarlo luego de instalarlo.

Sugiero instalar Mongodb Compass para poder navegar la base de datos en forma visual [mongodb.com](https://www.mongodb.com/products/compass)

### Redis

Redis es una segunda opción de almacenamiento de datos. Para almacenamiento de imágenes hace uso de Redis.

Seguir los pasos de instalación desde la pagina oficial [redis.io](https://redis.io/download)

No se requiere ninguna configuración adicional, solo levantarlo luego de instalarlo.

Para windows se puede descargar el paquete sin instalación : [Instalación](https://sourceforge.net/projects/redis/)

Recomiendo instalar FastoRedis para navegar la base de datos [fastoredis.com](https://fastoredis.com/)

### Node 10

Seguir los pasos de instalación del sitio oficial [nodejs.org](https://nodejs.org/en/)

### MongoDb

La base de datos se almacena en MongoDb.

Ver tutorial de instalación en [README.md](../README.md) en la raíz.

## Ejecución

Abrir ventana de comandos en la carpeta del microservicio y ejecutar :

```bash
npm install
npm start
```

## Archivo .env

Este archivo permite configurar diversas opciones de la app, ver ejemplos en .env.example

## Apidoc

Apidoc es una herramienta que genera documentación de apis para proyectos node (ver [Apidoc](http://apidocjs.com/)).

El microservicio muestra la documentación como archivos estáticos si se abre en un browser la raíz del servidor [localhost:3000](http://localhost:3000/)

Ademas se genera la documentación en formato markdown.
