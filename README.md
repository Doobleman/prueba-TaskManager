## TASK MANAGER APK - Prueba Técnica

## Descripción

Proyecto parte de prueba tecnica que incluye backend desarrolado en .NET y con frontend en React.
Permite a sus usuarios, marcar como completas o eliminar tareas. Posee un filtro para filtrar
entre todos, completadas y pendientes.

##Requisitos previos

### Backend (.Net)
SDK de .NET 8.0 (https://dotnet.microsoft.com/es-es/download/dotnet/thank-you/sdk-8.0.402-windows-x64-installer)
Base de datos SQLite

### Frontend (React)
Yarn (https://yarnpkg.com/getting-started/install)

## Instrucciones para ejecutar el Proyecto

### 1. Clonar el repositorio

git clone https://github.com/Doobleman/prueba-TaskManager.git
cd task-manager-app

### 2. Configurar el Backend
cd TaskManager.Api
dotnet ef database update
dotnet run

### 3. Configurar el Frontend
cd TaskManager.Web
yarn
yarn dev
(Asegurarse de que este levantado en http://localhost:5173)
