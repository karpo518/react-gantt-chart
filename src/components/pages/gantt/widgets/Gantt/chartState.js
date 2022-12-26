// initial state
export const chartIS = {
  project: '',
  period: null,
  tasks: null,
  boardRange: {
    startDate: null,
    endDate: null
  },
}

// action types
export const chartAT = {
  SET_STATE: 'set_state',
  UPDATE_TASK: 'update_task'
}

// action creaters
export const chartAC = {
  setState: (project, period, tasks, boardRange) => ({type: chartAT.SET_STATE, project, period, tasks, boardRange}),
  updateTask: (taskId, newValues) => ({type: chartAT.UPDATE_TASK, taskId, newValues})
}

export function chartReducer(state, action) {
  
  console.log('Run action ', action)

  switch (action.type) {
    case chartAT.SET_STATE:
      return {
        project: action.project, 
        period: action.period, 
        tasks: action.tasks, 
        boardRange: action.boardRange
      };
    case chartAT.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.taskId ? {...t, ...action.newValues} : t)
      };
    default: {
      return state;
    }
  }
}

export const chartSelectors = {
  tasks: (state) => state.tasks,
  task: (state, taskId) => state.tasks.find(t => t.id === taskId),
  childrenTaskIds: (state, taskId) => state.tasks.filter(t => t.parentId === taskId).map(t => t.id) || []
}