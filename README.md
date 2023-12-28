# Random User Dashboard

Este proyecto es una aplicación web simple que utiliza la API Random User para mostrar una lista de usuarios aleatorios. Los usuarios se pueden filtrar por país, ordenar por nombre, apellido o país y realizar otras acciones como eliminar usuarios individuales o todos a la vez.

## Características

- **Carga inicial de usuarios:** Al iniciar la aplicación, se realiza una solicitud a la API Random User para obtener una lista inicial de 10 usuarios.

- **Filtrado por país:** Los usuarios pueden filtrarse por país utilizando la barra de búsqueda. La lista se actualiza automáticamente al ingresar texto en el campo de filtro.

- **Ordenación:** Los usuarios se pueden ordenar por nombre, apellido o país. La ordenación se activa haciendo clic en los encabezados de la tabla.

- **Colorear filas:** Se puede alternar la opción de colorear las filas de la tabla con un simple clic en el botón correspondiente.

- **Acciones sobre usuarios:** Se proporcionan botones para borrar usuarios individualmente o eliminar todos los usuarios de la lista.

- **Paginación:** Se ha implementado paginación para cargar y mostrar más usuarios de manera incremental.

## Estructura del Proyecto

El proyecto consta de dos componentes principales: `App` y `UserList`. A continuación, una breve descripción de cada uno:

### `App`

El componente principal que gestiona el estado de la aplicación, realiza solicitudes a la API y contiene la lógica de filtrado y ordenación de usuarios. Incluye la interfaz de usuario y los controles para interactuar con la lista de usuarios.

### `UserList`

Un componente funcional que recibe la lista de usuarios y muestra una tabla con información relevante. Permite la ordenación de la lista y proporciona botones para borrar usuarios.

## Configuración y Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Mateo872/random-users.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación:

   ```bash
   npm run dev
   ```

La aplicación se abrirá en tu navegador predeterminado.

¡Disfruta explorando la aplicación y gestionando la lista de usuarios!
