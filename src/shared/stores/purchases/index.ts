import { create } from "zustand";

export type PurchasesState = {
  count: number;
  isLoading: boolean;

  setCount: (newCount: number) => void;
  setLoading: (loading: boolean) => void;
};

export const usePurchasesStore = create<PurchasesState>(
  (set): PurchasesState => ({
    count: 0,
    isLoading: false,
    setCount: (newCount) => set(() => ({ count: newCount })),
    setLoading: (loading) => set(() => ({ isLoading: loading }))
  })
);
