/**
 * Created by user on 15.04.2016.
 */

function qpost(){
    var query = "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/dataBase.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    var data = "cl";
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                data = xhr.responseText; // Выводим ответ сервера
                var edit = document.getElementById("edits");
                edit.innerHTML = "";
                var reclist = JSON.parse(data);
                for(var i = 0; i < reclist.length; i++)
                {
                    var row = rowRecipeAndFillData(reclist[i]);
                    document.getElementById("main").appendChild(row);
                }
                edit.appendChild(btnAddNewRec());
            }
        }
    };
}

