import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { Telescope, Sparkles, BookPlus, CircleStar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navside = () => {
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>C.</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              
              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer" onClick={() => navigate("/")}>
                  <Telescope /> Explorar
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer">
                  <Sparkles />
                  Tendencia
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer">
                  <CircleStar /> Creadores
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer" onClick={() => navigate("/create-chart")}>
                  <BookPlus /> Crear mi chart
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <button onClick={toggleSidebar}>{state === "expanded" ? "Cerrar" : "Abrir"}</button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navside;
