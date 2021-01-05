'use strict'
function print(num) {
    let progress = document.getElementById('progress').value;
    progress = progress + num;
    document.getElementById('progress').value = progress;
}