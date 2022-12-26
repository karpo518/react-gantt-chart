import clsx from 'clsx'
import React from 'react'
import s from './TaskPeriodContainer.module.css'

export const TaskPeriod = React.memo(({item, periodOffset, periodSize}) => {

  // console.log(`Render TaskPeriod ${item.id}`)

  const offset = periodOffset * 23;
  const width = periodSize * 23

  return (
    <div className={clsx(s.item)} style={{marginLeft: `${offset}px`}}>
        <div className={s.period_value} style={{width: `${width}px`}}></div>
        <div className={s.period_title}>{item.title}</div>
    </div>
  )
})

TaskPeriod.displayName = 'TaskPeriod'

// Task.whyDidYouRender = true