"use client";

import {
  CalendarDays,
  LayoutDashboard,
  LogOutIcon,
  Stethoscope,
  Users2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: Users2Icon,
  },
  {
    title: "Médicos",
    url: "/doctors",
    icon: Stethoscope,
  },
];

export function AppSidebar() {
  const session = authClient.useSession();
  const router = useRouter();
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="border-b p-4">
          <Image src="/logo.svg" alt="logo" width={136} height={32} />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="space-y-2">
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 text-[16px]"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex cursor-pointer gap-4 rounded-md border p-4">
                    {/* <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage
                      src={session?.user.image || "icons8-user-48.png"}
                      alt={session?.user.name}
                    />
                    <AvatarFallback className="rounded-lg">FA</AvatarFallback>
                  </Avatar> */}
                    <div className="grid flex-1 items-center text-left text-sm leading-tight">
                      <span className="truncate font-medium"></span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOutIcon />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
