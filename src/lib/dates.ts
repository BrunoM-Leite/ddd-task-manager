import { format, isToday, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

export const formatDay = (date: Date) => format(date, 'dd/MM')
export const isSameDayOrToday = (a: Date, b: Date) => isSameDay(a, b) || (isToday(a) && isToday(b))
export const getWeekDays = (date: Date) => eachDayOfInterval({ start: startOfWeek(date, { weekStartsOn: 1 }), end: endOfWeek(date, { weekStartsOn: 1 }) })
export const getMonthDays = (date: Date) => eachDayOfInterval({ start: startOfMonth(date), end: endOfMonth(date) })

