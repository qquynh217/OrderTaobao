import { CONFIG_STORAGE } from "constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IConfig {
  exchange_rate: number;
}

interface IConfigAction {
  setExchangeRate: (value: number | string) => void;
}

export const configStore = create<IConfig & IConfigAction>()(
  persist(
    (set) => ({
      exchange_rate: 0,
      setExchangeRate(value: number | string) {
        set({ exchange_rate: +value });
      },
    }),
    {
      name: CONFIG_STORAGE,
      partialize: (state) => ({
        exchange_rate: state.exchange_rate,
      }),
    }
  )
);
