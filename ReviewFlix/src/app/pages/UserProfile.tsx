import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "../../context/AuthorizationContext";
import { updateUserProfile, validateProfile } from "../../services/auth";

type ProfileFormState = {
  displayName: string;
  bio: string;
  photoURL: string;
};

// Profile page for the authenticated user.
// Loads the current Firebase auth user and lets them edit Firestore profile fields.
export function UserProfile() {
  const { user, loading, signOut } = useAuthContext();
  const [form, setForm] = useState<ProfileFormState>({
    displayName: "",
    bio: "",
    photoURL: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    setForm({
      displayName: user.displayName ?? "",
      bio: "",
      photoURL: user.photoURL ?? "",
    });
  }, [user]);

  // Keep the form state in sync with input changes.
  function handleChange(field: keyof ProfileFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  // Persist editable profile fields into the Firestore user document.
  async function handleSave() {
    if (!user) return;
    const validation = validateProfile(form);
    setFieldErrors(validation);
    setMessage(null);
    if (Object.keys(validation).length > 0) return;

    setSaving(true);
    setMessage(null);
    try {
      await updateUserProfile(user, form);
      setMessage("Perfil actualizado correctamente.");
    } catch (error: any) {
      setMessage(error?.message ?? "No se pudo actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white">Cargando perfil...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <section className="bg-[#111] border border-white/[0.08] rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <img
              src={form.photoURL || "https://placehold.co/160x160/png?text=Profile"}
              alt={form.displayName || user.email || "Perfil"}
              className="w-28 h-28 rounded-2xl object-cover border border-white/10"
            />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Mi perfil</p>
              <h1 className="text-3xl font-bold">{form.displayName || user.displayName || "Usuario"}</h1>
              <p className="text-sm text-gray-400 mt-2">{user.email}</p>
              <button
                onClick={() => signOut()}
                className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#111] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Editar perfil</h2>
            <p className="text-sm text-gray-500 mt-1">{"Estos campos se guardan en Firestore en users/{user.uid}."}</p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-gray-300">Nombre visible</span>
            <input
              value={form.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-[#e50914]"
              placeholder="Tu nombre"
            />
            {fieldErrors.displayName && <p className="text-xs text-red-400">{fieldErrors.displayName}</p>}
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-gray-300">Bio</span>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full min-h-32 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-[#e50914]"
              placeholder="Escribe algo sobre ti"
            />
            {fieldErrors.bio && <p className="text-xs text-red-400">{fieldErrors.bio}</p>}
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-gray-300">URL de foto</span>
            <input
              value={form.photoURL}
              onChange={(e) => handleChange("photoURL", e.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-[#e50914]"
              placeholder="https://..."
            />
            {fieldErrors.photoURL && <p className="text-xs text-red-400">{fieldErrors.photoURL}</p>}
          </label>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-[#e50914] px-5 py-3 font-medium hover:bg-[#c20810] disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            {message && <p className="text-sm text-gray-400">{message}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
