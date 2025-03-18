"use client";

import { LucideSvgType } from "@/types/lucide-svg.type";
import { Pin } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  icon: LucideSvgType;
  title: string;
  pinned?: boolean;
  isDragging?: boolean;
  children: ReactNode;
  onClick: VoidFunction;
}

export function InteractiveTooltip({
  icon: Icon,
  title,
  pinned,
  isDragging,
  children,
  onClick,
}: Props) {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible &&
        !isDragging &&
        (pinned ? (
          <div className="text-sm absolute -bottom-16 -right-15 transform  mb-2 z-10">
            <div className="bg-gray-50 shadow rounded px-2 py-1 text-gray-700 space-y-2">
              <div className="flex gap-2 text-base justify-center items-center font-bold">
                <Icon size={24} />
                {title}
              </div>
              <button
                onClick={onClick}
                className="flex gap-1.5 justify-center items-center cursor-pointer text-nowrap"
              >
                <Pin size={16} />
                Tab unpinned
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm absolute -bottom-9 left-1/2 transform -translate-x-1/2 mb-2 z-10 text-gray-700">
            <div className="bg-gray-50 shadow rounded px-2 py-1">
              <button
                onClick={onClick}
                className="flex gap-1.5 justify-center items-center cursor-pointer text-nowrap"
              >
                <Pin size={16} />
                Tab pinned
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
