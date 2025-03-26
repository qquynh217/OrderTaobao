import { CONFIG_STORAGE } from "constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IWeightConfig {
  min: number;
  max: number;
  value: number;
}
interface IConfig {
  exchange_rate: number;
  weights: Array<IWeightConfig>;
}

interface IConfigAction {
  setExchangeRate: (value: number | string) => void;
  setWeights: (value: Array<IWeightConfig>) => void;
  getWeightRate: (value: number) => number;
}

export const configStore = create<IConfig & IConfigAction>()(
  persist(
    (set, get) => ({
      exchange_rate: 0,
      weights: [],
      setExchangeRate(value: number | string) {
        set({ exchange_rate: +value });
      },
      setWeights(value: Array<IWeightConfig>) {
        set({ weights: value });
      },
      getWeightRate(value: number) {
        const weight = get().weights;
        const weight_rate =
          weight.find((item) => item.max > value)?.value ||
          weight[weight.length - 1].value;
        return weight_rate;
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
