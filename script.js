const redColor = document.querySelector('.red');
const blueColor = document.querySelector('.blue');
redColor.style.backgroundColor = 'red';
blueColor.style.backgroundColor = 'blue';

let userColor;
let prevColor;
const showPrevColor = document.querySelector('.prev-color');

document.querySelector('input').addEventListener('input', updateColor, false);
function updateColor(event) {
    prevColor = userColor;
    userColor = event.target.value;
    showPrevColor.style.backgroundColor = prevColor;
}

// choose tool, set '.-active'
Array.from(document.querySelector('.sidebar__pallete-list').children).forEach(li => {
    li.addEventListener('click', e => {
        e.target.classList.toggle('-active');
        // console.log('click', event);
    });
});

// bucket-fill
Array.from(document.querySelector('.canvas').children).forEach(li => {
    li.addEventListener('click', e => {
        if (document.querySelector('.sidebar__pallete-Item-bucket').classList.contains('-active')) {
            e.target.style.backgroundColor = userColor;
            // console.log('click', event);
        }
    });
});

// transform
Array.from(document.querySelector('.canvas').children).forEach(li => {
    li.addEventListener('click', e => {
        if (
            document.querySelector('.sidebar__pallete-Item-transform').classList.contains('-active')
        ) {
            e.target.classList.toggle('circle');
            // console.log('click', event);
        }
    });
});

// colorPicker
document.addEventListener('click', event => {
    if (document.querySelector('.sidebar__pallete-Item-color').classList.contains('-active')) {
        userColor = getComputedStyle(event.target).backgroundColor;

        // transform rgb tp hex
        function rgbToHex(color) {
            color = `${color}`;
            if (!color || color.indexOf('rgb') < 0) {
                return;
            }
            if (color.charAt(0) == '#') {
                return color;
            }
            const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);

            const r = parseInt(nums[2], 10).toString(16);

            const g = parseInt(nums[3], 10).toString(16);

            const b = parseInt(nums[4], 10).toString(16);
            return `#${(r.length == 1 ? `0${r}` : r) +
                (g.length == 1 ? `0${g}` : g) +
                (b.length == 1 ? `0${b}` : b)}`;
        }

        userColor = rgbToHex(userColor);

        document.querySelector('input').value = userColor;
        // console.log(userColor);
    }
});

const parent = document.querySelector('.canvas');
parent.addEventListener('dragstart', event =>{
    if(event.target.className !== 'canvas-item') return 
    const order = event.target.getAttribute('data-order');
    event.dataTransfer.setData('order', order);
});

parent.addEventListener('drop', event => {
    if(event.target.className !== 'canvas-item') return 
    const resivingElementOrder = event.target.getAttribute('data-order');

    if (event.stopPropagation) {
        event.stopPropagation();
    }
    const targetElementOrder = event.dataTransfer.getData('order');
    swap(resivingElementOrder, targetElementOrder)
      return false;
});

parent.addEventListener('dragover', event => {
    if(event.target.className !== 'canvas-item') return 
    event.preventDefault();
});

function swap(firstElementOrder, secondElementOrder){
    const firstElement = document.querySelector(`.canvas-item[data-order='${firstElementOrder}']`);
    const secondElement = document.querySelector(`.canvas-item[data-order='${secondElementOrder}']`);
    parent.insertBefore(parent.children[firstElementOrder], parent.children[secondElementOrder]);
    // firstElement.dataset.order = firstElementOrder;
    // secondElement.dataset.order = secondElementOrder;
}



// keyboard shortcuts
document.addEventListener('keydown', e => {
    if (e.keyCode === 81) {
        document.querySelector('.sidebar__pallete-Item-bucket').classList.toggle('-active');
    } else if (e.keyCode === 87) {
        document.querySelector('.sidebar__pallete-Item-color').classList.toggle('-active');
    } else if (e.keyCode === 69) {
        document.querySelector('.sidebar__pallete-Item-transform').classList.toggle('-active');
    } else if (e.keyCode === 82) {
        document.querySelector('.sidebar__pallete-Item-move').classList.toggle('-active');
    }
});
