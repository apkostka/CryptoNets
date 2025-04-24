/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            transparent: "transparent",
            primary: "#2E3945",
            secondary: "#525C65",
            gray: "#C1C3C6",
            white: "#EDEDED",
            blue: "#2E3945",
            red: "#C93D3A",
            yellow: "#EFCB2B",
            green: "#1C9A42"
        },
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
}
