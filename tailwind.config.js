export const theme = {
    extend: {
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
            googlesansflex: ['Google Sans Flex', 'sans-serif'],
            poppins: ['Poppins', 'sans-serif'],
        },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
};