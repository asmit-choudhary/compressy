
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.start);
    if(message.start == true){
        var elem = document.querySelector("#compressor-div");
        if(elem != null){
            elem.style.display = "unset";
            return;
        }
        var div = document.createElement('div');
        div.setAttribute("id","compressor-div");
        div.style.height = "200px";
        div.style.width = "100%";
        div.style.padding = "20px";
        div.style.zIndex = "10000";
        div.style.backgroundColor = "rgba(0,0,0,0.5)";
        div.style.position = "fixed";
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.overflowY = "scroll";
        document.body.appendChild(div);

        var browse = document.createElement("input");
        browse.multiple = true;
        browse.setAttribute("type","file");
        browse.setAttribute("id","image-browse");
        browse.style.float = "right";
        browse.style.width = "103px";
        browse.style.overflow = "hidden";
        div.appendChild(browse);

        var compressButton = document.createElement("input");
        compressButton.setAttribute("type","submit");
        compressButton.setAttribute("value","Compress");
        compressButton.setAttribute("id","image-compress");
        compressButton.disabled = true;
        compressButton.style.clear = "both";
        compressButton.style.float = "right";
        compressButton.style.padding = "10px";
        compressButton.style.textAlign = "center";
        compressButton.style.color = "white";
        compressButton.style.borderRadius = "10px";
        compressButton.style.marginTop = "10px";
        compressButton.style.width = "103px";
        compressButton.style.backgroundColor = "#ADD8E6";
        compressButton.style.outline = "none";
        div.appendChild(compressButton);


        document.getElementById("compressor-div").addEventListener('drop', (ev) => {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            console.log("drop Data = " + data);
            document.getElementById(data).style.display = "inline-block";
            ev.target.appendChild(document.getElementById(data));
        },true);
        
        document.getElementById("compressor-div").addEventListener('dragover', (ev) => {
            console.log("--->" + ev.target);
            ev.preventDefault();
        },true);
        
        
        document.querySelectorAll('img').forEach(item => {
                item.addEventListener('dragstart', (ev) => {  
                    var a = document.createElement('a');
                    a.setAttribute("download","download.jpg");
                    a.setAttribute("id","drag-copy" + Date.now());
        
                    var img = document.createElement('img');
                    img.setAttribute("width","150px");
                    img.setAttribute("height","100px");
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
        
                    a.appendChild(img); 
                    document.body.appendChild(a);
                    
        
                    console.log(ev.target.getAttribute("src"));
                    console.log(a);
                    ev.dataTransfer.setData("text", a.getAttribute("id"));
                
                    console.log(ev.target);
                    
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
            var imagesDiv = document.getElementById("compressed-images").childNodes;
            var childs = imagesDiv.length;
            for(let i = 0; i < childs; i++){
                imagesDiv[i].click();   
            }
        },true);    
        
        
            
        var upload = document.getElementById("image-browse");
        upload.addEventListener('change', (evt) => {
            const compress = new Compress();
            const files = [...evt.target.files];
        
            compress.compress(files, {
            size: 4, // the max size in MB, defaults to 2MB
            quality: 0.75, // the quality of the image, max is 1,
            maxWidth: 1920, // the max width of the output image, defaults to 1920px
            maxHeight: 1920, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
            }).then((images) => {
                // images is an array of images.
        
                setCompressImages(images);
                compressButton.disabled = false;
                compressButton.style.backgroundColor = "dodgerBlue";
        
                //const compressedImage = Compress.convertBase64ToFile(img.data,img.ext);
                //const { prefix, data, endSizeInMb, initialSizeInMb, iterations, sizeReducedInPercent, elapsedTimeInSeconds, alt } = img;
        
                //output.innerHTML = `<b>Start Size:</b> ${initialSizeInMb} MB <br/><b>End Size:</b> ${endSizeInMb} MB <br/><b>Compression Cycles:</b> ${iterations} <br/><b>Size Reduced:</b> ${sizeReducedInPercent} % <br/><b>File Name:</b> ${alt}<br/>`;
            })
        }, false);
        
    }
    else{
        console.log("---FALSE---");
        var element = document.querySelector("#compressor-div");
        if(element != null){
            element.style.display = "none";
        }
        
    }

}

// global array containing compressed images.
var compressedImagesIds = [];


function setCompressImages(images){
    if(document.getElementById('compressed-images') != null){
        var element = document.getElementById('compressed-images');
        element.parentNode.removeChild(element);
    }
    else{
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("id","compressed-images");
        imgDiv.style.display = "none";
        document.body.appendChild(imgDiv);
    }

    for(let i = 0; i < images.length; i++){
        const img = images[i];

        var a = document.createElement('a');
        var ext = img.ext.substr(img.ext.lastIndexOf('/')+1);
        console.log(images[i]);                                
        a.setAttribute("download","download-compressed" + i + "." + ext);
        var id = "com-img-" + Date.now();
        a.setAttribute("id",id);
        a.setAttribute("href",`${img.prefix}${img.data}`);
        
        var image = new Image();
        compressedImagesIds.push(id);
        image.src = `${img.prefix}${img.data}`;
        a.appendChild(image);
        imgDiv.appendChild(a);
    }
}