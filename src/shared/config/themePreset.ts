import { definePreset } from '@primeuix/themes'
import Material from "@primeuix/themes/material";

export const themePreset = definePreset(Material, {
    semantic: {
        primary: {
            50: "#f5faff",
            100: "#cee5fe",
            200: "#a7d0fd",
            300: "#81bbfc",
            400: "#5aa7fb",
            500: "#3392fa",
            600: "#2b7cd5",
            700: "#2466af",
            800: "#1c508a",
            900: "#143a64",
            950: "#0d253f"
        },
    },
})
