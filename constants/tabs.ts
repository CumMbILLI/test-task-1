import { Landmark, LayoutDashboard, PhoneCall } from "lucide-react";
import { Tab } from "@/interfaces/tab.interface";

export const DEFAULT_STATE_TABS : Tab[] = [
  {
    id: 1,
    icon: LayoutDashboard,
    title: "Dashboard",
    url: "/dashboard",
    pinned: false,
  },
  {
    id: 2,
    icon: Landmark,
    title: "Banking",
    url: "/banking",
    pinned: false,
  },
  {
    id: 3,
    icon: PhoneCall,
    title: "Telefonie",
    url: "/telefonie",
    pinned: false,
  },
  {
    id: 4,
    icon: Landmark,
    title: "Banking",
    url: "/banking",
    pinned: false,
  },
  {
    id: 5,
    icon: PhoneCall,
    title: "Telefonie",
    url: "/telefonie",
    pinned: false,
  },
 ];