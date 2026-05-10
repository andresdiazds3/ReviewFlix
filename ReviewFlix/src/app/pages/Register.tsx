import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthorizationContext";
import { validateRegister } from "../../services/auth";

export function Register() {
  const { user, registerWithEmail } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRegister({
      displayName,
      email,
      password,
      confirmPassword,
    });
    setFieldErrors(validation);
    setError(null);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      await registerWithEmail(email.trim(), password, displayName.trim());
      navigate("/home");
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#111] p-6 md:p-8 shadow-2xl">
      <h2 className="text-2xl mb-2 font-semibold">Crear cuenta</h2>
      <p className="text-sm text-gray-500 mb-6">Regístrate para guardar reseñas, amigos y tu Top 10.</p>
      <form onSubmit={onRegister} className="flex flex-col gap-2">
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Nombre" className="p-3 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#e50914]" />
        {fieldErrors.displayName && <p className="text-xs text-red-400">{fieldErrors.displayName}</p>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="p-3 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#e50914]" />
        {fieldErrors.email && <p className="text-xs text-red-400">{fieldErrors.email}</p>}
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" className="p-3 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#e50914]" />
        {fieldErrors.password && <p className="text-xs text-red-400">{fieldErrors.password}</p>}
        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" type="password" className="p-3 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#e50914]" />
        {fieldErrors.confirmPassword && <p className="text-xs text-red-400">{fieldErrors.confirmPassword}</p>}
        <button disabled={loading} className="mt-2 px-4 py-3 bg-[#e50914] text-white rounded-2xl font-medium disabled:opacity-60">
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <div className="mt-5 text-sm text-gray-500 flex items-center justify-between">
        <span>¿Ya tienes cuenta?</span>
        <Link to="/login" className="text-white hover:text-[#e50914]">Iniciar sesión</Link>
      </div>
      </div>
    </div>
  );
}
