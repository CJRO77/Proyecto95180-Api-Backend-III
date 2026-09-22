# ShipNow API

API base de **ShipNow** plataforma orientada a la gestión de operaciones de una empresa de logística.
El proyecto aplica una **arquitectura profesional por capas** (**Controller → Service → Repository**),
con validación de variables de entorno al arranque y un diccionario de
constantes centralizado para roles y estados.

## Estructura del proyecto

```
src/
  config/          # Variables de entorno validadas + conexión a MongoDB
  constants/       # Roles y estados del dominio (Object.freeze)
  controllers/     # Única puerta de entrada HTTP (req/res)
  services/        # Lógica de negocio
  repositories/    # Único lugar que conoce Mongoose/MongoDB
  models/          # Esquemas de Mongoose (sin lógica)
  routes/          # Conectan path + método HTTP con el Controller
  app.js           # Configuración de Express
  server.js        # Punto de entrada: conecta DB y levanta el server
```

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **Nodemon**
- **JavaScript (ES Modules)**

---

## 🏗️ Arquitectura del proyecto

ShipNow utiliza una arquitectura de tres capas:

```text
                 HTTP Request
                      │
                      ▼
                  Routes
                      │
                      ▼
                 Controller
                      │
                      ▼
                   Service
                      │
                      ▼
                 Repository
                      │
                      ▼
                    Model
                      │
                      ▼
                  MongoDB

 ## 📂 Estructura del proyecto

 ShipNow/
│
├── src/
│   │
│   ├── config/
│   │   ├── env.config.js
│   │   └── database.config.js
│   │
│   ├── constants/
│   │   └── index.js
│   │
│   ├── controllers/
│   │   ├── products.controller.js
│   │   └── users.controller.js
│   │
│   ├── services/
│   │   ├── products.service.js
│   │   └── users.service.js
│   │
│   ├── repositories/
│   │   ├── products.repository.js
│   │   └── users.repository.js
│   │
│   ├── models/
│   │   ├── product.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── products.routes.js
│   │   └── users.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md   



## ⚙️ Configuración del proyecto


1. Clonar el repositorio

git clone https://github.com/CJRO77/Proyecto96795-Api-Backend-III.git

Luego ingresar al proyecto:

cd Proyecto96795-Api-Backend-III

2. Instalar las dependencias
npm install
3. Crear el archivo .env

Copiar el archivo .env.example y crear un archivo llamado:

.env

El archivo debe contener:

PORT=3000
MONGODB_URI=tu_uri_de_mongodb
NODE_ENV=development

4. Ejecutar el proyecto

Para ejecutar el proyecto en modo desarrollo:

npm run dev

Para ejecutar el proyecto normalmente:

npm start

Si la configuración es correcta, se mostrará un mensaje indicando que MongoDB se conectó correctamente y que el servidor está ejecutándose.



## Endpoints

### Productos (`/api/products`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista productos disponibles (`status: AVAILABLE`) |
| GET | `/:id` | Obtiene un producto por id |
| POST | `/` | Crea un producto (valida `name`, `price`, `stock`) |
| PUT | `/:id` | Actualiza un producto (recalcula `status` si cambia el stock) |
| DELETE | `/:id` | Elimina un producto |

### Usuarios (`/api/users`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista usuarios |
| GET | `/:id` | Obtiene un usuario por id |
| POST | `/` | Registra un usuario (password hasheado con bcrypt) |
| PUT | `/:id` | Actualiza un usuario |
| DELETE | `/:id` | Elimina un usuario |


**¿Por qué separar la lógica entre Service y Repository?**

La regla que seguí fue: **el Repository solo sabe "buscar y guardar datos";
el Service sabe "qué significan esos datos para el negocio"**.

En `productsRepository.getAll` no hay ningún filtro fijo: recibe los
criterios de búsqueda como parámetro. La decisión de negocio de "el listado
general solo muestra productos con `status: AVAILABLE`" vive en
`productsService.getAllProducts`, porque es una regla que puede cambiar según
el caso de uso (por ejemplo, una vista de administración podría necesitar ver
también los productos sin stock), y esa decisión no le corresponde al
Repository.

Lo mismo pasa con el cálculo del `status` de un producto: el Repository sabe
*cómo* guardar o actualizar el documento en MongoDB, pero no sabe *cuándo* un
producto pasa a estar `OUT_OF_STOCK`. Esa regla vive en el Service
(`createProduct` y `updateProduct`), tanto al crear un producto como al
modificarle el stock. Si el día de mañana cambia la lógica de negocio (o
incluso la base de datos), no hace falta tocar la capa de acceso a datos.

En Usuarios aplica el mismo criterio con los roles: nadie puede
auto-asignarse el rol `ADMIN` al registrarse, y esa validación vive en
`usersService.createUser`, no en el Repository ni en el modelo. El hash de la
contraseña con `bcryptjs` también se hace en el Service, antes de delegarle
al Repository el simple trabajo de guardar el documento.

El Controller, por su parte, nunca importa Mongoose ni conoce estas reglas:
solo traduce el request HTTP a una llamada al Service, y el resultado (o el
error, vía `error.statusCode`) a una respuesta HTTP con el status code
correspondiente (`400` en validaciones, `404` si el recurso no existe, `409`
si un email ya está registrado).

**Notas de diseño**

- El Controller nunca importa `mongoose` ni los modelos directamente.
- No hay strings sueltos para roles o estados: todo pasa por
  `src/constants/index.js` (`USER_ROLES`, `PRODUCT_STATUS`).
- No hay llamadas a `process.env` fuera de `src/config/env.config.js`.
- Los errores de negocio se propagan con `error.statusCode`, y es el
  Controller quien lo lee para devolver el status HTTP apropiado.
- Repository y Service fueron probados de punta a punta con Thunder Client,
  cubriendo el CRUD completo, casos de error (400/404/409) y las reglas de
  negocio (recalculo automático de `status` según stock).




## Próximas etapas

El proyecto ShipNow continuará incorporando funcionalidades relacionadas con una empresa de logística, entre ellas:

Usuarios
Comercios
Repartidores
Pedidos
Estados de entrega
Comprobantes
Documentos
Autenticación
Autorización
Testing
Mocks
Seguridad
Escalabilidad

👨‍💻 Autor

carlos Jonathan Rodriguez

Proyecto desarrollado como parte del aprendizaje de Programación Backend III - Comisión#96795 - Coderhouse.