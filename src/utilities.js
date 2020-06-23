const getMonthsNames = () => {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
}

const createChartDefaultDataByDate = () => {
  return getMonthsNames().map((month) => {
    return { name: month, sales: 0 }
  })
}

const getURL = (imgFile) => {
  var urlCreator = window.URL || window.webkitURL
  var imageUrl   = urlCreator.createObjectURL(imgFile)
  return imageUrl
}

const boundaryStyle = {
  width:  '400px',
  height: '300px',
}

const createDictionaryForm = ({ target }) => {
  let details = {}
  for (let i = 0; target[i].type !== "submit"; i++) {
    let name      = target[i].name
    let value     = target[i].value
    details[name] = value
  }
  return details
}

export { createChartDefaultDataByDate, getMonthsNames, getURL, boundaryStyle, createDictionaryForm }
