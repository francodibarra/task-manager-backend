# Gestor de Tareas - Backend

Este es el backend de la aplicación de gestión de tareas, construido con **Node.js**, **Fastify** y **PostgreSQL**. Proporciona una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas.

## **Tabla de Contenidos**

- [Características](#características)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Notas Adicionales](#notas-adicionales)

## **Características**

- **Fastify** como framework web para alto rendimiento.
- **PostgreSQL** como base de datos relacional.
- Operaciones CRUD para tareas:
  - Crear una nueva tarea.
  - Obtener todas las tareas con paginación.
  - Obtener una tarea específica por ID.
  - Actualizar una tarea existente.
  - Eliminar una tarea.

## **Prerrequisitos**

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu máquina local:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (versión 10 o superior)

## **Instalación**

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/francodibarra/task-manager-backend.git
   cd task-manager-backend

2. **Instala las dependencias**
    ```bash
    npm install

3. **Configura la base de datos**
    - Inicia el servicio de PostgreSQL.
    - Crea una nueva base de datos:
        ```sql 
        CREATE DATABASE task_manager;
    - Crea la tabla tasks:
        ```sql
        \c task_manager;

        CREATE TABLE tasks (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP
        );

4. **Configura las variables de entorno**
    - Crea un archivo .env en la raíz del proyecto y agrega la siguiente línea:
        ```bash
        DATABASE_URL=postgres://usuario:contraseña@localhost:5432/task_manager
    - Reemplaza usuario y contraseña con tus credenciales de PostgreSQL.

## **Ejecución**
- Para iniciar el servidor en modo de desarrollo:
    ```bash
    npm start
- El servidor se ejecutará en http://localhost:8000.

## **Estructura del Proyecto**
    task-manager-backend/
    ├── controllers/
    │   └── taskControllers.js
    ├── models/
    │   └── taskModel.js
    ├── routes/
    │   └── tasks.js
    ├── .env
    ├── package.json
    ├── package-lock.json
    └── server.js

## **API Endpoints**

**Crear una nueva tarea**
- URL: /tasks
- Método: POST
- Descripción: Crea una nueva tarea.
- Cuerpo de la Solicitud:
    ```json
    {
    "title": "Título de la tarea",
    "description": "Descripción de la tarea (opcional)"
    }

**Obtener todas las tareas**
- URL: /tasks
- Método: GET
- Descripción: Obtiene una lista de tareas.

**Obtener una tarea por ID**
- URL: /tasks/:id
- Método: GET
- Descripción: Obtiene una tarea específica por su ID.

**Actualizar una tarea**
- URL: /tasks/:id
- Método: PUT
- Descripción: Actualiza una tarea existente.
- Cuerpo de la Solicitud:
    ```json
    {
    "title": "Nuevo título",
    "description": "Nueva descripción"
    }

**Eliminar una tarea**
- URL: /tasks/:id
- Método: DELETE
- Descripción: Elimina una tarea por su ID.

## **Notas Adicionales**
- puedes crear un contenedor de base de datos postgres usando docker y ejecutando el siguiente comando:
    ```bash
    docker run --name mi_postgres \
    -e POSTGRES_USER=mi_usuario \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=mi_basedatos \
    -p 5432:5432 \
    -d postgres
