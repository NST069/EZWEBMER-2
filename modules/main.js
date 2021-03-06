const FFMpegProc = require('./modules/ffmpegProcess.js');

        let cmd="IM->V";
        
        let p = document.getElementById('output')
        let pic = document.createElement("input");
        pic.setAttribute("type", "file");
        pic.setAttribute("id", "pic");
        pic.setAttribute("accept", `${FFMpegProc.formatsOf("Image")}`);
        
        var img = document.createElement("img");
        
        img.onload = ()=>{
            console.log(`${img.width}x${img.height}px`);
            if(img.width%2!==0 || img.height%2!==0) alert("Invalid resolution");
        };
        pic.onchange = ()=>{
            img.src=pic.files[0].path;
        }
        let aud = document.createElement("input");
        aud.setAttribute("type", "file");
        aud.setAttribute("id", "aud");
        aud.setAttribute("accept", `${FFMpegProc.formatsOf("Audio")}`);
        let submit = document.createElement("input");
        submit.setAttribute("type", "button");
        submit.setAttribute("value", "Run");
        submit.onclick = ()=>{
            let pic = document.getElementById("pic");
            let aud = document.getElementById("aud");
            if (!pic.files[0] || !aud.files[0]){
                if (!pic.files[0]) console.error("<no image>");
                if (!aud.files[0]) console.error("<no audio>");
                return;
            }
            var img = document.createElement("img");
            img.src=pic.files[0].path;
            if(img.width%2!==0 || img.height%2!==0){
                console.error("Invalid resolution");
                return;
            }
            let imgPath = pic.files[0].path;
            let audPath = aud.files[0].path;
            FFMpegProc.exec(FFMpegProc.cmdList().find(cmd=>cmd.name==="IM->V").command(imgPath,audPath,"test"))
        };
        p.appendChild(pic);
        p.appendChild(aud);
        p.appendChild(submit);