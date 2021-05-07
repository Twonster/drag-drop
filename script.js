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
        item.style.left = left + 'px'
        item.style.top = top + 'px'
    })
    spawnedItem.forEach( item => item.style.position = 'absolute' )
    spawnedItem.forEach( item => item.innerText === '' && item.remove() )
}

function takeLetter(event) {
    if (event.target.className === 'item') {
        const element = document.getElementById(event.target.id)
        const clone = document.createElement('div')

        const initPosition = {
            val: `${element.innerText}`,
            left: `${event.pageX - element.offsetWidth / 2}`,
            top: `${event.pageY - element.offsetWidth / 2}`,
            leftPosition: `${event.target.style.left}`,
            rightPosition: `${event.target.style.top}`
        }

        element.style.opacity = 0.5

        clone.classList.add('clone')
        
        clone.innerText = element.innerText
        clone.style.transform = 'transform: scale(1.1)'
        clone.style.position = 'absolute'
        clone.style.zIndex = 10
        clone.style.left = `${initPosition.left}px`
        clone.style.top = `${initPosition.top}px`

        clone_container.append(clone)
        
        function drag (event) {
            clone.style.left = `${ event.pageX - clone.offsetWidth / 2 }px`
            clone.style.top =`${ event.pageY - clone.offsetWidth / 2 }px`
        }
        
        function pushLetter(event) {
            clone_container.removeChild(clone)
            const mouse = document.elementFromPoint(event.clientX, event.clientY)

            if (mouse.className === 'item' && mouse.id !== element.id) {
                element.style.opacity = 1
                element.style.transition = 'all 0.3s cubic-bezier(1, -0.4, 0, 1) 0s'
                element.style.transform = 'none'
                element.style.zIndex = 0
                element.style.left = `${mouse.style.left}`
                element.style.top = `${mouse.style.top}`

                mouse.style.transition = 'all 0.3s cubic-bezier(1, -0.4, 0, 1) 0s'
                mouse.style.transform = 'none'
                mouse.style.zIndex = 0
                mouse.style.left = `${initPosition.leftPosition}`
                mouse.style.top = `${initPosition.rightPosition}`

            } else {
                element.style.opacity = 1
                element.style.border = 'none'
                element.style.transition = 'all 0.3s cubic-bezier(1, -0.47, 0, 1) 0s'
                element.style.transform = 'none'
                element.style.zIndex = 0
                element.style.left = `${event.pageX - element.offsetWidth / 2}px`
                element.style.top = `${event.pageY - element.offsetWidth / 2}px`
            }
            
            clone.removeEventListener('mousemove', drag)
            clone.removeEventListener('mouseup', pushLetter)
            clone.removeEventListener('mousedown', takeLetter)
        }
        
        clone.addEventListener('mouseup', pushLetter)
        document.body.addEventListener('mousemove', drag)
        clone.ondragstart = () => false;
    }
}

input.addEventListener( 'keyup', (event) => event.key === 'Enter' && createWord() )
button.addEventListener('click', createWord)
container.addEventListener('mousedown', takeLetter)
