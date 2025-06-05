import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  TrafficStatDate,
  trafficStats,
  TrafficStatType,
} from "../assets/trafficStats";
import { compareDates } from "../helpers/sortByDate";
import { isValidDate } from "../helpers/validateDate";

const TrafficStatsContext = createContext<{
  trafficStatsState: TrafficStatType[];
  addEntry: (date: TrafficStatDate, visits: number) => string;
  editEntry: (date: TrafficStatDate, visits: number) => string;
  deleteEntry: (date: TrafficStatDate) => string;
} | null>(null);

export function TrafficStatsProvider({ children }: PropsWithChildren) {
  const [trafficStatsState, setTrafficStatsState] =
    useState<TrafficStatType[]>(trafficStats);

  const editEntry = (date: TrafficStatDate, visits: number) => {
    if (
      !isValidDate(date) ||
      !trafficStatsState.some((stat) => stat.date === date)
    ) {
      return "date is invalid";
    }

    setTrafficStatsState((oldState) =>
      oldState.map((stat) => {
        if (stat.date === date) return { date, visits };
        return stat;
      })
    );
    return "entry was edited";
  };

  const addEntry = (date: TrafficStatDate, visits: number = 0) => {
    if (!isValidDate(date)) return "date is invalid";
    if (trafficStatsState.some((stat) => stat.date === date))
      return editEntry(date, visits);
    const newEntry = { date, visits };
    setTrafficStatsState((oldState) =>
      [...oldState, newEntry].sort((a, b) => compareDates(a.date, b.date))
    );
    return `on ${date} there were ${visits} visits`;
  };

  const deleteEntry = (date: TrafficStatDate) => {
    if (!isValidDate(date)) return "date is invalid";
    if (!trafficStatsState.some((stat) => stat.date === date))
      return "date was not found";
    setTrafficStatsState((oldState) =>
      oldState.filter((stat) => stat.date !== date)
    );
    return "entry has been deleted";
  };

  let value = useMemo(
    () => ({
      trafficStatsState,
      addEntry,
      editEntry,
      deleteEntry,
    }),
    [trafficStatsState]
  );

  return (
    <TrafficStatsContext.Provider value={value}>
      {children}
    </TrafficStatsContext.Provider>
  );
}

export function useTrafficStats() {
  const context = useContext(TrafficStatsContext);

  if (!context) {
    throw new Error(
      "The TrafficStats Context must be used within an TrafficStatsContextProvider"
    );
  }

  return context;
}
