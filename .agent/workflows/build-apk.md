---
description: Generar APK de Android para Nos Falta Uno
---

# Workflow: Generar APK de Android

Este workflow te guía para generar una APK de Android que puedas instalar en tu celular.

## Prerrequisitos

- ✅ Android Studio instalado
- ✅ Java JDK 17 o superior
- ✅ Variables de entorno ANDROID_HOME y JAVA_HOME configuradas

## Pasos

### 1. Build del proyecto Next.js y sincronización

```bash
npm run cap:sync
```

Este comando:
- Ejecuta `npm run build` para generar los archivos estáticos en `/out`
- Sincroniza los archivos con el proyecto Android usando `npx cap sync`

### 2. Abrir el proyecto en Android Studio

// turbo
```bash
npx cap open android
```

Esto abrirá Android Studio con el proyecto Android.

### 3. Generar APK en Android Studio

Una vez abierto Android Studio:

1. **Espera a que Gradle termine de sincronizar** (barra de progreso en la parte inferior)
2. Ve a: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Espera a que termine el proceso (verás una notificación)
4. Haz clic en **locate** en la notificación para encontrar la APK

La APK se generará en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. Instalar en tu celular

**Opción A: Usando cable USB**
1. Conecta tu celular por USB
2. Habilita "Depuración USB" en las opciones de desarrollador
3. En Android Studio: **Run → Run 'app'**

**Opción B: Transferir APK manualmente**
1. Copia `app-debug.apk` a tu celular
2. Abre el archivo en tu celular
3. Permite instalación de fuentes desconocidas si es necesario
4. Instala la app

## Comandos útiles

### Ejecutar en dispositivo conectado
```bash
npm run cap:run:android
```

### Solo abrir Android Studio
```bash
npm run cap:open:android
```

### Sincronizar cambios sin rebuild completo
```bash
npx cap sync
```

## Notas importantes

- La APK de debug es solo para pruebas
- Para producción, necesitarás generar una APK firmada (release)
- Los cambios en el código Next.js requieren ejecutar `npm run build` y `npx cap sync`

## Troubleshooting

### Error: ANDROID_HOME no está configurado
```bash
# Windows
setx ANDROID_HOME "C:\Users\TuUsuario\AppData\Local\Android\Sdk"
```

### Error: Java version
Asegúrate de tener Java JDK 17:
```bash
java -version
```

### La app no se actualiza
1. Desinstala la app del celular
2. Ejecuta `npm run cap:sync`
3. Vuelve a generar la APK
