# API de inventario de ropa

## Descripción

Esta API permite gestionar un sistema de inventario de ropa, permitiendo a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los productos almacenados en una base de datos MySQL.

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MySQL**
- **dotenv**
- **cors**

## Instalación y configuración

### 1. Clonar el repositorio

```sh
 git clone <https://github.com/Adalab/modulo-4-evaluacion-final-bpw-mgantunez>
 cd <modulo-4-evaluacion-final-bpw-mgantunez>
```

### 2. Instalar dependencias

```sh
npm install
```

### 3. Configurar variables de entorno

Crear un archivo **.env** en la raíz del proyecto con los siguientes valores:

```sh
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=tu_usuario
MYSQL_PASS=tu_contraseña
MYSQL_SCHEMA=inventario_ropa
```

### 4. Iniciar el servidor

```sh
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### 1. Crear un producto

**POST** `/productos`

#### Cuerpo de la petición (JSON)

```json
{
  "nombre": "Ejemplo de oroducto",
  "descripcion": "Una breve descripción",
  "precio": 100.5,
  "imagen_url": "https://ejemplo.com/imagen.jpg",
  "id_categorias": 1
}
```

#### Respuesta exitosa (201)

```json
{
  "message": "Producto insertado correctamente.",
  "id": 1
}
```

### 2. Obtener todos los productos

**GET** `/productos`

#### Respuesta exitosa (200)

```json
{
  "info": { "count": 10 },
  "results": [
    {
      "id_productos": 1,
      "nombre": "Ejemplo de producto",
      "descripcion": "Una breve descripción",
      "precio": 100.5,
      "imagen_url": "https://ejemplo.com/imagen.jpg",
      "id_categorias": 1
    }
  ]
}
```

### 3. Obtener un producto por ID

**GET** `/productos/:id`

#### Respuesta exitosa (200)

```json
{
  "result": {
    "id_productos": 1,
    "nombre": "Ejemplo de producto",
    "descripcion": "Una breve descripción",
    "precio": 100.5,
    "imagen_url": "https://ejemplo.com/imagen.jpg",
    "id_categorias": 1
  }
}
```

### 4. Actualizar un producto

**PUT** `/productos/:id`

#### Cuerpo de la petición (JSON)

```json
{
  "nombre": "Nuevo nombre",
  "descripcion": "Descripción actualizada",
  "precio": 120.0,
  "imagen_url": "https://ejemplo.com/nueva-imagen.jpg",
  "id_categorias": 2
}
```

#### Respuesta exitosa (200)

```json
{
  "message": "Producto actualizado correctamente.",
  "updatedProduct": {
    "id_productos": 1,
    "nombre": "Nuevo nombre",
    "descripcion": "Descripción actualizada",
    "precio": 120.0,
    "imagen_url": "https://ejemplo.com/nueva-imagen.jpg",
    "id_categorias": 2
  }
}
```

### 5. Eliminar un producto

**DELETE** `/productos/:id`

#### Respuesta exitosa (200)

```json
{
  "message": "Producto eliminado correctamente."
}
```

## Notas Adicionales

- Se recomienda utilizar herramientas como **Postman** para probar los endpoints.
- La base de datos debe estar configurada correctamente antes de ejecutar la API.
- La API sigue las buenas prácticas de RESTful.

## Autor

María García Antúnez
