/**
 * Created by Кудесник on 25.04.2016.
 */
function queryForCategory(category) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/categoryForBase.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(category);
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var data = xhr.responseText; // Выводим ответ сервера
                var reclist = JSON.parse(data);
                document.getElementById("main").innerHTML = "";
                for(var i = 0; i < reclist.length; i++)
                {
                    var row = rowRecipeAndFillData(reclist[i]);
                    document.getElementById("main").appendChild(row);
                }
                var edit = document.getElementById("edits"); <!-- очистить поле добавления и добавить кнопку -->
                edit.innerHTML = "";

                edit.appendChild(btnAddNewRec());

                init();<!-- обновить футер -->
            }
        }
    };
}
function queryForTenRec() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/lastTenRec.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var data = xhr.responseText; // Выводим ответ сервера
                var reclist = JSON.parse(data);
                document.getElementById("main").innerHTML = "";
                for(var i = 0; i < reclist.length; i++)
                {
                    var row = rowRecipeAndFillData(reclist[i]);
                    document.getElementById("main").appendChild(row);
                }
                var edit = document.getElementById("edits"); <!-- очистить поле добавления и добавить кнопку -->
                edit.innerHTML = "";

                edit.appendChild(btnAddNewRec());

                init();<!-- обновить футер -->
            }
        }
    };
}
function btnAddNewRec() {
    var newBtnAdd = document.createElement("button");
    newBtnAdd.setAttribute("onclick", "addRecept()");
    newBtnAdd.setAttribute("class", "btnAdd");
    newBtnAdd.innerText = "Добавить рецепт";
    return newBtnAdd;
}
function liked() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/likedRec.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var data = xhr.responseText; // Выводим ответ сервера
                var reclist = JSON.parse(data);
                document.getElementById("main").innerHTML = "";
                for(var i = 0; i < reclist.length; i++)
                {
                    var row = rowRecipeAndFillData(reclist[i]);
                    document.getElementById("main").appendChild(row);
                }
                var edit = document.getElementById("edits"); <!-- очистить поле добавления и добавить кнопку -->
                edit.innerHTML = "";

                edit.appendChild(btnAddNewRec());

                init();<!-- обновить футер -->
            }
        }
    };
}
function addLikeRec(id, check) {
    var query = "id="+id+"&check="+check;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/changeLikeRec.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(query);
}
function changeRaiting(id, value) {
    var tmp = [0,5,4,3,2,1];
    var query = "id="+id+"&rait="+tmp[value];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/updateRaiting.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(query);
}