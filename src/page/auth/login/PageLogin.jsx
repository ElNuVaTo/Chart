import { useState } from "react";
import { AlertCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleButton from "@/components/GoogleButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

const PageLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setAlert(null);

    if (!email || !password) {
      setAlert({
        type: "error",
        title: "Campos incompletos",
        description: "Completa tu email y contraseña.",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error("Supabase Auth error:", error);

      setAlert({
        type: "error",
        title: "No pudimos iniciar sesión",
        description: error.message,
      });

      return;
    }

    window.location.href = "/";
  };

  return (
    <main className="flex min-h-[calc(100svh-73px)] justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Bienvenido de nuevo</span>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Iniciar sesión</h1>

          <p className="mt-2 text-sm text-muted-foreground">Accede a tu cuenta para continuar.</p>
        </div>

        <div className="space-y-5">
          <GoogleButton text="signin_with" />

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />

            <span className="text-xs text-muted-foreground">o</span>

            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>

                <Link to="/auth/forgot-password" className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  ¿La olvidaste?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {alert && (
              <Alert variant="destructive">
                <AlertCircleIcon />

                <AlertTitle>{alert.title}</AlertTitle>

                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link to="/auth/create" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
};

export default PageLogin;
