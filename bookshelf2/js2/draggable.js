// Draggable functionality by: https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js

function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

        const draggableElement = document.getElementById(id);
        const dropzone = event.target;
        dropzone.appendChild(draggableElement);

        event
            .dataTransfer
            .clearData();
    }


