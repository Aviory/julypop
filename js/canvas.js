var paintBoard = document.getElementById('paintBoard');
var  ctx   = paintBoard.getContext('2d');

var mouse = {x: 0, y: 0};
paintBoard.addEventListener("mousedown", click_down);
paintBoard.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

var select = "paint";
ctx.lineWidth = 2;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'azure';

function click_down(e) {
    ctx.beginPath();
    if(select == "paint"){
        ctx.moveTo(mouse.x, mouse.y);
		getPaintBroad();
        paintBoard.addEventListener("mousemove", onPaint);
    }
    if(select == "erase"){
        ctx.clearRect(mouse.x, mouse.y, 5, 5);
        paintBoard.addEventListener("mousemove", onErase);
    }
}
paintBoard.addEventListener('mouseup', function() {
    paintBoard.removeEventListener('mousemove', onPaint, false);
    paintBoard.removeEventListener('mousemove', onErase, false);
	save_broad();
}, false);
function onPaint(e) {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
}
function onErase() {
    ctx.clearRect(mouse.x, mouse.y, 7, 7);
}
function paint_clear() {
    ctx.clearRect(0, 0, paintBoard.width, paintBoard.height);
    save_broad();
}
function save_broad() {
    var data_Broad = "data_Broad="+paintBoard.toDataURL();
    var tmp = paintBoard.toDataURL();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/setData_Broad.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data_Broad);
}
function getPaintBroad() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/getData_Broad.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var data_Broad = xhr.responseText;
                var img = document.createElement('img');
                img.setAttribute('src', data_Broad);
                ctx.drawImage(img, 0,0);
            }
        }
    };
}