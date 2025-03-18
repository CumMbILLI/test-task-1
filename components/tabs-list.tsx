"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Tab } from "@/interfaces/tab.interface";
import { TabItem } from "./tab-item";
import { DEFAULT_STATE_TABS } from "@/constants/tabs";

const sortTabs = (tabs: Tab[]): Tab[] =>
  [...tabs].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

export function TabsList() {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    // Викликає помилку (додав в звіті)
    // if (typeof window !== "undefined") {
    //   const saved = localStorage.getItem("tabs");
    //   if (saved) {
    //     return JSON.parse(saved);
    //   }
    // }
    return DEFAULT_STATE_TABS;
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setTabs((tabs) => {
        const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
        const newIndex = tabs.findIndex((tab) => tab.id === over.id);

        return arrayMove(tabs, oldIndex, newIndex);
      });
    }
  };

  const closeTab = (id: number) => {
    setTabs((tabs) => tabs.filter((tab) => tab.id !== id));
  };

  const togglePinned = (id: number) => {
    setTabs((prevTabs) => {
      const updated = prevTabs.map((tab) =>
        tab.id === id ? { ...tab, pinned: !tab.pinned } : tab
      );
      return sortTabs(updated);
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={tabs}>
        <div className="flex">
          {tabs?.map((tab) => (
            <TabItem
              key={tab.id}
              {...tab}
              handleClosing={closeTab}
              handlePinnedItem={togglePinned}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
