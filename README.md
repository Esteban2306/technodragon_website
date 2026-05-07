# TechnoDragon - Plataforma de E-Commerce Premium

> **Solución completa de e-commerce moderna y escalable, actualmente en uso por empresa del sector tecnológico y retail.**

## Descripción General

TechnoDragon es una plataforma de e-commerce de alta gama construida con tecnologías modernas y mejores prácticas de desarrollo. La aplicación permite gestionar un catálogo completo de productos, gestión de inventario, carrito de compras, sistema de autenticación robusto y múltiples opciones de comunicación con clientes.

El proyecto está dividido en dos partes claramente diferenciadas:
- **Backend**: API RESTful robusta construida con NestJS y PostgreSQL
- **Frontend**: Aplicación web moderna construida con Next.js 16 y React 19

---

## Características Principales

### Características Generales
- ✅ **Autenticación y Autorización**: Sistema JWT con roles de usuario (ADMIN, CUSTOMER)
- ✅ **Gestión de Productos**: CRUD completo de productos con variantes y atributos
- ✅ **Catálogo Dinámico**: Sistema de categorías jerárquicas
- ✅ **Gestión de Marcas**: Marcas con logos y estados activos/inactivos
- ✅ **Sistema de Carrito**: Carrito persistente con múltiples variantes
- ✅ **Gestión de Inventario**: Control de stock en tiempo real
- ✅ **Integración con Cloudinary**: Almacenamiento de imágenes en la nube
- ✅ **Integración WhatsApp**: Generación de URLs de contacto directo
- ✅ **Sistema de Eventos**: Event bus para eventos de aplicación
- ✅ **Logging Centralizado**: Sistema de logs avanzado
- ✅ **Búsqueda y Filtrado**: Búsqueda completa de productos y catálogo
- ✅ **Soft Delete**: Eliminación lógica de registros
- ✅ **Validaciones de Datos**: Validaciones exhaustivas tanto en cliente como en servidor

### Módulos del Backend

| Módulo | Descripción | Responsabilidades |
|--------|-------------|-------------------|
| **Auth** | Autenticación | Login, Registro, JWT, Refresh Token |
| **Products** | Gestión de Productos | CRUD de productos, variantes, atributos |
| **Categories** | Categorías | Jerarquía de categorías, slug management |
| **Brand** | Marcas | CRUD de marcas con logos y estados |
| **Cart** | Carrito de Compras | Gestión de ítems, cálculos |
| **Catalog** | Catálogo Unificado | Vista combinada de productos para clientes |
| **WhatsApp** | Integración WhatsApp | URLs de contacto directo |

### Módulos del Frontend

| Módulo | Descripción |
|--------|-------------|
| **Landing** | Página de inicio con hero animado |
| **Catalog** | Visualización de productos y búsqueda |
| **Product** | Detalle de producto con variantes |
| **Auth** | Autenticación de usuarios |
| **Admin** | Panel administrativo con gestión completa |
| **API** | Cliente HTTP centralizado |
| **Hooks** | Hooks personalizados reutilizables |

---

## Arquitectura Técnica

### Backend - Stack Tecnológico

```
NestJS 11.0.1
├── TypeScript 5.7.3
├── Prisma 5.22.0 (ORM)
├── PostgreSQL (Base de Datos)
├── JWT (Autenticación)
├── Passport.js (Estrategias de Auth)
├── Cloudinary (Gestión de Imágenes)
├── Class Validator (Validaciones)
├── Event Emitter (Event Bus)
└── Jest (Testing)
```

### Frontend - Stack Tecnológico

```
Next.js 16.2.1
├── React 19.2.4
├── TypeScript 5.x
├── Tailwind CSS 4
├── TanStack Query (React Query)
├── Motion (Animaciones)
├── GSAP (Animaciones avanzadas)
├── Lucide React (Iconos)
├── Three.js (Gráficos 3D)
└── ESLint + Prettier (Code Quality)
```

### Base de Datos - Esquema

#### Modelos Principales

```
├── User
│   ├── email (único)
│   ├── password (hasheado)
│   ├── name
│   └── role (ADMIN | CUSTOMER)
│
├── Category (Jerárquica)
│   ├── name
│   ├── slug (único)
│   └── parentId (autoreferencia)
│
├── Brand
│   ├── name
│   ├── slug (único)
│   ├── logo
│   └── isActive
│
├── Product
│   ├── name
│   ├── slug (único)
│   ├── description
│   ├── brandId
│   ├── categoryId
│   └── isFeatured
│
├── ProductVariant
│   ├── sku (único)
│   ├── price
│   ├── stock
│   ├── condition (NEW | REFURBISHED)
│   └── attributes (JSON)
│
├── ProductImage
│   ├── url
│   └── isMain
│
├── CatalogItem
│   └── Vista desnormalizada para búsqueda rápida
│
└── Cart & CartItem
    └── Sistema de carrito persistente
```

---

## Guía de Instalación y Configuración Local

### Prerrequisitos

- **Node.js** 18.x o superior
- **npm** o **pnpm** (recomendado pnpm)
- **PostgreSQL** 14 o superior
- **Git**
- **Cuenta en Cloudinary** (para gestión de imágenes)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Esteban2306/technodragon_website.git
cd technodragon_website
```

### 2. Configurar Backend

#### Instalar Dependencias
```bash
cd backend
pnpm install
# o si prefieres npm:
npm install
```

#### Configurar Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de Datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/technodragon?schema=public"

# JWT
JWT_SECRET="tu_clave_secreta_jwt_aqui"

# Cloudinary (Gestión de Imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# WhatsApp
WHATSAPP_PHONE=573144455235

# Entorno
NODE_ENV=development
```

#### Configurar Base de Datos

```bash
# Crear base de datos
createdb technodragon

# Ejecutar migraciones Prisma
pnpm prisma migrate dev --name init

# (Opcional) Generar cliente Prisma
pnpm prisma generate
```

#### Iniciar Backend

```bash
# Modo desarrollo con watch
pnpm run start:dev

# O modo debug
pnpm run start:debug

# Salida esperada:
# [Nest] 12345  - 05/07/2026, 10:30:45 AM     LOG [InstanceLoader] AppModule dependencies initialized +123ms
# [Nest] 12345  - 05/07/2026, 10:30:45 AM     LOG [RoutesResolver] Mapped {/auth, POST} route +45ms
# ...
# [Nest] 12345  - 05/07/2026, 10:30:46 AM     LOG [NestFactory] Application successfully started
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar Frontend

#### Instalar Dependencias
```bash
cd frontend
pnpm install
# o si prefieres npm:
npm install
```

#### Configurar Variables de Entorno

Crear archivo `.env.local` en la carpeta `frontend/`:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000

# (Opcional) Otras variables
NEXT_PUBLIC_APP_ENV=development
```

#### Iniciar Frontend

```bash
# Modo desarrollo con hot reload
pnpm run dev

# Salida esperada:
# ▲ Next.js 16.2.1
# - Local:        http://localhost:3000
# - Environments: .env.local
```

La aplicación frontend estará disponible en `http://localhost:3000`

### 4. Verificar la Instalación

#### Backend - Pruebas de API
```bash
# Desde la carpeta backend, ejecutar tests
pnpm test

# Tests de integración E2E
pnpm test:e2e
```

#### Frontend - Verificar Build
```bash
# Desde la carpeta frontend
pnpm run build
pnpm start
```

---

## Documentación de API

### Autenticación

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "contraseña123",
  "name": "Nombre Usuario"
}

Response 201:
{
  "id": "uuid",
  "email": "usuario@example.com",
  "name": "Nombre Usuario",
  "role": "CUSTOMER"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "contraseña123"
}

Response 200:
{
  "id": "uuid",
  "email": "usuario@example.com",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Obtener Datos Actuales
```http
GET /auth/me
Authorization: Bearer {accessToken}

Response 200:
{
  "id": "uuid",
  "email": "usuario@example.com",
  "name": "Nombre Usuario",
  "role": "CUSTOMER"
}
```

### Productos

#### Listar Todos los Productos
```http
GET /products?page=1&limit=20&search=iphone
Response 200: Product[]
```

#### Obtener Producto por ID
```http
GET /products/:id
Response 200: Product
```

#### Obtener Producto Paginado
```http
GET /products/paginated?page=1&limit=10
Response 200: {
  "data": Product[],
  "total": 150,
  "page": 1,
  "limit": 10
}
```

#### Crear Producto (Solo Admin)
```http
POST /products
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "iPhone 16",
  "slug": "iphone-16",
  "description": "Descripción del producto",
  "brandId": "uuid",
  "categoryId": "uuid",
  "isFeatured": true,
  "variants": [
    {
      "sku": "SKU-001",
      "price": 999.99,
      "stock": 50,
      "condition": "NEW",
      "attributes": {
        "color": "Black",
        "storage": "256GB"
      }
    }
  ],
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "isMain": true
    }
  ]
}

Response 201: Product
```

#### Actualizar Producto (Solo Admin)
```http
PATCH /products/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "iPhone 16 Updated",
  "description": "Nueva descripción"
}

Response 200: Product
```

#### Actualizar Stock (Solo Admin)
```http
PATCH /products/:id/stock
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "variantId": "uuid",
  "quantity": 30
}

Response 200: Product
```

#### Eliminar Producto (Solo Admin)
```http
DELETE /products/:id
Authorization: Bearer {accessToken}

Response 204: No Content
```

### Marcas

#### Listar Marcas
```http
GET /brands?search=Apple&isActive=true&page=1&limit=20
Response 200: Brand[]
```

#### Obtener Marca por Slug
```http
GET /brands/slug/apple
Response 200: Brand
```

#### Obtener Marca por ID
```http
GET /brands/:id
Response 200: Brand
```

#### Crear Marca (Solo Admin)
```http
POST /brands
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Apple",
  "slug": "apple",
  "logo": "https://example.com/apple-logo.png"
}

Response 201: Brand
```

#### Actualizar Marca (Solo Admin)
```http
PATCH /brands/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Apple Inc.",
  "logo": "https://example.com/new-logo.png"
}

Response 200: Brand
```

#### Activar/Desactivar Marca (Solo Admin)
```http
PATCH /brands/:id/activate
Authorization: Bearer {accessToken}
Response 200: Brand

PATCH /brands/:id/deactivate
Authorization: Bearer {accessToken}
Response 200: Brand
```

#### Eliminar Marca (Solo Admin)
```http
DELETE /brands/:id
Authorization: Bearer {accessToken}

Response 204: No Content
```

### Categorías

#### Listar Categorías
```http
GET /categories
Response 200: Category[]
```

#### Obtener Árbol de Categorías
```http
GET /categories/tree
Response 200: Category[]
```

#### Obtener Categoría por ID
```http
GET /categories/:id
Response 200: Category
```

#### Obtener Categoría por Slug
```http
GET /categories/slug/:slug
Response 200: Category
```

#### Crear Categoría (Solo Admin)
```http
POST /categories
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Electrónica",
  "slug": "electronica",
  "parentId": null
}

Response 201: Category
```

#### Actualizar Categoría (Solo Admin)
```http
PATCH /categories/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Electrónica Moderna"
}

Response 200: Category
```

#### Eliminar Categoría (Solo Admin)
```http
DELETE /categories/:id
Authorization: Bearer {accessToken}

Response 204: No Content
```

### Carrito

#### Crear Carrito
```http
POST /cart
Response 201: Cart
```

#### Obtener Carrito
```http
GET /cart/:cartId
Response 200: Cart
```

#### Agregar Ítem al Carrito
```http
POST /cart/:cartId/items
Content-Type: application/json

{
  "variantId": "uuid",
  "quantity": 2
}

Response 200: Cart
```

#### Actualizar Ítem del Carrito
```http
PATCH /cart/:cartId/items
Content-Type: application/json

{
  "variantId": "uuid",
  "quantity": 5
}

Response 200: Cart
```

#### Eliminar Ítem del Carrito
```http
DELETE /cart/:cartId/items/:variantId
Response 204: No Content
```

### Catálogo (Vista Pública)

#### Buscar en Catálogo
```http
GET /catalog/search?query=iphone&page=1&limit=20
Response 200: CatalogItem[]
```

#### Filtrar Catálogo
```http
GET /catalog/filter?brandId=uuid&categoryId=uuid&minPrice=100&maxPrice=1000
Response 200: CatalogItem[]
```

### WhatsApp

#### Obtener URL de Producto
```http
GET /whatsapp/product/:variantId
Response 200: { url: "https://wa.me/..." }
```

#### Obtener URL del Carrito
```http
GET /whatsapp/cart/:cartId
Response 200: { url: "https://wa.me/..." }
```

### Uploads

#### Subir Imagen
```http
POST /uploads/image
Content-Type: multipart/form-data

file: <archivo de imagen>

Response 200: {
  "secure_url": "https://res.cloudinary.com/...",
  "public_id": "uploads/..."
}
```

---

## Cómo Usar la Aplicación

### Panel de Administración

1. **Acceder al Panel**
   - Navegar a `http://localhost:3000/admin`
   - Hacer login con credenciales de administrador

2. **Gestión de Productos**
   - Crear productos con múltiples variantes
   - Configurar atributos (color, tamaño, etc.)
   - Subir imágenes desde Cloudinary
   - Activar/desactivar productos destacados

3. **Gestión de Categorías**
   - Crear categorías jerárquicas
   - Establecer relaciones padre-hijo
   - Organizar el catálogo

4. **Gestión de Marcas**
   - Registrar marcas con logos
   - Activar/desactivar marcas
   - Gestionar inventario por marca

5. **Gestión de Inventario**
   - Actualizar stock en tiempo real
   - Ver histórico de cambios
   - Configurar alertas de bajo stock

### Tienda (Cliente)

1. **Explorar Catálogo**
   - Buscar productos por nombre
   - Filtrar por marca, categoría, precio
   - Ver detalles de productos

2. **Gestionar Carrito**
   - Agregar productos al carrito
   - Modificar cantidades
   - Eliminar ítems

3. **Contactar por WhatsApp**
   - Compartir producto por WhatsApp
   - Enviar carrito por WhatsApp

---

## Autenticación y Seguridad

### Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **ADMIN** | Acceso completo a todas las funcionalidades administrativas |
| **CUSTOMER** | Solo lectura del catálogo, gestión de carrito personal |

### Guardia JWT

La mayoría de endpoints administrativos están protegidos con `JwtGuard` y `AdminGuard`:

```typescript
@UseGuards(JwtGuard, AdminGuard)
@Post('products')
async create(@Body() dto: CreateProductDto) {
  // Solo accesible por administradores
}
```

### Manejo de Tokens

- **Access Token**: Válido por 1 hora
- **Refresh Token**: Válido por 7 días
- Ambos se almacenan en cookies HttpOnly

---

## Testing

### Backend

```bash
cd backend

# Tests unitarios
pnpm test

# Tests con coverage
pnpm test:cov

# Tests E2E
pnpm test:e2e

# Tests en modo watch
pnpm test:watch
```

### Frontend

```bash
cd frontend

# ESLint
pnpm lint

# Build de prueba
pnpm build
```

---

## Scripts Disponibles

### Backend

```bash
pnpm build          # Compilar proyecto
pnpm start          # Iniciar en producción
pnpm start:dev      # Iniciar con watch
pnpm start:debug    # Iniciar con debugger
pnpm format         # Formatear código con Prettier
pnpm lint           # Linting con ESLint
pnpm test           # Ejecutar tests
pnpm test:watch     # Tests en watch mode
pnpm test:cov       # Tests con coverage
pnpm test:debug     # Tests con debugger
pnpm test:e2e       # Tests de integración
```

### Frontend

```bash
pnpm dev            # Iniciar servidor desarrollo
pnpm build          # Compilar para producción
pnpm start          # Iniciar servidor producción
pnpm lint           # ESLint
```

---

## Deployments

### Backend - Railway.io

El proyecto está configurado para deployer en Railway.io con `railway.json`:

```bash
# Instalar CLI de Railway
npm i -g @railway/cli

# Login
railway login

# Deployar
railway up

# Ver logs
railway logs
```

### Configuración de Producción

Para producción, asegurate de:

1. Establecer `NODE_ENV=production`
2. Usar variables de entorno seguras
3. Configurar CORS apropiadamente
4. Habilitar HTTPS
5. Configurar límites de rate limiting

```bash
# Build para producción
pnpm run build

# Iniciar servidor producción
pnpm run start:prod
```

---

## Solución de Problemas

### Error: "Cannot find module 'prisma'"

```bash
# Solución
pnpm install
pnpm prisma generate
```

### Error: "PostgreSQL connection refused"

```bash
# Verificar que PostgreSQL está corriendo
psql --version

# Crear base de datos si no existe
createdb technodragon

# Verificar DATABASE_URL en .env
```

### Error: "JWT Secret not found"

```bash
# Asegurarse que JWT_SECRET está en .env
echo 'JWT_SECRET="tu_clave_aqui"' >> .env
```

### Cloudinary images no cargando

```bash
# Verificar credenciales en .env
CLOUDINARY_CLOUD_NAME=correcto
CLOUDINARY_API_KEY=correcto
CLOUDINARY_API_SECRET=correcto

# Verificar que Next.config.ts tiene el dominio configurado
domains: ['res.cloudinary.com']
```

### El carrito no persiste

```bash
# Verificar que la base de datos está sincronizada
pnpm prisma migrate deploy

# Verificar que localStorage está habilitado en el navegador
```

---

## Monitoreo y Logs

### Logs del Backend

Los logs están centralizados en `src/infrastructure/logger/logger.service.ts`:

```typescript
// Ejemplo de uso
this.logger.log('Mensaje de información', 'ContextName');
this.logger.error('Mensaje de error', error, 'ContextName');
this.logger.warn('Mensaje de advertencia', 'ContextName');
```

### Eventos del Sistema

El sistema de eventos está implementado en `src/infrastructure/events/`:

```typescript
// Emitir evento
this.eventBus.emit({
  name: EventTypes.PRODUCT_CREATED,
  payload: { productId: 'uuid', name: 'Producto' },
  occurredAt: new Date()
});

// Escuchar evento
this.eventBus.on(EventTypes.PRODUCT_CREATED, (event) => {
  // Manejar evento
});
```

---

## Performance y Optimizaciones

### Backend

- **Índices de BD**: Creados en campos de búsqueda frecuente (slug, email, price)
- **Caching**: Implementar Redis para sesiones
- **Paginación**: Todos los listados soportan paginación
- **Validación**: Validaciones en cliente y servidor

### Frontend

- **Next.js Image**: Optimización automática de imágenes
- **Code Splitting**: Por rutas automáticamente
- **React Query**: Caché inteligente de datos
- **Lazy Loading**: Componentes y assets
- **Animations**: GSAP con `willChange` para performance

---

## Estructura de Carpetas

### Backend
```
src/
├── app.module.ts                 # Módulo raíz
├── main.ts                        # Punto de entrada
├── common/                        # Utilidades compartidas
│   ├── constants/                # Constantes
│   ├── decorators/               # Decoradores custom
│   ├── dto/                      # Data Transfer Objects
│   ├── exceptions/               # Excepciones custom
│   ├── guards/                   # Guards de autenticación
│   ├── interceptors/             # Interceptores
│   ├── pipes/                    # Pipes de validación
│   └── utils/                    # Funciones utilitarias
├── config/                        # Configuración
│   ├── configuration.ts          # Config principal
│   ├── env.validation.ts         # Validación de env
│   └── index.ts
├── infrastructure/                # Capas de infraestructura
│   ├── database/
│   │   └── prisma/               # Prisma ORM
│   ├── events/                   # Event bus
│   ├── logger/                   # Sistema de logs
│   └── service/
│       └── cloudinary/           # Integración Cloudinary
└── modules/                       # Módulos de negocio
    ├── auth/                     # Autenticación
    ├── brand/                    # Marcas
    ├── cart/                     # Carrito
    ├── catalog/                  # Catálogo
    ├── categories/               # Categorías
    ├── products/                 # Productos
    └── whatsapp/                 # WhatsApp

prisma/
├── schema.prisma                 # Esquema de BD
└── migrations/                   # Historial de migraciones

test/
├── app.e2e-spec.ts              # Tests E2E
└── jest-e2e.json                # Config Jest E2E
```

### Frontend
```
src/
├── app/                          # App Router de Next.js
│   ├── layout.tsx               # Layout raíz
│   ├── (admin)/                 # Grupo de rutas admin
│   └── (public)/                # Grupo de rutas públicas
├── core/                         # Núcleo de la app
│   ├── api/                     # Cliente HTTP
│   ├── config/                  # Configuración
│   └── providers/               # Providers de React
├── modules/                      # Módulos de negocio
│   ├── admin/                   # Panel administrativo
│   ├── auth/                    # Autenticación
│   ├── catalog/                 # Catálogo
│   ├── landing/                 # Página de inicio
│   ├── product/                 # Detalle de producto
│   ├── api/                     # Métodos API
│   └── hooks/                   # Hooks custom
└── shared/                       # Componentes y utilidades compartidas
    ├── animations/              # Animaciones globales
    ├── components/              # Componentes reutilizables
    ├── context/                 # Context API
    ├── helper/                  # Funciones helper
    ├── hooks/                   # Hooks compartidos
    ├── services/                # Servicios
    ├── types/                   # Tipos TypeScript
    └── utils/                   # Utilidades

public/                           # Assets estáticos
├── landing/                     # Assets de landing
│   ├── hero/                    # Imágenes hero
│   └── logo/                    # Logos
```

---

## Flujo de Desarrollo

### Proceso de Desarrollo

1. **Feature Branch**
   ```bash
   git checkout -b feature/nombre-feature
   ```

2. **Desarrollo Local**
   ```bash
   # Backend
   cd backend && pnpm run start:dev
   
   # Frontend (en otra terminal)
   cd frontend && pnpm run dev
   ```

3. **Testing**
   ```bash
   pnpm test
   pnpm lint
   ```

4. **Commit con Convención**
   ```bash
   # Format: type(scope): description
   git commit -m "feat(products): add product filtering"
   ```

5. **Push y Pull Request**
   ```bash
   git push origin feature/nombre-feature
   ```

---

## Integración WhatsApp

El sistema genera URLs de WhatsApp para compartir productos y carrito:

```
https://wa.me/573144455235?text=Quiero%20información%20sobre%20este%20producto...
```

Configurar el número en `.env`:
```env
WHATSAPP_PHONE=573144455235
```

---

## Cambios Recientes en Migraciones

El proyecto cuenta con 14 migraciones que documentan la evolución del schema:

| Migración | Descripción |
|-----------|-------------|
| `20260313172805_init` | Creación inicial del schema |
| `20260318000700_add_new_entity_in_brand` | Agregado de campos en Brand |
| `20260318154354_add_new_entity_status_in_brand_model` | Estado de Brand |
| `20260318234834_add_time_entity_in_brand_model` | Timestamps en Brand |
| `20260322214855_change_add_is_active_attribute...` | Soft delete en Product |
| `20260326223110_feat_add_enum_of_state...` | Estado de ProductVariant |
| `20260327002852_feat_create_new_model_entity...` | CatalogItem para búsqueda |
| `20260330183719_refactor_add_optional...` | Optional images en Catalog |
| `20260330184317_fix_case_of_image...` | Normalización de nombres |
| `20260330185242_refactor_add_update_at...` | UpdatedAt en Catalog |
| `20260401003254_feat_add_new_entity...` | Sistema de User y Cart |
| `20260403002847_feat_edit_someones_data...` | Refinamientos en Cart |
| `20260420044225_add_is_featured` | Productos destacados |
| `20260421213529_add_is_featured` | Refinamiento de featured |

---

## Contribuciones

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Estándares de Código

- **TypeScript**: Tipos estrictos siempre
- **ESLint**: Ejecutar `pnpm lint --fix` antes de commit
- **Prettier**: Código formateado automáticamente
- **Commits**: Usar conventional commits

---

## Licencia

Este proyecto está bajo la licencia **UNLICENSED** - Todos los derechos reservados.

---

## Contacto y Soporte

**Empresa Actual**: En uso por empresas del sector tecnológico y retail
**Desarrollador Principal**: Esteban Castañeda
**Repositorio**: https://github.com/Esteban2306/technodragon_website

### Contacto
- Email: [contacto]
- WhatsApp: 573144455235
- GitHub: [@Esteban2306](https://github.com/Esteban2306)

---

## Estado del Proyecto

- **En Producción** - Actualmente utilizado por clientes reales
- **Mantenimiento Activo** - Actualizaciones regulares
- **Documentado** - Documentación completa y actualizada
- **Tested** - Suite de tests comprehensive

---

## Notas Importantes

### Seguridad
- Nunca commitear archivos `.env` con secretos reales
- Usar variables de entorno en producción
- Actualizar dependencias regularmente para parches de seguridad

### Base de Datos
- Hacer backups regulares
- Revisar migraciones antes de ejecutar en producción
- Mantener índices optimizados

### Performance
- Monitorear logs regularmente
- Implementar caché donde sea necesario
- Usar CDN para assets estáticos

---

## Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [JWT Guide](https://jwt.io/introduction)

---

<p align="center">
  <strong>TechnoDragon - Elevando el E-Commerce a Otro Nivel</strong>
</p>

<p align="center">
  <sub>Construido por Esteban Castañeda | Actualizado: Mayo 2026</sub>
</p>
