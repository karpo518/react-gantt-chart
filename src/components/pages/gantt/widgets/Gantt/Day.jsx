import clsx from 'clsx'
import React from 'react'
import s from './Day.module.css'

export const Day = ({name, isHoliday}) => {
  return (
    <th className={clsx(s.c)} ><div className={clsx(s.dayValue, isHoliday && s.dayHoliday)}>{name}</div></th>
  )
}
