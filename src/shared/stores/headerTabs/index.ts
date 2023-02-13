import { create } from "zustand";

export type TabsState = {
  activeTab: number;

  setActiveTab: (_newActiveTab: number) => void;
};

export const useHeaderTabsStore = create<TabsState>(
  (set): TabsState => ({
    activeTab: 0,
    setActiveTab: (newActiveTab: number) => set(() => ({ activeTab: newActiveTab }))
  })
);
