# 💰 Calculadora de Nómina y Cambio en Efectivo

Una aplicación web de una sola página diseñada para resolver el problema más común en la administración de nóminas en efectivo: **¿Qué billetes y monedas debo llevar al banco para cambiarlos por las denominaciones que necesito para armar los sobres de pago?**

## 🎯 Problema que Resuelve

Cuando pagas nómina en efectivo, te enfrentas a estos desafíos:

1. **Tienes efectivo en caja** - Pero no necesariamente en las denominaciones correctas
2. **Necesitas armar sobres** - Cada empleado requiere una combinación específica de billetes y monedas
3. **No sabes qué cambiar** - ¿Cuántos billetes de $1000 cambio por billetes de $200? ¿Necesito monedas?

**Esta calculadora te dice exactamente:**
- ✅ Qué billetes/monedas llevar al banco (lo mínimo necesario)
- ✅ Qué denominaciones pedir a cambio
- ✅ Cómo armar cada sobre de forma óptima

---

## 🚀 Características Principales

### 1. **Carga de Nómina desde CSV**
- Importa tu lista de empleados con sus sueldos
- Formato simple: dos columnas (`nombre`, `sueldo_quincena`)
- Incluye plantilla descargable de ejemplo

### 2. **Inventario de Efectivo Disponible**
- Registra el efectivo exacto que tienes en caja
- Soporta billetes: $2000, $1000, $500, $200, $100, $50, $20
- Soporta monedas: $20, $10, $5, $2, $1, $0.50
- Cálculo automático del total disponible

### 3. **Algoritmo de Optimización Inteligente**
- Calcula el **mínimo efectivo** que debes llevar al banco
- Usa programación dinámica (bounded knapsack) para encontrar la mejor combinación
- Prioriza usar el efectivo disponible antes de ir al banco

### 4. **Instrucciones Claras para el Banco**
Un resumen en dos pasos:
- **PASO 1**: Qué llevar al banco (de tu caja)
- **PASO 2**: Qué pedir a cambio (denominaciones específicas)

### 5. **Desglose por Empleado**
- Muestra los billetes y monedas exactos para cada sobre
- Lista detallada empleado por empleado
- Formato fácil de seguir mientras armas los sobres

### 6. **Tabla de Diferencias**
- Compara lo "Necesario" vs "Disponible" por denominación
- Identifica rápidamente qué te falta y qué te sobra
- Códigos de color para visualización rápida

### 7. **Persistencia Automática**
- Guarda tu inventario de efectivo en localStorage
- No pierdes tu trabajo al recargar la página
- Cálculo reactivo: se actualiza automáticamente al cambiar valores

---

## 📋 Instrucciones de Uso

### Preparación Inicial

1. **Descarga la plantilla CSV**
   - Haz clic en el botón **"Descargar Plantilla"**
   - Abre el archivo en Excel, Google Sheets o un editor de texto

2. **Llena tus datos**
   - Columna `nombre`: Nombre del empleado
   - Columna `sueldo_quincena`: Monto a pagar (usa punto `.` para decimales)
   - Ejemplo:
     ```csv
     nombre,sueldo_quincena
     Juan Perez,3500.50
     Maria Garcia,4200.00
     Carlos Lopez,3850.75
     ```

### Uso de la Calculadora

**PASO 1: Cargar Nómina**
- Haz clic en "Seleccionar archivo" y sube tu CSV
- Verás un resumen: total a pagar y número de empleados
- El botón "Calcular" se habilitará automáticamente

**PASO 2: Efectivo Disponible**
- Cuenta tus billetes y monedas en caja
- Ingresa las cantidades en cada campo
- El total disponible se actualiza en tiempo real

**PASO 3: Calcular**
- Presiona el botón **"Calcular Cambio Necesario"**
- ¡Listo! La aplicación te mostrará los resultados

### Interpretando los Resultados

#### 📋 Instrucciones para el Banco
El cuadro más importante. Te indica:

**💼 PASO 1: Llevar al banco**
- Qué billetes/monedas sacar de tu caja
- Cantidad exacta de cada denominación

**🔄 PASO 2: Cambiar por**
- Las denominaciones específicas que debes pedir
- Desglose completo de lo que recibirás
- El banco te regresa **el mismo monto** pero en otras denominaciones

**💡 Nota adicional**
- Si llevas más de lo que necesitas, te indica cuánto "extra" tendrás en caja después del cambio

#### 📊 Detalle de Cambio (Tabla)
Comparativa por denominación:
- **Necesario**: Cuántas piezas necesitas para los sobres
- **Disponible**: Cuántas piezas tienes en caja
- **Diferencia**: 
  - ❌ Rojo = Faltan X piezas
  - ✅ Verde = Sobran X piezas
  - ⚪ Gris = OK (cuadra exacto)

#### 👥 Desglose por Empleado
Guía para armar cada sobre:
- Nombre del empleado
- Sueldo total
- Billetes y monedas exactos para ese sobre

---

## 📄 Formato del Archivo CSV

### Requisitos Obligatorios

El archivo `.csv` **debe** tener estas dos columnas en la cabecera:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `nombre` | Texto | Nombre del empleado |
| `sueldo_quincena` | Número | Monto a pagar (usar punto `.` como decimal) |

### Ejemplo Válido

```csv
nombre,sueldo_quincena
Juan Perez,3500.50
Maria Garcia,4200.00
Carlos Lopez,3850.75
Diego Maradona,12345
```

### ⚠️ Errores Comunes

❌ **Usar coma como decimal**
```csv
nombre,sueldo_quincena
Juan Perez,3500,50  ← MAL (usa punto, no coma)
```

❌ **Nombres de columnas incorrectos**
```csv
empleado,salario  ← MAL (debe ser "nombre" y "sueldo_quincena")
Juan Perez,3500.50
```

❌ **Valores no numéricos en sueldo**
```csv
nombre,sueldo_quincena
Juan Perez,$3500.50  ← MAL (sin símbolo de pesos)
```

✅ **Correcto**
```csv
nombre,sueldo_quincena
Juan Perez,3500.50
```

---

## 🧮 Algoritmo y Lógica

### Proceso de Cálculo

1. **Análisis del Efectivo Disponible**
   - Lee el inventario actual de billetes y monedas
   - Calcula el total disponible en pesos

2. **Cálculo de Necesidades**
   - Para cada empleado, determina el desglose óptimo de su sueldo
   - Prioriza usar el efectivo disponible en caja
   - Lo que falta se marca como "necesario del banco"

3. **Optimización del Cambio** (Bounded Knapsack)
   - Encuentra la **mínima cantidad** de dinero a llevar al banco
   - Garantiza que puedas obtener todas las denominaciones faltantes
   - Usa programación dinámica para eficiencia

4. **Generación de Instrucciones**
   - Crea el plan de acción paso a paso
   - Presenta los resultados en formato claro y accionable

### Ejemplo Práctico

**Situación:**
- Nómina total: $23,896.25
- Efectivo en caja: 40 billetes de $1,000 = $40,000

**Necesitas para armar sobres:**
- Billetes más chicos y monedas específicas
- Total necesario: $1,897 en denominaciones faltantes

**Resultado de la calculadora:**
```
💼 PASO 1: Llevar al banco
Lleva de tu caja: $2,000.00
- 2 × $1000

🔄 PASO 2: Cambiar por
Pide que te cambien esos $2,000.00 por:
- 2 × $500
- 3 × $200
- 2 × $100
- 1 × $50
- 2 × $20
- 1 × $5
- 1 × $1
- 2 × $0.5

✓ El banco te regresa los mismos $2,000 pero en las denominaciones que necesitas.

💡 Nota: Con los $2,000 que cambias, cubres los $1,897 que necesitas 
y te quedan $103 extra en tu caja (en las denominaciones cambiadas).
```

---

## 💾 Tecnología y Características Técnicas

### Stack Tecnológico
- **HTML5** + **Tailwind CSS** (vía CDN)
- **JavaScript Vanilla** (sin dependencias externas)
- **FileReader API** para procesamiento de CSV
- **localStorage** para persistencia de datos

### Algoritmos Implementados
- **Greedy Algorithm**: Desglose inicial por empleado
- **Dynamic Programming**: Bounded knapsack para optimización del cambio
- **Binary Splitting**: Optimización de items en el knapsack

### Compatibilidad
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Responsive design (funciona en móvil, tablet y desktop)
- ✅ Sin necesidad de conexión a internet (después de cargar)
- ✅ Sin backend - 100% cliente

---

## 🔒 Privacidad y Seguridad

- ✅ **100% local**: Todo el procesamiento ocurre en tu navegador
- ✅ **Sin servidor**: No se envían datos a ningún servidor externo
- ✅ **Sin internet**: Funciona offline después de la carga inicial
- ✅ **Datos privados**: Tu información de nómina nunca sale de tu computadora

---

## 📝 Notas y Limitaciones

### Denominaciones Soportadas

**Billetes:** $2000, $1000, $500, $200, $100, $50, $20
**Monedas:** $20, $10, $5, $2, $1, $0.50

### Consideraciones

- La app redondea a centavos (dos decimales)
- Si un sueldo tiene centavos menores a $0.50, se ajusta con moneda de $0.50 o $1
- El algoritmo prioriza denominaciones grandes primero (greedy)
- El cambio mínimo se calcula considerando **todo** tu efectivo disponible

---

## 🤔 Preguntas Frecuentes (FAQ)

**P: ¿Por qué me dice que lleve más dinero del que necesito?**
**R:** El algoritmo busca el mínimo que puedes llevar para obtener las denominaciones exactas. A veces es necesario llevar un poco más porque el banco no puede darte "cambio" - solo intercambiar por las denominaciones que pides.

**P: ¿Qué hago con el dinero "extra" que menciona?**
**R:** Ese dinero extra queda en tu caja en las denominaciones cambiadas. No es dinero adicional, simplemente es la diferencia entre lo que llevaste y lo que estrictamente necesitabas.

**P: ¿Puedo modificar las denominaciones disponibles?**
**R:** Actualmente la app tiene las denominaciones fijas de México. Si necesitas otras denominaciones, habría que modificar las constantes `DENOMINATIONS_BILLS` y `DENOMINATIONS_COINS` en el código.

**P: ¿Qué pasa si no tengo suficiente efectivo en caja?**
**R:** La app te lo indica claramente y te dice cuánto dinero adicional necesitas aportar desde fuera.

**P: ¿Guarda mi información?**
**R:** Sí, usa localStorage para guardar el inventario de efectivo. La nómina (nombres y sueldos) NO se guarda por privacidad - debes cargar el CSV cada vez.

---

## 🛠️ Instalación y Uso

### Opción 1: Uso Directo
1. Descarga el archivo `calculadoraNomina.html`
2. Ábrelo en tu navegador (doble clic)
3. ¡Listo para usar!

### Opción 2: Servidor Local
```bash
# Si tienes Python 3
python -m http.server 8000

# Si tienes Node.js
npx http-server

# Luego abre: http://localhost:8000/calculadoraNomina.html
```

---

## 🎯 Casos de Uso Reales

### Caso 1: Negocio con Nómina Semanal
- Empleados: 15 personas
- Rango de sueldos: $800 - $5,000 por semana
- Problema: Solo tienes billetes grandes
- **Solución:** La app te dice exactamente qué cambiar cada semana

### Caso 2: Empresa Mediana
- Empleados: 50+ personas
- Pago quincenal
- Múltiples cajeros armando sobres
- **Solución:** Desglose por empleado facilita distribuir el trabajo

### Caso 3: Administrador de Varios Negocios
- Necesitas optimizar viajes al banco
- Quieres minimizar el efectivo que sacas de caja
- **Solución:** Algoritmo de cambio mínimo reduce lo que llevas al banco

---

## 📞 Soporte y Contacto

Para preguntas, sugerencias o reportar errores:
- Crea un issue en el repositorio
- Consulta esta documentación primero

---

## 📜 Licencia

Este proyecto es de uso libre. Puedes modificarlo y adaptarlo a tus necesidades.

---

## 🙏 Agradecimientos

Desarrollado para resolver un problema real en la administración de nóminas en efectivo en México.

**Versión:** 2.0
**Última actualización:** Octubre 2024

---

## 🚦 Estado del Proyecto

✅ **Funcional y probado**
- Algoritmo optimizado con bounded knapsack
- Interfaz mejorada con instrucciones claras
- Redacción corregida para evitar confusiones sobre "cambio"

---

*¿Encontraste útil esta herramienta? ¡Compártela con otros administradores!* 💼