fetch('https://api.imgflip.com/get_memes')
.then(response => response.json())
.then(data => {
    var memes = data.data.memes;
    for(i = 0; i < memes.length; i++){
        document.getElementById('singles').insertAdjacentHTML('afterBegin', `<a href='${memes[i].url}'><img class='singleImg' src='${memes[i].url}'></a>`)
    }
})