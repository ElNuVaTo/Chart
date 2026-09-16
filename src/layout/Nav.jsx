import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const Nav = ({ isAuth = false }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuth) return;

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [isAuth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link to="/" className="font-semibold">
        Chart
      </Link>

      {!isAuth && (
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button asChild>
                <Link to="/create-chart">Crear chart</Link>
              </Button>

              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>

              <Button variant="outline" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Iniciar sesión</Link>
              </Button>

              <Button asChild>
                <Link to="/auth/create">Crear cuenta</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;