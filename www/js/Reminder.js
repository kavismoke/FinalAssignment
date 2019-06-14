// const collectFromData = formId =>
//   new FormData(document.getElementById(formId))

// const cronString = form =>
//   `${form.get('minute') || '*'} ${form.get('hour')} ${form.get('day')} ${form.get('month')} ${form.get('weekday')}`
  
// const buildReminderCronString = () => cronString(collectFromData('reminder-form'))

// document.getElementById('preview-button')
//   .addEventListener('click', e => console.log(buildReminderCronString()), { passive: true, capture: false })

const insertDates = e => {
  const target = document.getElementById('preview-area')
  const dates = ['2018-06-01','2018-07-01','2018-08-01','2018-09-01','2018-10-01']
  const html = dates.map(d => `<p class='__fade-in'>${d}</p>`).join('')
  target.innerHTML = html
  if (!target.classList.contains('show')) {
    target.classList.add('show')
  }
  
}

document.getElementById('preview-button')
  .addEventListener('click', insertDates, { passive: true, capture: false })


// const reminderRepeating = value =>
//   value !== '*' ? true : false

// const today = new Date()
// const year = today.getFullYear()

// const repeatDates = function* (form) {
//   const minute = form.get('minute') || 0
//   const hour = form.get('hour') === '*' ? 0 : 24 / parseInt(form.get('hour'))
//   const day = form.get('day') === '*' ? 0 : 31 / parseInt(form.get('day'))
//   const weekday = form.get('weekday') === '*' ? 0 : 7 / parseInt(form.get('weekday'))
//   const month = form.get('month') === '*' ? 0 : 12 / parseInt(form.get('month'))

//   const genDate = new Date(year, month)
// }
