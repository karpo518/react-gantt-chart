import { dateHelper } from "../../../../../common/helpers/dateHelper"

export const chartHelper = {

  updateTask: function(chart, taskId, newValues) {

    let newChart = [];
    for(let i = 0; i < chart.length; i++) {
      if(chart[i].id === taskId) {
/*         for(let j in newValues) {
          chart[i][j] = newValues[j]
        } */
        newChart[i] = {...chart[i], ...newValues}
      }
      else {
        newChart[i] = chart[i]
      }
/*       else if(chart[i].sub) {
        if(this.updateTask(chart[i].sub, taskId, newValues)) {
          return true
        }
      } */
    }
    return newChart
  },

  prepareChart: function(chart) {
    let newChart = [...chart] 
    for(let i = 0; i < newChart.length; i++) {
      newChart[i].collapsed = false
      if(newChart[i].sub !== undefined) {
        newChart[i].sub = this.prepareChart(newChart[i].sub)
      }
    }
    return newChart
  },

  parseTasks: function(chart, parentId = 0, level = 0) {
    let newChart = []

    for(let i = 0; i < chart.length; i++) {
      const {sub, ...fields} = chart[i]
      newChart.push({...fields, 
                     period_start: new Date(fields.period_start), 
                     period_end: new Date(fields.period_end), 
                     parentId, 
                     level, 
                     collapsed: false })
      if(sub) {
        newChart.push(...this.parseTasks(sub, fields.id, ++level))
      }
    }
    return newChart
  },

  parseStructure: function(tasks) {

    let structure = {}

    for(let i = 0; i < tasks.length; i++) {
      if(structure[tasks[i].parentId] === undefined) {
        structure[tasks[i].parentId] = [];
      }
      structure[tasks[i].parentId].push(tasks[i].id)
    }

    return structure
  },
  getBoardRange: function(tasks) {

    const startTaskDates = tasks.map(task => new Date(task.period_start))
    const minDate = dateHelper.getMinDate(startTaskDates)
    const startDate =  dateHelper.moveDateToMonthStart(minDate, false)

    const endTaskDates = tasks.map(task => new Date(task.period_end))
    const maxDate = dateHelper.getMaxDate(endTaskDates)
    const endDate =  dateHelper.moveDateToYearEnd(maxDate, false)

    return {startDate, endDate}
  },

  getDaysInRange: function (startDate, endDate) {
    
    const days = []
    let d = new Date(startDate.getTime())
    while(d <= endDate) {
      const name = d.getDate()
      const date = d.toLocaleDateString()
      const isHoliday = [0,6].includes( d.getDay() ) ? true : false
      days.push({name,date, isHoliday})
      d.setDate(d.getDate() + 1)
    }
    return days
  },

  getWeeksInRange: function(startDate, endDate) {
    
    const formatDate = dateObj => dateHelper.getMonthDayWithZero(dateObj) + ' ' + dateHelper.getMonthName(dateObj)

    const weekData = []
    let d = new Date(startDate.getTime())
    let weekStart, weekEnd

    let weekSize = 1
    weekStart = formatDate(startDate)

    while(d <= endDate) {
      if(d.getDay() === 1) {
        weekStart = formatDate(d)
      }
      else if(d.getDay() === 0 || d.getTime() === endDate.getTime()) {
        weekEnd = formatDate(d)
        weekData.push({name: `${weekStart} - ${weekEnd}`, size: weekSize})
        weekSize = 0
      }

      d.setDate(d.getDate() + 1)
      weekSize++
    }
    return weekData
  }
}