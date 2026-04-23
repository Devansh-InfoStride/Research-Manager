---
name: The Design System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#5c4038'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#917066'
  outline-variant: '#e5beb3'
  surface-tint: '#af3100'
  primary: '#aa2f00'
  on-primary: '#ffffff'
  primary-container: '#d53d00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59f'
  secondary: '#625f4d'
  on-secondary: '#ffffff'
  secondary-container: '#e8e3cc'
  on-secondary-container: '#686553'
  tertiary: '#8b4c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac620e'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb59f'
  on-primary-fixed: '#3a0a00'
  on-primary-fixed-variant: '#852300'
  secondary-fixed: '#e8e3cc'
  secondary-fixed-dim: '#ccc7b1'
  on-secondary-fixed: '#1e1c0e'
  on-secondary-fixed-variant: '#4a4737'
  tertiary-fixed: '#ffdcc1'
  tertiary-fixed-dim: '#ffb779'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#6c3a00'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  h1:
    fontFamily: spaceGrotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: spaceGrotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: spaceGrotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: spaceGrotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  2xl: 128px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

This design system is built on a foundation of intellectual precision and technical avant-garde. It strikes a balance between the raw, structural honesty of **Minimalism** and the functional clarity required for high-density information. The aesthetic evokes the feeling of a high-end research laboratory: clean, intentional, and quiet.

The visual language focuses on "the architecture of information." By utilizing significant whitespace alongside rigid, mathematical alignment, the design system transforms complex data into digestible insights. The emotional response is one of confidence and calm, positioning the interface as a sophisticated tool for advanced computation and analysis.

## Colors

The palette is anchored by a warm, paper-like background (#F9F3DC) that distinguishes the interface from the sterile whites of typical SaaS products. This "parchment" base suggests an intellectual, literary quality to the AI experience.

- **Primary Accent:** A high-vibrancy orange (#FF500F) is used sparingly for critical actions and brand-defining moments.
- **Support Accents:** Muted ochre (#D3812F) and deep sienna (#B35D20) provide tonal depth for data visualization without breaking the minimalist harmony.
- **Grayscale:** Deep blacks and sophisticated grays are used to create hierarchy. Pure black is reserved for primary headlines and technical values to maintain high-tech contrast.

## Typography

Typography is the primary vehicle for the "high-tech" aesthetic. 

- **Space Grotesk** is used for headlines and labels. Its geometric, slightly idiosyncratic letterforms convey a sense of innovation and technical precision.
- **Inter** handles the heavy lifting for body copy and data tables. It is chosen for its exceptional legibility at small sizes and its neutral, utilitarian character.

For technical data or model comparisons, use a monospace-like treatment (Inter with tabular figures) to ensure vertical alignment of digits.

## Layout & Spacing

The design system utilizes a **fixed-width grid** centered within the viewport to maintain an editorial feel on ultra-wide displays. A 12-column system provides the structure, with generous 64px or 128px margins (2xl) to allow the content to "breathe."

Data density is managed through a strict 4px baseline rhythm. While page-level margins are expansive, component-level spacing is kept tight and disciplined, emphasizing the relationship between data points in complex tables and comparison views.

## Elevation & Depth

This system avoids traditional shadows in favor of **Tonal Layering** and **Low-Contrast Outlines**.

Depth is achieved by placing white surfaces over the parchment background (#F9F3DC). To distinguish between interactive elements, a hair-line border (1px) in a subtle gray is used. For high-priority modals or "pop-over" elements, a very subtle, large-radius ambient shadow (5-10% opacity black) may be used to provide just enough lift to separate the layer without compromising the flat, modernist aesthetic.

## Shapes

The shape language is predominantly **Soft (1)**. Elements feature a 0.25rem (4px) corner radius. This minimal rounding retains the "high-tech" architectural feel of sharp corners while subtly softening the user experience to feel more modern and accessible.

Buttons and input fields should strictly adhere to this radius. Larger containers, such as cards, may scale to 8px (rounded-lg) to maintain visual proportion.

## Components

- **Buttons:** Primary buttons are solid Black (#000000) with White text. Secondary buttons use a transparent background with a 1px Black border. The accent Orange (#FF500F) is reserved for specialized "Call to Action" or "New" indicators.
- **Input Fields:** Minimalist design with a 1px border. Focus states are indicated by a weight increase in the border or a subtle highlight in the primary orange.
- **Comparison Tables:** Tables are the centerpiece of the system. They use hair-line horizontal dividers and no vertical lines. Headers are in uppercase Space Grotesk (label) for a technical look. Alternate rows may use a very subtle fill difference for readability.
- **Chips/Badges:** Small, rectangular badges with the Soft (1) radius. Use a light gray background or a low-opacity version of the accent colors for categorization.
- **Cards:** White backgrounds with no shadow, defined by 1px light gray borders. Used to group related model parameters or documentation snippets.
- **Code Blocks:** Dark-themed blocks (Deep Gray/Black) to provide a high-contrast anchor against the light-themed UI, emphasizing the "developer-first" nature of the product.