/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            colors: {
                black: 'var(--color-black)',
                surface: 'var(--color-surface)',
                teal: 'var(--color-teal)',
                'teal-dim': 'var(--color-teal-dim)',
                red: 'var(--color-red)',
                offwhite: 'var(--color-offwhite)',
                grey: 'var(--color-grey)',
                'scene-bg': 'var(--color-scene-bg)',
                'scene-grid': 'var(--color-scene-grid)'
            },
            fontFamily: {
                necto: ['NectoMono', 'monospace'],
                montserrat: ['MontserratCustom', 'Montserrat', 'sans-serif'],
                serif: ['Cormorant Garamond', 'serif']
            }
        }
    }
};
