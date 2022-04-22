# POO-PIA
Producto Integrador de Aprendizaje de la Unidad de Aprendizaje "Programación Orientada a Objetos"

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
- Correr webpack (esto es lo unico que se necesita despues de hacer el setup)
```powershell
npx webpack
```
- El archivo .js actualizado se encuentra en `dist/bundle.js`
