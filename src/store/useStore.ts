
import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  toggleDarkMode: () => void;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isDarkMode: false,
  isMobileMenuOpen: false,
  isLoading: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newMode };
  }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
