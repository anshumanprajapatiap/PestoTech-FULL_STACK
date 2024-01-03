const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskDescriptionDOM = document.querySelector('.task-edit-description')
const taskStatusDOM = document.querySelector('.task-edit-status')

const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName
let tempDescription
let tempStatus

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, description, name, status } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    taskDescriptionDOM.value = description
    taskStatusDOM.value = status

    tempName = name
    tempDescription = description
    tempStatus = status
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = document.querySelector('[name="name"]').value;
    const taskDescription = document.querySelector('[name="description"]').value;
    const taskStatus = document.querySelector('[name="status"]').value;
    // const taskName = taskNameDOM.value
    // const taskDescription = taskDescriptionDOM.value 
    // const taskStatus = taskStatusDOM.value

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      description: taskDescription,
      status: taskStatus
    })

    const { _id: taskID, description, name, status } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    taskDescriptionDOM.value = description
    taskStatusDOM.value = status

    tempName = name
    tempDescription = description
    tempStatus = status

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    askDescriptionDOM.value = tempDescription
    taskStatusDOM.value = tempStatus
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})