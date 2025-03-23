import { create } from 'zustand';

import { IfcDate } from '../helpers/IfcDate';

interface CalendarState {
  selectedDate: IfcDate;
  setSelectedDate: (newSelectedDate: IfcDate) => void;
}

const useCalendarStore = create<CalendarState>()((set) => ({
  selectedDate: new IfcDate(),
  setSelectedDate: (newSelectedDate) => set(() => ({ selectedDate: newSelectedDate })),
}));

export { useCalendarStore, type CalendarState };
