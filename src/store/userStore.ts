import { USER_STORAGE } from "constants/index";
import { initUser } from "constants/initials";
import { IUser } from "constants/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserAction {
  handleUserLogin: (user: IUser) => void;
  handleLogout: () => void;
  setToken: (token: string) => void;
  setBalance: (balance: number) => void;
}

export const userStore = create<IUser & IUserAction>()(
  persist(
    (set) => ({
      ...initUser,
      handleUserLogin: (user: IUser) => {
        set({ ...user });
      },
      setToken(token) {
        set({ token: token });
      },
      handleLogout: () => {
        set({ ...initUser });
      },
      setBalance(balance) {
        set({ balance: balance });
      },
    }),
    {
      name: USER_STORAGE,
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        name: state.name,
        role: state.role,
      }),
    }
  )
);
