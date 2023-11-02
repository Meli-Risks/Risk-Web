# Risk WEB

## 1. Despliegue Local
1. Primero, clona el repositorio en tu máquina local:

   ``
   git clone <url_del_repositorio>
   ``

2. Navega hasta el directorio del proyecto:

   ``
   cd <nombre_del_directorio_del_proyecto>
   ``

3. Instala las dependencias necesarias:

   ``
   npm install
   ``

4. Inicia la aplicación:

   ``
   npm start
   ``

5. Tu aplicación React ahora debería estar corriendo en http://localhost:3000.

## Despliegue con Docker

Asegúrate de estar en el directorio del proyecto donde se encuentra el Dockerfile.

1. Construye la imagen de Docker:

   ``
   docker build -t <nombre_de_la_imagen> .
   ``

2. Corre el contenedor de Docker:

   ``
   docker run -p 3000:3000 <nombre_de_la_imagen>
   ``

3. Ahora, tu aplicación React debería estar corriendo en http://localhost:3000.

Por favor, reemplaza <url_del_repositorio>, <nombre_del_directorio_del_proyecto> y <nombre_de_la_imagen> con los valores correspondientes a tu proyecto
