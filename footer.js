/**
 * Created by Кудесник on 09.05.2016.
 */
function init() {
    getFooterTime();
    getSumRecipes();
    getPaintBroad();
    getBackgroundImage();
}
function footerTimeSet() {
    var d    = new Date();
    var day  = d.getDate();
    var month= d.getMonth();
    var year = d.getFullYear();
    var h    = d.getHours();
    var m    = d.getMinutes();
    var s    = d.getSeconds();
    
    var time = 'day='+day+'&month='+month+'&year='+year+'&h='+h+'&m='+m+'&s='+s;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/footer/setTime.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(time);
}

function getFooterTime(){
    var time = "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/footer/getTime.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var time = document.getElementById('ftime');
                var data = JSON.parse(xhr.responseText);
                time.setAttribute('datetime', data.year+'-'+data.month+'-'+data.day+' '+data.h+':'+data.m+':'+data.s);
                time.innerText =  data.year+'-'+getMounth(data.month)+'-'+data.day+' in '+data.h+':'+data.m+':'+data.s;
            }
        }
    };
}
function getMounth(i) {
    var mau = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return mau[i];
}
function getSumRecipes() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/footer/getSum.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                document.getElementById('sum_resipe').innerText = xhr.responseText;
            }
        }
    };
}
function getBackgroundImage() {
	var r    = Math.round(Math.random()*3);
	document.body.style.backgroundImage = "url(res/hall"+r+".jpg)";
		
}
