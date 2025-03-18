import { LucideSvgType } from "@/types/lucide-svg.type";

export interface Tab {
    id: number;
    icon: LucideSvgType
    title: string;
    url: string;
    pinned?: boolean
  }
  