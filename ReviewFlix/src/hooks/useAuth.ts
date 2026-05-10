import { useAuthContext } from "../context/AuthorizationContext";

export function useAuth() {
  return useAuthContext();
}

export default useAuth;