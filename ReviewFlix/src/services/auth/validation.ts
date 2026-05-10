import type { AuthFieldErrors, LoginInput, ProfileInput, RegisterInput } from "./types";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(value: string) {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Validate the login form before attempting Firebase auth.
export function validateLogin(input: LoginInput): AuthFieldErrors {
  const errors: AuthFieldErrors = {};

  if (!input.email.trim()) errors.email = "El email es obligatorio.";
  else if (!isValidEmail(input.email)) errors.email = "Ingresa un email válido.";

  if (!input.password.trim()) errors.password = "La contraseña es obligatoria.";

  return errors;
}

// Validate register form data before creating the Firebase account.
export function validateRegister(input: RegisterInput): AuthFieldErrors {
  const errors = validateLogin(input);

  if (!input.displayName.trim()) errors.displayName = "El nombre es obligatorio.";
  if (input.password.trim().length < 6) errors.password = "La contraseña debe tener al menos 6 caracteres.";
  if (input.password !== input.confirmPassword) errors.confirmPassword = "Las contraseñas no coinciden.";

  return errors;
}

// Validate editable profile fields before persisting them.
export function validateProfile(input: ProfileInput): AuthFieldErrors {
  const errors: AuthFieldErrors = {};

  if (!input.displayName.trim()) errors.displayName = "El nombre visible es obligatorio.";
  else if (input.displayName.trim().length < 2) errors.displayName = "Debe tener al menos 2 caracteres.";

  if (input.bio.length > 300) errors.bio = "La bio no puede superar 300 caracteres.";

  if (input.photoURL.trim() && !isValidUrl(input.photoURL.trim())) {
    errors.photoURL = "La URL de la foto no es válida.";
  }

  return errors;
}
