const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const taskDescriptionDOM = document.querySelector('.task-input-description')
const taskStatusDOM = document.querySelector('.task-input-status')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const {_id: taskID, name, status, description } = task
        var isCompleted = false;
        var inProgress = false;
        if(status === 'In Progress'){
          inProgress = true;
        }else if(status === 'Done'){
          isCompleted = true
        }
        const truncatedDescription = description.substring(0, 15);
        return `<div class="single-task ${isCompleted && 'task-completed'}">
<h5><span> <i class="${inProgress ? 'fas fa-spinner' : isCompleted ? 'far fa-check-circle' : 'far fa-circle'}"></i></i></span>${name} -  ${truncatedDescription}...</h5>

<div class="task-links">
<div>
</div>


<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = document.querySelector('[name="name"]').value;
  const description = document.querySelector('[name="description"]').value;
  const status = document.querySelector('[name="status"]').value;
  try {
    await axios.post('/api/v1/tasks', { name, description, status})
    showTasks()
    taskInputDOM.value = ''
    taskDescriptionDOM.value = ''
    taskStatusDOM.value = 'To Do'
    // document.querySelector('[name="name"]').value = ''
    // document.querySelector('[name="description"]').value = ''
    // document.querySelector('[name="status"]').value = ''

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again ${error}`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})