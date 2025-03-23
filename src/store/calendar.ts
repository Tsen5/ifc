import { create } from 'zustand';

interface CalendarState {
  selectedDate: Date;
  setSelectedDate: (newSelectedDate: Date) => void;
}

const useCalendarStore = create<CalendarState>()((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (newSelectedDate) => set(() => ({ selectedDate: newSelectedDate })),
}));

export { useCalendarStore, type CalendarState };
