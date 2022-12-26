import clsx from 'clsx'
import React from 'react'
import { chartAC } from './chartState'
import s from './TaskContainer.module.css'

export const Task = React.memo(({item, childrenCount, dispatch}) => {

  // console.log(`Render Task ${item.id}`)

  const offset = item.level * 20;


  return (
    <div className={clsx(s.item, childrenCount && s.item_has_children)} style={{marginLeft: `${offset}px`}}>
        {childrenCount > 0 
          ? <div className={clsx(s.icon_toggle, item.collapsed ? s.icon_expand : s.icon_collapse)}
                 onClick={ () =>  dispatch(chartAC.updateTask(item.id, {collapsed: !item.collapsed})) /* updateTask(item.id, {collapsed: !item.collapsed}) */ }></div>
          : <div className={s.icon_place}></div>
        }
        <div className={s.task_icon}></div>
        <div className={s.children_count}>{childrenCount}</div>
        <div className={s.title}>{item.title}</div>
    </div>
  )
})

Task.displayName = 'Task'

// Task.whyDidYouRender = true