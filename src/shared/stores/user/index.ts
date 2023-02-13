import { create } from "zustand";
import { Maybe, User } from "~generated";

export type UserState = {
  user: Maybe<User>;

  setUser: (_user: Maybe<User>) => void;
};

export const useUserStore = create<UserState>(
  (set): UserState => ({
    user: null,
    setUser: (user: Maybe<User>) => set(() => ({ user }))
  })
);
