import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile, isAuthenticated, hasAdminAccess } from "@/services/authApi";

type RequireAuthProps = {
	children: ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		async function verify() {
			if (!isAuthenticated()) {
				navigate("/login", { replace: true, state: { from: location.pathname } });
				return;
			}
			try {
				await getProfile();
				setReady(true);
			} catch {
				navigate("/login", { replace: true, state: { from: location.pathname } });
			}
		}
		verify();
	}, [location.pathname, navigate]);

	if (!ready) {
		return null;
	}

	return <>{children}</>;
};

export default RequireAuth;

type RequireAdminProps = { children: React.ReactNode };

export const RequireAdmin = ({ children }: RequireAdminProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!isAuthenticated() || !hasAdminAccess()) {
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }
      try {
        await getProfile();
        setReady(true);
      } catch {
        navigate("/login", { replace: true, state: { from: location.pathname } });
      }
    }
    verify();
  }, [location.pathname, navigate]);

  if (!ready) return null;
  return <>{children}</>;
};




