# GreenMarket - Sistema de Trazabilidad Logística

## Descripción del Proyecto

GreenMarket es una aplicación web desarrollada como parte de la asignatura Desarrollo y Gestión de Sistemas de Información. Su objetivo principal es visualizar las rutas logísticas de productos agrícolas desde un centro de distribución en Madrid hacia diversas ciudades de España. La aplicación utiliza un mapa interactivo para mostrar las rutas, marcadores con información de productos, y una lista de distribución. Los usuarios pueden ver de manera clara y visual los orígenes de los productos agrícolas y las rutas que siguen hasta su destino.

### Características Principales
- **Mapa Interactivo**: Visualización de rutas logísticas desde Madrid a diferentes ciudades usando `react-leaflet`.
- **Marcadores con Popups**: Cada ciudad tiene un marcador que, al hacer clic, muestra un popup con los productos distribuidos (ej. Tomate, Naranja) e imágenes asociadas.
- **Rutas de Colores**: Polilíneas de diferentes colores conectan Madrid con cada destino.
- **Lista de Rutas**: Una lista debajo del mapa muestra todas las rutas de distribución con los productos correspondientes.
- **Imágenes de Productos**: Miniaturas de productos (50x50px) obtenidas desde URLs externas de Pixabay, con manejo de errores.

## Instalación

### Prerrequisitos
- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior)

### Pasos de Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/greenmarket.git
   cd greenmarket
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador y navega a `https://greenmarket.surge.sh/` para ver el mapa de rutas logísticas.

## Uso

1. **Navega a la Sección de Logística**:
   - Al abrir la aplicación, dirígete a la ruta `/logistica` para ver el mapa interactivo.

2. **Explora el Mapa**:
   - Haz zoom y desplázate por el mapa para ver las rutas desde Madrid a las diferentes ciudades.
   - Haz clic en un marcador para abrir un popup con la lista de productos distribuidos desde esa ciudad.

3. **Consulta la Lista de Rutas**:
   - Debajo del mapa, encontrarás una lista de todas las rutas de distribución, con los productos asociados y colores correspondientes a las polilíneas.

## Tecnologías Utilizadas

- **Frontend**:
  - React.js (con Vite como bundler)
  - `react-leaflet` para el mapa interactivo
  - Leaflet.js (versión 1.9.4)
  - CSS puro para los estilos

- **Fuentes de Datos**:
  - Coordenadas de ciudades obtenidas manualmente y almacenadas en `cityCoordinates`.
  - Imágenes de productos obtenidas desde Pixabay (URLs externas).

- **Dependencias Principales**:
  - `react-leaflet`: Para integrar Leaflet con React.
  - `leaflet`: Biblioteca base para el mapa.
  - `react` y `react-dom`: Para el desarrollo de la interfaz.

## Retos Técnicos Superados

### Problemas de CORS con Imágenes Externas
- **Problema**: Las imágenes de productos de Pixabay no se cargaban debido a restricciones de CORS.
- **Solución**: Se añadió el atributo `crossOrigin="anonymous"` a las etiquetas `<img>` y se usaron versiones más pequeñas de las imágenes (`_640.jpg`) para mejorar el rendimiento.

### Carga de Íconos de Marcadores
- **Problema**: Los íconos de Leaflet no se cargaban desde `unpkg.com` debido a problemas de red o CORS.
- **Solución**: Se actualizó la configuración para usar la versión 1.9.4 de Leaflet y se verificaron las URLs de los íconos (`marker-icon.png`, `marker-shadow.png`).

### Visualización de Tooltips
- **Problema**: Los tooltips de los marcadores mostraban "MARK" en lugar del nombre de la ciudad.
- **Solución**: Se añadió el atributo `title` a cada marcador con el nombre de la ciudad (ej. `title="Madrid"`) y se aseguró que los íconos se cargaran correctamente.

## Decisiones de Diseño

- **Uso de URLs Externas para Imágenes**: Se optó por usar URLs de Pixabay en lugar de imágenes locales para simplificar el mantenimiento y cumplir con los requisitos del proyecto. Esto permitió incluir una amplia variedad de imágenes de productos agrícolas.
- **Tamaño de las Imágenes**: Las miniaturas se configuraron a 50x50px para mantener los popups compactos y mejorar la experiencia del usuario.
- **Colores de las Rutas**: Se usaron diferentes colores para las polilíneas para facilitar la distinción entre rutas en el mapa y la lista de distribución.
- **Mapa Centrado en España**: El mapa se centra en las coordenadas `[40.0, -3.0]` con un zoom inicial de 6 para mostrar toda España de manera clara.

## Limitaciones

- **Dependencia de URLs Externas**: La carga de imágenes depende de la disponibilidad de Pixabay, lo que puede causar problemas si las URLs dejan de funcionar.
- **Falta de Datos en Tiempo Real**: Los datos de trazabilidad y productos son estáticos y no se actualizan en tiempo real.

## Conclusión

GreenMarket cumple con los objetivos establecidos para la asignatura, proporcionando una herramienta visual e interactiva para rastrear rutas logísticas de productos agrícolas. A pesar de los retos técnicos, como problemas de CORS y carga de íconos, se lograron soluciones efectivas que aseguran la funcionalidad del proyecto.

## Autores

- Fernando Martin, Angel Luis Lara, Ingrid Niveiro and TingTing Xu - Estudiantes de Desarrollo y Gestion de Sistemas de la Información, UCLM
  Roles: Desarrollo Frontend, Documentación, Gestión.

## Licencia

GreenMarket

Copyright © 2025 Fernando Martin, Angel Luis Lara, Ingrid Niveiro, and TingTing Xu

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.

To view a copy of this license, visit https://creativecommons.org/licenses/by-nc/4.0/ or see the  file in the project root.

---

*Última actualización: 01/05/2025*
