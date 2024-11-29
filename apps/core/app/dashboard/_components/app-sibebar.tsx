"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@repo/ui/components/sidebar";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import NavLogo from "./nav-logo";
import { Separator } from "@repo/ui/components/separator";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "m@example.com",
    avatar: "https://picsum.photos/200/300",
  },
  teams: [
    {
      name: "Domainname.com",
      logo: GalleryVerticalEnd,
      plan: "Growth plan",
    },
    {
      name: "Google.com",
      logo: AudioWaveform,
      plan: "Startup plan",
    },
    {
      name: "Pixel.com",
      logo: Command,
      plan: "Free Plan",
    },
  ],
  navMain: [
    {
      title: "Smart Scanner",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics & Logs",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "DNS Records",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Records",
          url: "#",
        },
      ],
    },
    {
      title: "SSL/TLS",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-muted" {...props}>
      <SidebarHeader>
        <NavLogo />
        <Separator hidden={!open} />
        <TeamSwitcher teams={data.teams} />
        <Separator hidden={!open} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
