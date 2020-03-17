const remote = require('electron').remote;
const app = remote.app;
const saveDirectory = `${app.getPath('documents')}\\EZWEBMER\\`;

let formats = require(`${require('path').resolve(__dirname, '..')}/res/AvailableFormats.json`);

let FFMpegProcess_Commands = [
    { name: `IM->V`, caption: `Image and Audio to Video`, command: 
        (imgpath, audpath, output, format="mp4")=>{
            let outpath = `${saveDirectory}${output}.${format}`;
            let duration = 60;//
            let cmd = `${(imgpath.split('.').pop() === "gif") ? ("-ignore_loop 0 ") : ("-loop 1 -r 1 ")} `+ 
                `-i "${imgpath}" ` + 
                `-i "${audpath}" ` + 
                `-t ${duration} ` +
                `-b:v 0 -crf 2 -b:a 160K -shortest -g 9999 ` +
                `-pix_fmt yuv420p -speed 0 -deadline 0 -threads 4 `+
                `"${outpath}" `;

            return cmd;
        }, formats: formats.filter(fmts=>fmts.name===`Image`).map(fs=>fs.fmts)[0] },            //TODO: Fix
    { name: `V->M`, caption: `Get Audio From Video`, command: 
        (vidpath, format="mp3")=>{
            let outpath = `${saveDirectory}${vidpath.substr(0, vidpath.lastIndexOf('.'))}.${format}`;
            let cmd = `-i "${vidpath}" -ar 44100 -ac 2 `+
            `${format==="mp3" ? `-vn -acodec mp3 -ab 320 `: ``}`+
            `${format==="wav" ? `-vn -acodec pcm_s16le `: ``}`+
            `${format==="flac" ? `-acodec flac -bits_per_raw_sample 16 `: ``}`+
            `-f ${format} "${outpath}"`;

            return cmd;
        }, formats: formats.filter(fmts=>fmts.name===`Video`).map(fs=>fs.fmts)[0] },            //TODO: Fix
    { name: `V->GIF`, caption: `Video To GIF`, command: 
        (vidpath)=>{
            let outpath = `${saveDirectory}${vidpath.substr(0, vidpath.lastIndexOf('.'))}.gif`;
            let cmd = `-i "${vidpath}" "${outpath}"`;

            return cmd;
        }, formats: [`gif`] },
    { name: `GIF->V`, caption: `GIF To Video`, command: 
        (imgpath, format="mp4")=>{
            let outpath = `${saveDirectory}${imgpath.substr(0, imgpath.lastIndexOf('.'))}.${format}`;
            let cmd = `-i "${imgpath}"` +
            `-movflags faststart -pix_fmt yuv420p -vf "scale = trunc(iw / 2) * 2:trunc(ih / 2) * 2" ` +
            `"${outpath}"`;

            return cmd;
        }, formats: formats.filter(fmts=>fmts.name===`Video`).map(fs=>fs.fmts)[0] },            //TODO: Fix
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
    console.log(cmdText);
}


module.exports = {
    exec: ExecuteProcess,
    cmdList: ()=>{
        return FFMpegProcess_Commands;
    }, 
    formats: formats,
    formatsOf: (type)=>{
        return formats.filter(fmts=>fmts.name==type).map(fs=>fs.fmts)[0].map(fmt=>`.${fmt}`).join(', '); 
    },
    test: ()=>{
        let cmdtest1 = FFMpegProcess_Commands.find(cmd=>cmd.name===`IM->V`);
        let cmdtest2 = FFMpegProcess_Commands.find(cmd=>cmd.name===`V->M`);
        let cmdtest3 = FFMpegProcess_Commands.find(cmd=>cmd.name===`V->GIF`);
        let cmdtest4 = FFMpegProcess_Commands.find(cmd=>cmd.name===`GIF->V`);

        return `<h2>${cmdtest1.caption}</h2>
                <h3>${cmdtest1.formats.map(fmt=>`.${fmt}`).join(' ')}</h3>
                <p>${cmdtest1.command(`t1.png`,`t2.mp3`,`t3`)}</p>`+
            `<h2>${cmdtest2.caption}</h2>
                <h3>${cmdtest2.formats.map(fmt=>`.${fmt}`).join(' ')}</h3>
                <p>${cmdtest2.command(`t1.mp4`)}</p>`+
            `<h2>${cmdtest3.caption}</h2>
                <h3>${cmdtest3.formats.map(fmt=>`.${fmt}`).join(' ')}</h3>
                <p>${cmdtest3.command(`t1.gif`)}</p>`+
            `<h2>${cmdtest4.caption}</h2>
                <h3>${cmdtest4.formats.map(fmt=>`.${fmt}`).join(' ')}</h3>
                <p>${cmdtest4.command(`t1.mp4`)}</p>`;
    }
}