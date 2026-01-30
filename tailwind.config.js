export const theme = {
  extend: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      googlesansflex: ["Google Sans Flex", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    animation: {
      shimmer: "shimmer 2s infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    keyframes: {
      shimmer: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(100%)" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.5" },
      },
    },
  },
};
