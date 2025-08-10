"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Search,
  Tv,
  Film,
  Clapperboard,
  Flame,
  ClubIcon as Football,
  Newspaper,
  Grid3X3,
  Settings,
  User2,
  Crown,
} from "lucide-react"
import type React from "react"

function HeaderWithAvatarToggle() {
  const { toggleSidebar } = useSidebar()
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/40 bg-background/60 backdrop-blur px-3 md:px-4">
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Abrir o cerrar menú lateral"
        className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <Avatar className="h-8 w-8 border border-white/20">
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
      </button>
      <div className="text-sm text-muted-foreground">Browse</div>
    </header>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  // Items inspirados en el sidebar de Max (orden y apartados).
  const nav = [
    { title: "My Stuff", icon: Crown, url: "#" },
    { title: "Search", icon: Search, url: "#" },
    { title: "Home", icon: Home, url: "#", isActive: true },
    { title: "Series", icon: Tv, url: "#" },
    { title: "Movies", icon: Film, url: "#" },
    { title: "HBO", icon: Clapperboard, url: "#" },
    { title: "What's New", icon: Flame, url: "#" },
    { title: "Sports", icon: Football, url: "#" },
    { title: "News Beta", icon: Newspaper, url: "#" },
    { title: "Categories", icon: Grid3X3, url: "#" },
  ]

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="offcanvas" variant="sidebar" side="left">
        <SidebarHeader className="pt-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium group-data-[collapsible=icon]:hidden">Sam</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="items-center">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-1" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Settings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <User2 />
                  <span>Profile</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <HeaderWithAvatarToggle />
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
