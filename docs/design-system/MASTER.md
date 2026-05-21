# Design System Master — Preset Apple Clean

## 1. Palette de Cores
- **Background**: `#F9F9FB`
- **Surface**: `#FFFFFF`
- **Primary**: `#0F172A`
- **Secondary**: `#64748B`
- **Accent**: `#10B981`
- **Border**: `#E2E8F0`

## 2. Tipografia
- **Títulos**: Geist (Geist Sans / Geist Mono)
- **Corpo**: Inter

## 3. Regra de Cantos (Border Radius)
Obrigatório o uso da classe `.squircle` baseada em clip-path SVG em todos os cards corporativos para emular com precisão a curvatura contínua e suave da Apple (smooth corners / G2 curvature), evitando cantos arredondados comuns (`border-radius` padrão).

### Classe CSS sugerida:
```css
.squircle {
  clip-path: url('#squircle-clip'); /* Requer SVG correspondente no DOM */
}
```
ou utilizando uma máscara / clip-path CSS gerada:
```css
.squircle {
  clip-path: path('M 0,20 C 0,5 5,0 20,0 L 80,0 C 95,0 100,5 100,20 L 100,80 C 100,95 95,100 80,100 L 20,100 C 5,100 0,95 0,80 Z');
}
```
