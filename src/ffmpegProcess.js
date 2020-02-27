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
        (imgpath, audpath, output, format=".mp4")=>{
            let cmd = `IM->V`;

            return cmd;
        }, formats: [...formats.filter(fmts=>fmts.name===`Image`)] },
    { name: `V->M`, caption: `Get Audio From Video`, command: 
        (imgpath, audpath, output, format=".mp4")=>{
            let cmd = ``;

            return cmd;
        }, formats: [...formats.filter(fmts=>fmts.name===`Video`)] },
    { name: `V->GIF`, caption: `Video To GIF`, command: 
        (imgpath, audpath, output, format=".mp4")=>{
            let cmd = ``;

            return cmd;
        }, formats: [...formats.filter(fmts=>fmts.name===`Video`)] },
    { name: `GIF->V`, caption: `GIF To Video`, command: 
        (imgpath, audpath, output, format=".mp4")=>{
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
    let ffmpegFolder = `../ffmpeg`;//`C:\Users\\nisla\Documents\EZWEBMER_JS_DEV\EZWEBMER-2\\ffmpeg`;
    let cmdText = `/c cd \"${ffmpegFolder}\" & ffmpeg ${cmd}`;

    //start process here
    Console.log(cmdText);
}