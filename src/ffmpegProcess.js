let saveDirectory = ()=>{
    let fs = require('fs');
    let shell = new ActiveXObject("WScript.Shell");
    let dir = `${shell.SpecialFolders('MyDocuments')} \\EZWEBMER\\`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};

const formats = [
    {name: `Image`, fmts: [`.jpg`, `.png`, `.gif`]},
    {name: `Audio`, fmts: [`.wav`, `.mp3`, `.flac`]},
    {name: `Video`, fmts: [`.webm`, `.mp4`]},
]

const FFMpegProcess_Commands = [
    { name: `IM->V`, caption: `Image and Audio to Video`, command: 
        (imgpath, audpath, output, format="mp4")=>{
            let outpath = `${saveDirectory}${output}.${format}`;
            let duration = 60;//
            let cmd = ` ${(imgpath.split('.').pop() === "gif") ? (" -ignore_loop 0 ") : ("-loop 1 -r 1 ")} `+ 
                `-i "${imgpath}" ` + 
                `-i "${audpath}" ` + 
                `-t ${duration} ` +
                `-b:v 0 -crf 2 -b:a 160K -shortest -g 9999 ` +
                `-pix_fmt yuv420p -speed 0 -deadline 0 -threads 4 `+
                `"${output}" `;

            return cmd;
        }, formats: [...formats.filter(fmts=>fmts.name===`Image`)] },
    { name: `V->M`, caption: `Get Audio From Video`, command: 
        (imgpath, audpath, output, format="mp3")=>{
            let cmd = ``;

            return cmd;
        }, formats: [...formats.filter(fmts=>fmts.name===`Video`)] },
    { name: `V->GIF`, caption: `Video To GIF`, command: 
        (imgpath, audpath, output)=>{
            let cmd = ``;

            return cmd;
        }, formats: [...formats.filter(fmts=>fmts.name===`Video`)] },
    { name: `GIF->V`, caption: `GIF To Video`, command: 
        (imgpath, audpath, output, format="mp4")=>{
            let cmd = ``;

            return cmd;
        }, formats: [`.gif`] },
    /*
    { name: `GIF->V`, caption: `GIF To Video`, command: 
        (imgpath, audpath, output, format=".mp4")=>{
            let cmd = ``;

            return cmd;
        }, formats: `` },
    */
];

function ExecuteProcess(cmd){
    let ffmpegFolder = `/ffmpeg`;
    let cmdText = `/c cd \"${ffmpegFolder}\" & ffmpeg ${cmd}`;

    //start process here
    Console.log(cmdText);
}

let cmdtest = FFMpegProcess_Commands.find(cmd=>cmd.name===`IM->V`);
console.log(cmdtest.command(`t1`,`t2`,`t3`));