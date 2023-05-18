import { create } from "zustand";

export type Video360State = {
  count: number;
  isLoading: boolean;
  isSaveLoading: boolean;

  setCount: (newCount: number) => void;
  setLoading: (loading: boolean) => void;
  setIsSaveLoading: (loading: boolean) => void;
};

export const useVideo360Store = create<Video360State>(
  (set): Video360State => ({
    count: 0,
    isLoading: false,
    isSaveLoading: false,
    setCount: (newCount) => set(() => ({ count: newCount })),
    setLoading: (loading) => set(() => ({ isLoading: loading })),
    setIsSaveLoading: (loading) => set(() => ({ isSaveLoading: loading }))
  })
);
