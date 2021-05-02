const input = document.getElementsByClassName('text-inp')[0]
const button = document.getElementsByClassName('confirm-btn')[0]
const container = document.getElementsByClassName('words-container')[0]
const clone_container = document.getElementsByClassName('container')[0]

function spawnItem(val, id) {
    const item = document.createElement('div')
    item.className = 'item'
    item.id = id
    item.innerText = val
    container.append(item)
}

function createWord() {
    container.innerHTML = '';
    const word = input.value.split('')
    word.forEach( (item, index) => spawnItem(item, index) )
    const spawnedItem = document.querySelectorAll('.item')

    spawnedItem.forEach(item => {
        const { left, top } = item.getBoundingClientRect()
        console.log(left)
        item.style.left = left + 'px'
        item.style.top = top + 'px'
    })
    spawnedItem.forEach(item => item.style.position = 'absolute')     
}

function takeLetter(event) {
    if (event.target.className === 'item') {
        console.log('take')
        const element = document.getElementById(event.target.id)
        const clone = document.createElement('div')
        const initPosition = {
            val: `${element.innerText}`,
            left: `${event.pageX - element.offsetWidth / 2}`,
            top: `${event.pageY - element.offsetWidth / 2}`,
            leftPosition: `${event.target.style.left}`,
            rightPosition: `${event.target.style.top}`
        }

        clone.classList.add('clone')
        clone.innerText = element.innerText
        clone.style = `transform: scale(1.1); position: absolute; z-index: 10; left: ${initPosition.left}px; top: ${initPosition.top}px`
        clone_container.append(clone)
        
        function drag (event) {
            console.log('drag')
            clone.style.left = `${ event.pageX - clone.offsetWidth / 2 }px`
            clone.style.top =`${ event.pageY - clone.offsetWidth / 2 }px`
        }
        
        function pushLetter(event) {
            console.log('push')
            clone_container.removeChild(clone)
            const mouse = document.elementFromPoint(event.clientX, event.clientY)
            if (mouse.className === 'item') {
                element.style = `transform: none; position: absolute; left: ${mouse.style.left}; top: ${mouse.style.top}` 
                mouse.style = `transform: none; position: absolute; left: ${initPosition.leftPosition}; top: ${initPosition.rightPosition}`
            } else {
                element.style = `transform: none; position: absolute; left: ${event.pageX - element.offsetWidth / 2}px; top: ${event.pageY - element.offsetWidth / 2}px` 
            }
            clone.removeEventListener('mousemove', drag)
            clone.removeEventListener('mouseup', pushLetter)
            clone.removeEventListener('mousedown', takeLetter)
        }
        
        clone.addEventListener('mouseup', pushLetter)
        clone.addEventListener('mousemove', drag)
        clone.ondragstart = () => false;
    }
}

button.addEventListener('click', createWord)
container.addEventListener('mousedown', takeLetter)
