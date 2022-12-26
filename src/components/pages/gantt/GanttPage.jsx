import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { api } from '../../../common/api/ApiCall'
import { ParamsCreator } from '../../../common/api/ParamsCreator'
import s from './GanttPage.module.css'
import { ChartContext, TaskContext } from './widgets/Gantt/ChartContext'
import { chartHelper } from './widgets/Gantt/chartHelper'
import { chartAC, chartIS, chartReducer } from './widgets/Gantt/chartState'
import { Gantt } from './widgets/Gantt/Gantt'
import { Header } from './widgets/Header/Header'

export const GanttPage = () => {
  console.log('Render GanttPage!')
  const [state, dispatch] = useReducer(chartReducer, chartIS)
  const project = state.project
  const period = state.period

  const storeRef = useRef({state: state, dispatch: dispatch, selectors: new Map()})
  
  storeRef.current.state = state
  storeRef.current.dispatch = dispatch

  // console.log(storeRef.current.selectors)

  const loadChart = async () => { 
    const response = await api.request(ParamsCreator.getChart())

    const {project, period, tasks} = response
    const flatTasks = chartHelper.parseTasks(tasks)
    const boardRange = chartHelper.getBoardRange(flatTasks)
    dispatch(chartAC.setState(project, period, flatTasks, boardRange))
  }

  useEffect(() => {
    console.log('run loadChart in GanttPage useEffect!')
    // if(project !== null) {
    loadChart()
    // }
  },[])

  useEffect(() => {
    console.log('Run selectors in GanttPage useEffect!')
    storeRef.current.selectors.forEach((stateSetter, selector) => {
      return stateSetter(selector(state)) 
    }
      )
  }, [state])

  return project && (

      <div className={s.c}>  
        <div className={s.header}>
          <Header project={project} period={period} />
        </div>
        <div className={s.content}>
          <div className={s.shadow}></div>
          <ChartContext.Provider value={storeRef} > 
            <Gantt />
          </ChartContext.Provider>
        </div>
      </div>
    
  )
}

// GanttPage.displayName = 'GanttPage'

// GanttPage.whyDidYouRender = true