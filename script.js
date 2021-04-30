const input = document.getElementsByClassName('text-inp')[0]
const button = document.getElementsByClassName('confirm-btn')[0]
const container = document.getElementsByClassName('words-container')[0]

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
        item.style.top = top
    })
}

function takeLetter(event) {
    if (event.target.className === 'item') {
        console.log('take')
        const element = document.getElementById(event.target.id)
        element.style = `transform: scale(1.1); position: absolute; z-index: 10; left: ${event.pageX - element.offsetWidth / 2}px; top: ${event.pageY - element.offsetWidth / 2}px`
        
        
        function drag (event) {
            console.log('drag')
            element.style.left = `${ event.pageX - element.offsetWidth / 2 }px`
            element.style.top =`${event.pageY - element.offsetWidth / 2 }px`
        }
        
        function pushLetter(event) {
            console.log('push')
            const element = document.getElementById(event.target.id)
            element.style = `transform: none; position: absolute; left: ${event.pageX - element.offsetWidth / 2}px; top: ${event.pageY - element.offsetWidth / 2}px` 
            element.removeEventListener('mousemove', drag)
            element.removeEventListener('mouseup', pushLetter)
            element.removeEventListener('mousedown', takeLetter)
        }
        
        element.addEventListener('mouseup', pushLetter)
        element.addEventListener('mousemove', drag)
        element.ondragstart = () => false;
    }
}


button.addEventListener('click', createWord)
container.addEventListener('mousedown', takeLetter)
