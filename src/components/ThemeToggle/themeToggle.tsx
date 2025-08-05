import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      className="relative inline-flex h-6 w-11 m-4 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      style={{
        backgroundColor: theme === 'dark' ? '#4C1D95' : '#A78BFA',
      }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      {/* Ícones opcionais */}
      <span className="sr-only">Alternar tema</span>
      <span
        className="absolute left-1 text-xs text-white"
        style={{ opacity: theme === 'light' ? 1 : 0 }}
      >
        ☀️
      </span>
      <span
        className="absolute right-1 text-xs text-white"
        style={{ opacity: theme === 'dark' ? 1 : 0 }}
      >
        🌙
      </span>
    </button>
  );
}