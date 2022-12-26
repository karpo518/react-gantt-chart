import clsx from 'clsx'
import React, { useCallback, useContext, useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import { dateHelper } from '../../../../../common/helpers/dateHelper'
import { chartHelper } from './chartHelper'
import { Day } from './Day'
import s from './Gantt.module.css'
import { Task } from './Task'
import { ChartContext } from './ChartContext'
import { Week } from './Week'
import { chartSelectors } from './chartState'
import { TaskContainer } from './TaskContainer'
import { TaskPeriodContainer } from './TaskPeriodContainer'



export const Gantt = ({updateTask}) => {
  
  console.log('Render Gantt')

  // let fChart = chartHelper.flatChart(chart)

  const storeRef = useContext(ChartContext)

  const {state} = storeRef.current

  const tasks = chartSelectors.tasks(state)

  const startDate = state.boardRange.startDate
  const endDate = state.boardRange.endDate

  const weekData = chartHelper.getWeeksInRange(startDate, endDate)
  const weekList = weekData.map(week => <Week key={week.name} name={week.name} size={week.size} />)

  const dayData = chartHelper.getDaysInRange(startDate, endDate)
  const dayList = dayData.map(day => <Day key={day.date} name={day.name} isHoliday={day.isHoliday} />)

  const dayPlaces = dayData.map((day, index) => <td key={index} className={s.day_column_value}></td>)

  const taskList = tasks.filter(t => t.parentId === 0).map(t => <TaskContainer key={t.id} taskId={t.id} />)
  const taskPeriodList = tasks.filter(t => t.parentId === 0).map(t => <TaskPeriodContainer key={t.id} taskId={t.id} />)
  
  return (
    <div className={s.c}>
      <table className={s.table}>
        <thead>
          <tr>
            <th rowSpan={2} className={clsx(s.title_column_name, s.sticky_call)} ><div>Work item</div></th>
            {weekList}
          </tr>
          <tr>
            {dayList}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={clsx(s.title_column_value, s.sticky_call)} >{taskList}</td>
            {dayPlaces}
          </tr>
          <tr>
            <td></td>
            <td colSpan={dayData.length}><div className={s.period_list}>{taskPeriodList}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
