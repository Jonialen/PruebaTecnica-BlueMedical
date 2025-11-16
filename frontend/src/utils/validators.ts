// validators.ts (src/utils/validators.ts)

/**
 * Valida si una cadena de texto tiene un formato de correo electrónico válido.
 * @param {string} email - El correo electrónico a validar.
 * @returns {boolean} `true` si el formato es válido, `false` en caso contrario.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con la longitud mínima requerida.
 * @param {string} password - La contraseña a validar.
 * @param {number} [minLength=6] - La longitud mínima requerida.
 * @returns {boolean} `true` si la contraseña es válida, `false` en caso contrario.
 */
export const isValidPassword = (password: string, minLength: number = 6): boolean => {
    return password.length >= minLength;
};

/**
 * Valida si el título de una tarea es válido (no vacío y dentro de la longitud permitida).
 * @param {string} title - El título a validar.
 * @returns {boolean} `true` si el título es válido, `false` en caso contrario.
 */
export const isValidTaskTitle = (title: string): boolean => {
    return title.trim().length > 0 && title.length <= 255;
};

/**
 * Valida si un nombre de usuario es válido (longitud entre 2 y 100 caracteres).
 * @param {string} name - El nombre a validar.
 * @returns {boolean} `true` si el nombre es válido, `false` en caso contrario.
 */
export const isValidName = (name: string): boolean => {
    return name.trim().length >= 2 && name.length <= 100;
};

/**
 * Valida el formulario de inicio de sesión.
 * @param {string} email - El correo electrónico.
 * @param {string} password - La contraseña.
 * @returns {string | null} Un mensaje de error si la validación falla, o `null` si es exitosa.
 */
export const validateLoginForm = (email: string, password: string): string | null => {
    if (!email.trim()) return "El correo es requerido";
    if (!isValidEmail(email)) return "Formato de correo inválido";
    if (!password) return "La contraseña es requerida";
    if (!isValidPassword(password)) return "La contraseña debe tener al menos 6 caracteres";
    return null;
};

/**
 * Valida el formulario de registro.
 * @param {string} name - El nombre del usuario.
 * @param {string} email - El correo electrónico.
 * @param {string} password - La contraseña.
 * @returns {string | null} Un mensaje de error si la validación falla, o `null` si es exitosa.
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
