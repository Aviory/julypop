/**
 * Created by Кудесник on 07.05.2016.
 */
function readyDel(node, id) {
    if(node.parentNode.lastChild!=document.getElementById('ReadyDelete')) {
        var div = document.createElement("div");
        div.setAttribute('class', 'btn_ready_del');
        div.setAttribute('id', 'ReadyDelete');
        div.innerText = "Удалить?";
        node.parentNode.appendChild(div);

        var no = document.createElement("button");
        no.setAttribute('onclick', 'removeReadyDel(this)');
        no.setAttribute('class', 'btn_option');
        no.innerText = "Нет";
        div.appendChild(no);
        var yes = document.createElement("button");
        yes.setAttribute('value', id);
        yes.setAttribute('onclick', 'deleteRec(this.value)');
        yes.setAttribute('class', 'btn_option');
        yes.innerText = "Да";
        div.appendChild(yes);
    }
    else {
        node.parentNode.removeChild(node.parentNode.lastChild);
    }
}
function removeReadyDel(node) {
    var div = node.parentNode;
    document.getElementById('ReadyDelete').parentNode.removeChild(div);
}
function deleteRec(id) {
    var query = "id="+id;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/deleteRec.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(query);
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var data = xhr.responseText; // Выводим ответ сервера
                footerTimeSet();
                queryForCategory(data);
            }
        }
    };
}
function updateRec(id) {
    var query = "id="+id;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'DAL/getRec.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(query);
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                var rec = JSON.parse(xhr.responseText); // Выводим ответ сервера

                var edit = document.getElementById("edits");
                edit.innerHTML = "";

                var form = document.createElement('form');
                form.setAttribute('enctype', 'multipart/form-data');
                form.setAttribute('method', 'post');
                form.setAttribute('action', 'DAL/updateRec.php');
                form.setAttribute('onsubmit','return validate(this)');
                edit.appendChild(form);

                var h2_Ingridients = document.createElement("h2"); <!-- создание заголовока имени -->
                h2_Ingridients.innerText = "Name";
                form.appendChild(h2_Ingridients);

                var txtname = document.createElement('textarea');<!-- создание имени рецепта -->
                txtname.setAttribute('name', 'recname');
                txtname.rows = 2;
                txtname.cols = 35;
                txtname.innerText = rec.name;
                form.appendChild(txtname);
                form.innerHTML +="<br>";

                form.appendChild(categorySelect()); <!-- создание категорий и подкатегорий -->

                var h2_Ingridients = document.createElement("h2"); <!-- создание заголовок ингридиенты -->
                h2_Ingridients.innerText = "Ingredients";
                form.appendChild(h2_Ingridients);

                form.appendChild(fileLoad());<!--add картинка -->

                var newTxtIng = document.createElement('textarea'); <!-- создание нгридиенты блок -->
                newTxtIng.setAttribute("name", "ingridients");
                newTxtIng.rows = 11;
                newTxtIng.cols = 35;
                txtsplit(newTxtIng, rec.ingridients);
                newTxtIng.maxLength = 500;
                form.appendChild(newTxtIng);

                var h2_Cooking = document.createElement("h2");<!-- создание риготовление заголовок -->
                h2_Cooking.innerText = "Cooking";
                form.appendChild(h2_Cooking);

                var newTxtCook = document.createElement('textarea');
                <!-- создание приготовление блок -->
                newTxtCook.setAttribute("name", "cookings");
                newTxtCook.rows = 15;
                newTxtCook.cols = 100;
                newTxtCook.innerText = txtsplit(newTxtCook, rec.cooking);;
                newTxtIng.maxLength = 3000;
                form.appendChild(newTxtCook);

                var newid = document.createElement('textarea'); <!-- создание нгридиенты блок -->
                newid.setAttribute("name", "id");
                newid.setAttribute("class", "hides");
                newid.setAttribute('readonly','');
                newid.rows = 1;
                newid.cols = 5;
                newid.maxLength = 22;
                newid.innerText = id;
                form.appendChild(newid);

                var newid = document.createElement('textarea'); <!-- создание нгридиенты блок -->
                newid.setAttribute("name", "oldimage");
                newid.setAttribute("class", "hides");
                newid.setAttribute('readonly','');
                newid.rows = 1;
                newid.cols = 5;
                newid.maxLength = 22;
                newid.innerText = rec.image;
                form.appendChild(newid);

                var btn = document.createElement('input');
                btn.setAttribute('type', 'submit');
                btn.setAttribute('value', 'обновить');
                btn.setAttribute('class', 'btnAdd');
                form.appendChild(btn);
                btn.scrollIntoView(false);
            }
        }
    };
}
function txtsplit(node, text) {
    var ar = text.split(/[\n\r]+/);
    for (var i = 0; i < ar.length; i++) {
        if(ar[i]!="" && ar[i]!=" "&& ar[i]!=null){
            if(i==ar.length-1){
                node.value += ar[i];
            }
            else {
                node.value += ar[i] + "\n";
            }
        }
    }
}
function pageUp() {
    window.scrollTo(0,0);
}