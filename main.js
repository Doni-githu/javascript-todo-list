const list = document.getElementById('list')
const term = document.getElementById('term')
const btn = document.getElementById('btn')
const change = document.getElementById('termChage')
const addButton = document.getElementById('add')
const addInput = document.getElementById('addInput')
const error = document.getElementsByClassName('error')[0]
const termUpdate = document.getElementById('termUpdate')

let index = 0;

const data = JSON.parse(localStorage.getItem('data')) || []


function createByData(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const listItemClone = listItem.cloneNode(true)
        const btnDelete = btnItem.cloneNode(true)
        const btnUpdate = btnItem.cloneNode(true)
        listItemClone.className = 'txt'
        listItemClone.id = element.txt
        listItemClone.textContent = element.txt
        btnDelete.className = element.id
        btnDelete.id = 'click'
        btnDelete.textContent = 'Delete'
        btnDelete.addEventListener('click', (e) => {
            let id = parseInt(e.target.getAttribute('class'))
            list.innerHTML = ''
            data = data.filter(c => c.id !== id)
            createByData(data)
            localStorage.setItem('data', JSON.stringify(data))
        })

        btnUpdate.className = element.id
        btnUpdate.textContent = 'Update'
        btnUpdate.id = 'click'
        btnUpdate.addEventListener('click', function () {
            termUpdate.classList.remove('hid')
            change.classList.remove('hid')
            index2 = parseInt(this.className)
            index = index2
            found = data.filter(c => c.id === index2)
            termUpdate.value = found[0].txt
        })
        listItemClone.appendChild(btnDelete)
        listItemClone.appendChild(btnUpdate)
        list.append(listItemClone)
    }
}

const listItem = document.createElement('li')
const btnItem = document.createElement('button')

createByData(data)

// Search alghortim didn't working who can help me
// btn.onclick = function () {
//     if (term.value.length === 0) {
//         list.innerHTML = ''
//         createByData(data)
//         return
//     }
//     list.innerHTML = ''
//     let dataFake = []
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         if (element.txt.toLowerCase().includes(term.value.toLowerCase())) {
//             dataFake.push(element)
//         }
//     }
//     createByData(dataFake)
// }

change.onclick = function () {
    if (termUpdate.value.length === 0) {
        error.classList.remove('hid')
        const buttonNo = btnItem.cloneNode(true)
        error.style.gap = '20px'
        error.style.flexDirection = 'column'

        buttonNo.textContent = 'Are you sure?!'
        buttonNo.addEventListener('click', function () {
            change.classList.add('hid')
            termUpdate.classList.add('hid')
        })
        buttonNo.style.outline = '2px solid red'
        buttonNo.style.color = 'red'
        buttonNo.style.fontSize = '20px'
        error.childNodes[0].textContent = 'This field are very important, if you want to rename it'
        error.append(buttonNo)
        return
    }


    var result = data.map((item) => {
        if (item.id === index) {
            return {
                id: item.id,
                txt: termUpdate.value
            }
        }
        return item
    })
    list.innerHTML = ''
    localStorage.setItem('data', JSON.stringify(result))
    createByData(result)
    termUpdate.classList.add('hid')
    change.classList.add('hid')
}

addButton.onclick = function () {
    if (addInput.value.length === 0) {
        error.classList.remove('hid')
        error.childNodes[0].textContent = 'All fields are required'
        return
    }
    list.innerHTML = ''
    const something = {
        id: Date.now(),
        txt: addInput.value
    }
    const changedData = [...data, something]
    createByData(changedData)
    localStorage.setItem('data', JSON.stringify(changedData))
    addInput.value = ''
    error.classList.add('hid')
}