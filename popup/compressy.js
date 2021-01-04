
document.getElementById('div1').addEventListener('drop',(ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    },true);

document.getElementById('div1').addEventListener('ondragover',(ev) => {
        ev.preventDefault()
    },true);

document.getElementById('drag1').addEventListener('ondragstart',(ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    },true);
