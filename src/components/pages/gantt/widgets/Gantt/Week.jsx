import clsx from 'clsx'
import React from 'react'
import s from './Week.module.css'

export const Week = ({name,size}) => {

  return (
    <th colSpan={size} className={clsx(s.c)} ><div className={s.weekValue}>{name}</div></th>
  )
}
