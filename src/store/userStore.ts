import { USER_STORAGE } from "constants/index";
import { initUser } from "constants/initials";
import { IUser } from "constants/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserAction {
  handleUserLogin: (user: IUser) => void;
  handleLogout: () => void;
  setToken: (token: string) => void;
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
    }),
    {
      name: USER_STORAGE,
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        id: state.id,
        fullname: state.fullname,
        role: state.role,
      }),
    }
  )
);
