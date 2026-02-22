import { create } from 'zustand';

const useThemeStore = create((set) => ({
  darkMode: localStorage.getItem('acadrix_dark') === 'true',
  focusMode: false,

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem('acadrix_dark', newMode);
      document.documentElement.classList.toggle('dark', newMode);
      return { darkMode: newMode };
    }),

  toggleFocusMode: () =>
    set((state) => ({ focusMode: !state.focusMode })),

  initTheme: () =>
    set((state) => {
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      }
      return state;
    }),
}));

export default useThemeStore;
