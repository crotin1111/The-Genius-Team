fetch('https://api.imgflip.com/get_memes')
.then(response => response.json())
.then(data => {
    var memes = data.data.memes;
    for(i = 0; i < memes.length; i++){
        document.body.insertAdjacentHTML('afterBegin', `<img src='${memes[i].url}' width='100'>`)
    }
})