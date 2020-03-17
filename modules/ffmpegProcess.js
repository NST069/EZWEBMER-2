const remote = require('electron').remote;
const app = remote.app;
const saveDirectory = `${app.getPath('documents')}\\EZWEBMER\\`;

let formats = require(`${require('path').resolve(__dirname, '..')}/res/AvailableFormats.json`);

let ParseCmdsJSON = ()=>{
    let list = require(`${require('path').resolve(__dirname, '..')}/res/cmds.json`);
    let cmds = [];
    list.forEach(element => {
        element.command = eval(element.command);
        element.formats=(typeof(element.formats)==='string')?formats.filter(fmts=>fmts.name===element.formats).map(fs=>fs.fmts)[0]:element.formats;
        cmds.push(element);
    });
    //console.log(cmds);
    return cmds;
};

let FFMpegProcess_Commands = ParseCmdsJSON();

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