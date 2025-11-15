// frontend/src/utils/validators.ts

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida longitud mínima de contraseña
 */
export const isValidPassword = (password: string, minLength: number = 6): boolean => {
  return password.length >= minLength;
};

/**
 * Valida que el título de tarea no esté vacío
 */
export const isValidTaskTitle = (title: string): boolean => {
  return title.trim().length > 0 && title.length <= 255;
};

/**
 * Valida nombre de usuario
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.length <= 100;
};

/**
 * Validación de formulario de login
 */
export const validateLoginForm = (email: string, password: string): string | null => {
  if (!email.trim()) return "El correo es requerido";
  if (!isValidEmail(email)) return "Formato de correo inválido";
  if (!password) return "La contraseña es requerida";
  if (!isValidPassword(password)) return "La contraseña debe tener al menos 6 caracteres";
  return null;
};

/**
 * Validación de formulario de registro
 */
export const validateRegisterForm = (
  name: string, 
  email: string, 
  password: string
): string | null => {
  if (!name.trim()) return "El nombre es requerido";
  if (!isValidName(name)) return "El nombre debe tener entre 2 y 100 caracteres";
  if (!email.trim()) return "El correo es requerido";
  if (!isValidEmail(email)) return "Formato de correo inválido";
  if (!password) return "La contraseña es requerida";
  if (!isValidPassword(password)) return "La contraseña debe tener al menos 6 caracteres";
  return null;
};