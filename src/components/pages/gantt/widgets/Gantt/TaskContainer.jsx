import clsx from 'clsx'
import React, { useCallback, useContext, useRef, useState } from 'react'
import s from './TaskContainer.module.css'
import { ChartContext } from './ChartContext'
import { chartSelectors } from './chartState'
import { Task } from './Task'

export const TaskContainer = React.memo(({taskId}) => {
  
  console.log('Render TaskContainer ' + taskId)
  // const {state, updateTask} = useContext(ChartContext)

  const storeRef = useContext(ChartContext)

  const {state, dispatch, selectors} = storeRef.current

  const taskSelector = useCallback((state) => {
    console.log('Run selector task ' + taskId)
    return chartSelectors.task(state, taskId)
  }, [taskId])

  
  const initTask = taskSelector(state)

  const [task, setTask] = useState(initTask)

  const setSuperTask = useCallback((newTask) => {
    console.log('setSuperTask ' + task.id)

    //if(!(newTask.id === 4 && task.collapsed === true))
      setTask(newTask)
  }, [task, setTask])

  // const prev = useRef({state, dispatch, selectors, task})

  // prev.current = {state, dispatch, selectors, task}

  storeRef.current.selectors.set(taskSelector, setSuperTask)

  const childrenIds = chartSelectors.childrenTaskIds(state, taskId)
  const childrenCount = childrenIds.length  

  const subTasks = childrenIds.map(tId => <TaskContainer key={tId} taskId={tId} dispatch={dispatch} />)

  return (
    <div className={clsx(s.c, task.collapsed && s.collapsed, childrenIds.lenght && s.has_sub_items)} >
      <Task item={task} childrenCount={childrenCount} dispatch={dispatch} />
      <div className={s.sub_items}>{subTasks}</div>
    </div>
  )
})

TaskContainer.displayName = 'TaskContainer'

TaskContainer.whyDidYouRender = true