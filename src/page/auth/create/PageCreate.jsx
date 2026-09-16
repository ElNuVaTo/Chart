import { useState } from "react";
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";
import { Link } from "react-router-dom";

import GoogleButton from "@/components/GoogleButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

const PageCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setAlert(null);

    if (!email || !password || !repeatPassword) {
      setAlert({
        type: "error",
        title: "Campos incompletos",
        description: "Completa todos los campos para continuar.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setAlert({
        type: "error",
        title: "Email inválido",
        description: "Introduce una dirección de email válida.",
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        type: "error",
        title: "Las contraseñas no coinciden",
        description: "Asegúrate de que ambas contraseñas sean iguales.",
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        type: "error",
        title: "Contraseña demasiado corta",
        description: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error("Supabase Auth error:", error);

      if (error.status === 429) {
        setAlert({
          type: "error",
          title: "Demasiados intentos",
          description: error.message,
        });
        return;
      }

      if (error.code === "user_already_exists" || error.message.toLowerCase().includes("already registered")) {
        setAlert({
          type: "error",
          title: "Cuenta ya existente",
          description: "Esta cuenta ya existe. Intenta iniciando sesión.",
        });
        return;
      }

      if (error.code === "weak_password" || error.message.toLowerCase().includes("password")) {
        setAlert({
          type: "error",
          title: "Contraseña demasiado débil",
          description: error.message,
        });
        return;
      }

      setAlert({
        type: "error",
        title: "Error al crear la cuenta",
        description: `${error.message}${error.code ? ` (${error.code})` : ""}`,
      });

      return;
    }

    setAlert({
      type: "success",
      title: "Cuenta creada correctamente",
      description: "Recuerda confirmar tu cuenta.",
    });
  };

  return (
    <main className="flex min-h-[calc(100svh-73px)] justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Empieza aquí</span>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Crear cuenta</h1>

          <p className="mt-2 text-sm text-muted-foreground">Crea una cuenta para empezar.</p>
        </div>

        <div className="space-y-5">
          <GoogleButton text="signup_with" />

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
              <Label htmlFor="password">Contraseña</Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>

              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
              />
            </div>

            {alert && (
              <Alert variant={alert.type === "error" ? "destructive" : "default"}>
                {alert.type === "error" && <AlertCircleIcon />}
                {alert.type === "success" && <CheckCircle2Icon />}
                {alert.type === "info" && <InfoIcon />}

                <AlertTitle>{alert.title}</AlertTitle>

                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default PageCreate;
