export const dateHelper = {
  getMonthName: function(dateObj, useShortName = true) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const monthNumber = dateObj.getMonth()

    return useShortName ? monthNames[monthNumber].slice(0,3) : monthNames[monthNumber]

  },
  getMonthDayWithZero: function (dateObj) {
    const dayValue = dateObj.getDate()
    return dayValue > 9 ? '' + dayValue : '0' + dayValue
  }, 
  getMinDate: function(dateObjs) {
    return new Date(Math.min(...dateObjs))
  },
  getMaxDate: function(dateObjs)  {
    return new Date(Math.max(...dateObjs))
  },

  moveDateToMonthStart: function(dateObj, extendForFullWeeks = true) {
    const newDate =  new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    if(extendForFullWeeks && newDate.getDay() !== 1) {
      while(newDate.getDay() !== 1) {
        d.setDate(d.getDate() - 1)
      }
    }
    return newDate
  },
  moveDateToYearEnd: function(dateObj, extendForFullWeeks = true) {
    const newDate =  new Date(dateObj.getFullYear(), 11, 31);
    if(extendForFullWeeks && newDate.getDay() !== 1) {
      while(newDate.getDay() !== 0) {
        d.setDate(d.getDate() + 1)
      }
    }
    return newDate
  },
  getDateDiffInDays: function(date1, date2) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / msPerDay) + 1;
  }
}