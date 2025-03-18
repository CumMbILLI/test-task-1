"use client";

import { Tab } from "@/interfaces/tab.interface";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lock, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InteractiveTooltip } from "./interactive-tooltip";

interface Props extends Tab {
  handleClosing: (id: number) => void;
  handlePinnedItem: (id: number) => void;
}

export function TabItem({
  id,
  icon: Icon,
  url,
  title,
  pinned,
  handleClosing,
  handlePinnedItem,
}: Props) {
  const pathname = usePathname();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: pinned });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div>
      <InteractiveTooltip
        icon={Icon}
        title={title}
        pinned={pinned}
        isDragging={isDragging}
        onClick={() => handlePinnedItem(id)}
      >
        <Link
          href={url}
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={cn(
            "group flex items-center justify-center gap-2.5 px-5 h-12 cursor-pointer select-none relative hover:bg-gray-100",
            {
              "bg-gray-300 border-t-2 border-[#4690E2] hover:bg-gray-400/90":
                url === pathname,
              "bg-gray-500 text-white": isDragging,
            }
          )}
        >
          <Icon size={16} />
          {!pinned && <span className="group-hover: truncate">{title}</span>}

          {!pinned && !isDragging && (
            <X
              size={18}
              onClick={() => handleClosing(id)}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:bg-red-600 group-hover:p-0.5 group-hover:ml-10 rounded-full text-white stroke-3"
            />
          )}
        </Link>
      </InteractiveTooltip>
    </div>
  );
}
