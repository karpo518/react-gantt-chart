import React from 'react'
import s from './Header.module.css'

export const Header = ({project, period}) => {
  return (
    <div className={s.c}>
      <div className={s.title}>{`${project} / ${period}`}</div>
    </div>
  )
}
