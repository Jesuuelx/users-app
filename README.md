# UsersApp

## Dev

1. Clonar el proyecto
2. Ejecutar `npm install`
3. Levantar backend `npm run backend`
4. Ejecutar la app `npm start` o bien `ng serve -o`
5. Una vez ya corriendo el proyecto puedes ejecutar el comando `npm run test ` para correr los test automatizados en playwright, asegurate que tu localhost coincida con la url del archivo de testing

## Arquitectura del Proyecto

La arquitectura del proyecto esta basada en Angular con Typescript, adicionalmente consta de de la versión angular 19, y tiene algunas depencias importantes como: Material y primeflex para el tema de estilos.

## nota

Tener una versión de node > 20
Tener git instalado para clonar o si no descargar zip

# Proyecto Users App

Proyecto de una aplicación web diseñada para que el usuario pueda visualizar un dashboard de una lista de usuarios que pertecenecen a una base de datos de una app de mensajeria, en este aplicativo, podemos observar una lista de usuario, detalle de la información del mismo, un buscador para llegar mas rapido a cada usuario de manera independiente asi tambien como un historial de mensajes de cada usuario.

## Arquitectura del Proyecto

La app esta realizada en Angular 19, adicionalmente se usaron librerias como material y flex prime para los estilos y el diseño responsivo, se utilizo playwright para test automatizados y agregamos una dependencia de desarrollo que es json server para simular un backend

### Modulos Principales

- **users**: Este consta de varias paginas importantes, layout page es lo que nos permite que el diseño que tenga esta pagina sea transparente en todos los demas componentes a continuacion, es decir que sea el mismo, list page que es la vista principal, search page que es la pagina donde esta el buscador que filtra los usuarios, chat page para ver el historial de cada usuario y user page que consta de el detalle del usuario
- **material**: Este modulo se hizo exclusivamente para centralizar los componentes utilizados de la libreria material y de esta manera tener todo centralizado y tocar un solo archivo de ser necesario
- **shared**: este modulo se hizo para centralizar una pagina de errores, esta aparece cuando elegimos una ruta que no existe sin embargo no tiene diseño
- **auth** : la idea principal era iniciar desde un login pero no dio tiempo este modulo centraliza un layout personalizado lo que nos permite escalar a futuro en una pagina de registro tambien con diseño similar ademas de que se rige que la idea principal es que la pagina sea una web tipo administrador
  la ruta existe y podemos visualizar el modulo con el path /auth pero no es funcional hasta el momento

## LazyLoad

se implemento un lazy load por modulos lo cual, la app se divide en dos rutas principales auth y users y mientras no se cargue una u otra no se cargara en el arbol de componentes
