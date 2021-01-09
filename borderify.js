
var div = document.createElement('div');
div.setAttribute("id","compressor-div");
div.style.height = "200px";
div.style.width = "100%";
div.style.padding = "20px";
div.style.zIndex = "10000";
div.style.backgroundColor = "rgba(0,0,0,0.4)";
div.style.position = "fixed";
div.style.top = "0px";
div.style.left = "0px";
document.body.appendChild(div);


document.getElementById("compressor-div").addEventListener('drop', (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("drop Data = " + data);
    //var img = document.getElementById(data);
    //console.log(img);
    //img.setAttribute("id","image-drop");
    //img.setAttribute("width" ,"150px");
    //img.setAttribute("height" ,"200px");
    document.getElementById(data).style.display = "inline-block";
    ev.target.appendChild(document.getElementById(data));
},true);

document.getElementById("compressor-div").addEventListener('dragover', (ev) => {
    console.log("--->" + ev.target);
    ev.preventDefault();
},true);

// document.getElementsByTagName("img").addEventListener('dragstart',(ev) => {
//     ev.dataTransfer.setData("text", ev.target.id);    
// },true);

document.querySelectorAll('img').forEach(item => {
        item.addEventListener('dragstart', (ev) => {   
            var img = document.createElement('img');
            img.setAttribute("id","drag-copy" + Date.now());
            img.setAttribute("width","150px");
            img.setAttribute("height","200px");
            img.style.display = "none";
            var src = ev.target.getAttribute("src");
            img.setAttribute("src",src);
            document.body.appendChild(img);
            console.log(ev.target.getAttribute("src"));
            console.log(img);
            ev.dataTransfer.setData("text", img.getAttribute("id"));
        
            //ev.target.setAttribute("id","image-drag");
            console.log(ev.target);
            //ev.dataTransfer.setData("text", );
    })
});
