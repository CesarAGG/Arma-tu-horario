# Arma-tu-horario

Producto Integrador de Aprendizaje de la Unidad de Aprendizaje "Programación Orientada a Objetos"

Tambien es proyecto personal, pienso seguirlo actualizando

## Construir el proyecto (Primera vez)

- Instalar node.js (esto depende del sistema operativo, con esto se instala tambien npm)
- Abrir una terminal y navegar al directorio del proyecto
- Comprobar que npm y node estan instalados checando su version

```powershell
npm -v
node -v
```

- Instalar TypeScript

```powershell
npm install -g typescript
```

- Inicializar

```powershell
npm init -y
```

- Instalar webpack

```powershell
npm install webpack webpack-cli --save-dev
```

- Instalar tsloader

```powershell
npm install typescript ts-loader --save-dev
```

- Correr npm run build (esto es lo unico que se necesita despues de hacer el setup, la ventaja de usar este comando es que puedes configurar tu IDE para que lo haga por ti con cierta combinacion de teclas)

```powershell
npm run build
```

- El archivo .js actualizado se encuentra en `dist/bundle.js`
