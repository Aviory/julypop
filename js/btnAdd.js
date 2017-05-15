/**
 * Created by user on 01.04.2016.
 */
var newRecept
{
    function addRecept() {<!-- форма для добавления нового рецепта -->
        var edit = document.getElementById("edits");
        edit.innerHTML = "";

        var form = document.createElement('form');
        form.setAttribute('enctype', 'multipart/form-data');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'DAL/insert.php');
        form.setAttribute('onsubmit','return validate(this)');
        edit.appendChild(form);

        var h2_Ingridients = document.createElement("h2"); <!-- создание заголовока имени -->
        h2_Ingridients.innerText = "Name";
        form.appendChild(h2_Ingridients);

        var txtname = document.createElement('textarea');<!-- создание имени рецепта -->
        txtname.setAttribute('name', 'recname');
        txtname.rows = 2;
        txtname.cols = 35;
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
        newTxtIng.maxLength = 3000;
        form.appendChild(newTxtCook);

        var btn = document.createElement('input');
        btn.setAttribute('type', 'submit');
        btn.setAttribute('value', 'загрузить');
        btn.setAttribute('class', 'btnAdd');
        form.appendChild(btn);
    }
    function showError(container, errorMessage) {
        //container.className = 'error';
        if(!document.getElementById('erorr_log')){
            var msgElem = document.createElement('span');
            msgElem.className = "error";
            msgElem.innerHTML = errorMessage;
            msgElem.setAttribute('id', 'erorr_log');
            container.appendChild(msgElem);
        }
        else {
            document.getElementById('erorr_log').innerHTML=errorMessage;
        }
    }
    function validate(form) {
        var elemens = form.elements;
        var edit = document.getElementById('edits');
        var query = true;
        if(!elemens.categoryes.value){
            showError(edit, ' Укажите категорию.');
            query = false;
        }
        if(!elemens.recname.value){
            showError(edit, ' Укажите название рецепта.');
            query = false;
        }
        if(!elemens.ingridients.value){
            showError(edit, ' Укажите ингридиенты.');
            query = false;
        }
        if(!elemens.cookings.value){
            showError(edit, ' Укажите приготовление.');
            query = false;
        }
        if(query==true){
            footerTimeSet();
        }
        return query;
    }

    function categorySelect() {
        var select = document.createElement('select');
        select.setAttribute('size', '5');
        select.setAttribute('name', 'categoryes');
        select.setAttribute('onchange', 'podcategorySelect(this.options[this.selectedIndex].value)');
        var drop_menu = document.getElementById("leftNav").firstElementChild;
        for (var i=0;i<drop_menu.childElementCount-1;i++){
            var str_category = drop_menu.children[i].firstElementChild.innerText;
            select.appendChild(addOption(str_category));
        }
        return select;
    }

    function podcategorySelect(category) {
        if(!document.getElementById('podcategory')){
            var select = document.createElement('select');
            select.setAttribute('size', '5');
            select.setAttribute('name', 'podcategoryes');
            select.setAttribute('id', 'podcategory');
        }
        else {
            var select = document.getElementById('podcategory');
            select.innerHTML = "";
        }

        var drop_menu = document.getElementById("leftNav").firstElementChild;
        for (var i=0;i<drop_menu.childElementCount;i++){
            var str_category = drop_menu.children[i].firstElementChild.innerText;
            if(category==str_category){
                list_menu = drop_menu.children[i].lastElementChild;
                for (var j=0;j<list_menu.childElementCount;j++){
                    var str_podcategory = list_menu.children[j].firstElementChild.innerText;
                    select.appendChild(addOption(str_podcategory));
                }
            }
        }
        var form = document.getElementById("edits").firstElementChild;
        form.insertBefore(select, form.children[4] );
    }
    function addOption(opt_name) {
        var option = document.createElement('option');
        option.setAttribute('value', opt_name);
        option.innerText = opt_name;
        return option;
    }
    function fileLoad(){
        var img = document.createElement('input');
        img.setAttribute('class', 'add_img');
        img.setAttribute('name', 'images[]');
        img.setAttribute('type', 'file');
        img.setAttribute('accept', 'image/*');
        img.setAttribute('multiple', '');
        return img;
    }
}
