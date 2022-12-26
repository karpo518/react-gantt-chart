import clsx from 'clsx'
import React, { useContext } from 'react'
import s from './TaskPeriodContainer.module.css'
import { ChartContext } from './ChartContext'
import { chartSelectors } from './chartState'
import { dateHelper } from '../../../../../common/helpers/dateHelper'
import { TaskPeriod } from './TaskPeriod'

export const TaskPeriodContainer = React.memo(({taskId}) => {

  const storeRef = useContext(ChartContext)

  const {state} = storeRef.current

  const task = chartSelectors.task(state, taskId)
  const childrenIds = chartSelectors.childrenTaskIds(state, taskId)

  const subTasks = childrenIds.map(tId => <TaskPeriodContainer key={tId} taskId={tId} />)

  const startDate = state.boardRange.startDate

  const periodOffset = dateHelper.getDateDiffInDays(startDate, task.period_start)
  const periodSize = dateHelper.getDateDiffInDays(task.period_start, task.period_end)

  return (
    <div className={clsx(s.c, task.collapsed && s.collapsed)} >
      <TaskPeriod item={task} periodOffset={periodOffset} periodSize={periodSize} />
      <div className={s.sub_items}>{subTasks}</div>
    </div>
  )
})

TaskPeriodContainer.displayName = 'TaskPeriodContainer'

// TaskContainer.whyDidYouRender = true