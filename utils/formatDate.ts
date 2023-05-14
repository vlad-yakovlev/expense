import * as fns from 'date-fns'

export const formatDateTime = (date: Date) => {
  return fns.format(date, "d MMM yyyy 'at' HH:mm")
}

export const formatDate = (date: Date) => {
  if (fns.isToday(date)) {
    return 'Today'
  }

  if (fns.isYesterday(date)) {
    return 'Yesterday'
  }

  if (fns.isThisWeek(date)) {
    return fns.format(date, 'd MMM, EEEE')
  }

  if (fns.isThisYear(date)) {
    return fns.format(date, 'd MMM')
  }

  return fns.format(date, 'd MMM yyyy')
}

export const formatTime = (date: Date) => {
  return fns.format(date, 'HH:mm')
}

export const formatWeek = (firstDate: Date) => {
  const lastDate = fns.addDays(firstDate, 6)
  const formattedLastDate = fns.format(lastDate, `d MMM yyyy`)

  if (firstDate.getFullYear() === lastDate.getFullYear()) {
    if (firstDate.getMonth() === lastDate.getMonth()) {
      return `${fns.format(firstDate, `d`)} – ${formattedLastDate}`
    }

    return `${fns.format(firstDate, `d MMM`)} – ${formattedLastDate}`
  }

  return `${fns.format(firstDate, `d MMM yyyy`)} – ${formattedLastDate}`
}

export const formatMonth = (fromDate: Date) => {
  return fns.format(fromDate, `MMM yyyy`)
}

export const formatYear = (fromDate: Date) => {
  return fns.format(fromDate, `yyyy`)
}

export const formatDateForInput = (date: Date) => {
  return fns.format(date, "yyyy-MM-dd'T'HH:mm")
}
