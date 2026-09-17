import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserPen, LogOut, Settings, PersonStanding, Palette } from "lucide-react";

const NavGuest = () => {
  const navigate = useNavigate();
  return (
    <>
      <ButtonGroup>
        <Button onClick={() => navigate("/auth/login")} variant="outline" className="cursor-pointer">
          Iniciar sesión
        </Button>

        <Button onClick={() => navigate("/auth/create")} variant="outline" className="cursor-pointer">
          Crear cuenta
        </Button>
      </ButtonGroup>
    </>
  );
};

const NavUser = () => {
  const { user, logout } = useAuth();

  console.log(user?.user_metadata);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          }
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-end gap-2 mb-2">{user?.user_metadata.name}</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <UserPen /> Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Settings /> Configuracion
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <PersonStanding /> Accesibilidad
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Palette /> Apariencia
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={logout}>
              <LogOut /> Cerrar sesion
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const navActions = [
  {
    component: NavGuest,
    access: "guest",
  },
  {
    component: NavUser,
    access: "private",
  },
];

const NavActions = () => {
  const { user, logout } = useAuth();

  const currentAccess = user ? "private" : "guest";

  return (
    <>
      <div className="justify-self-end">
        {navActions
          .filter((item) => item.access === currentAccess)
          .map(({ component: Component }) => (
            <Component key={Component.name} user={user} logout={logout} />
          ))}
      </div>
    </>
  );
};

export default NavActions;
