
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
div.style.overflowY = "scroll";
document.body.appendChild(div);

var browse = document.createElement("input");
browse.setAttribute("type","file");
browse.setAttribute("id","image-browse");
//browse.style.position = "relative";
//browse.style.right = "20px";
//browse.style.top = "30px";
browse.style.float = "right";
browse.style.width = "100px";
browse.style.overflow = "hidden";
//browse.style.padding = "10px";
//browse.style.color = "white";
//browse.style.backgroundColor = "dodgerBlue";
div.appendChild(browse);

var compressButton = document.createElement("input");
compressButton.setAttribute("type","submit");
compressButton.setAttribute("value","Compress");
compressButton.setAttribute("id","image-compress");
compressButton.style.clear = "both";
compressButton.style.float = "right";
compressButton.style.padding = "10px";
compressButton.style.textAlign = "center";
compressButton.style.color = "white";
compressButton.style.borderRadius = "10px";
compressButton.style.marginTop = "10px";
compressButton.style.width = "100px";
compressButton.style.backgroundColor = "dodgerBlue";
div.appendChild(compressButton);



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
            var a = document.createElement('a');
            a.setAttribute("download","download.jpg");
            a.setAttribute("id","drag-copy" + Date.now());

            var img = document.createElement('img');
            //img.setAttribute("id","drag-copy" + Date.now());
            img.setAttribute("width","150px");
            img.setAttribute("height","200px");
            img.style.borderRadius = "10px";
            a.style.display = "none";
            img.style.marginRight = "10px";
            img.style.marginBottom = "10px";
            var src = ev.target.getAttribute("src");

            toDataURL(ev.target.getAttribute("src"), function(dataUrl) {
                console.log('RESULT:', dataUrl);
                img.src = dataUrl;
                a.setAttribute("href",dataUrl);
            })

            //img.setAttribute("src",src);
            //a.setAttribute("href", src);
            a.appendChild(img); 
            //document.body.appendChild(img);
            document.body.appendChild(a);
            //compressor(img);
            

            console.log(ev.target.getAttribute("src"));
            console.log(a);
            ev.dataTransfer.setData("text", a.getAttribute("id"));
        
            //ev.target.setAttribute("id","image-drag");
            console.log(ev.target);
            //ev.dataTransfer.setData("text", );
    })
});

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
  

document.getElementById("image-compress").addEventListener('click',(ev) => {
          
    },true);    


    
var upload = document.getElementById("image-browse");
upload.addEventListener('change', (evt) => {
    //var freshImage = img.getAttribute('id');
    //var file = new File([blob], "file_name", {lastModified: 1534584790000});
    const compress = new Compress();

    //var ext = img.src.substr(img.src.lastIndexOf(".")+1);
    //console.log(img.src);
    //console.log(ext);
    //var filetype = "image/" + ext;
    //var files = new File([img.src],"newImagefile." + ext ,{type: filetype});
    //console.log(files);
    
    const files = [...evt.target.files];
    compress.compress(files, {
    size: 4, // the max size in MB, defaults to 2MB
    quality: 0.75, // the quality of the image, max is 1,
    maxWidth: 1920, // the max width of the output image, defaults to 1920px
    maxHeight: 1920, // the max height of the output image, defaults to 1920px
    resize: true // defaults to true, set false if you do not want to resize the image width and height
    }).then((images) => {

        console.log("-------Images here ----" + images)
        const img = images[0]
        // returns an array of compressed images
        //preview.src = `${img.prefix}${img.data}`;

        // var image = new Image();
        // image.src = `${img.prefix}${img.data}`;
        // imgdnld.href = `${img.prefix}${img.data}`;
        // imgPreview.src = `${img.prefix}${img.data}`;

        console.log(img);
        //const compressedImage = Compress.convertBase64ToFile(img.data,img.ext);
        //const { prefix, data, endSizeInMb, initialSizeInMb, iterations, sizeReducedInPercent, elapsedTimeInSeconds, alt } = img;

        //output.innerHTML = `<b>Start Size:</b> ${initialSizeInMb} MB <br/><b>End Size:</b> ${endSizeInMb} MB <br/><b>Compression Cycles:</b> ${iterations} <br/><b>Size Reduced:</b> ${sizeReducedInPercent} % <br/><b>File Name:</b> ${alt}<br/>`;
    })
}, false);