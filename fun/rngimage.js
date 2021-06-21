module.exports  = {
    rngimage: function(FILENAME, ext){
        var DIR = './assests/image/'+FILENAME+"/";
        fs = require('fs');
        var len = (fs.readdirSync(DIR)).length;
        var num = Math.floor(Math.random()*len)+1;
        var filepath = DIR + num + '.' + ext;
        console.log(filepath);
        return filepath;
    }   
};