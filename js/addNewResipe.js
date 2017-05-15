/**
 * Created by user on 18.04.2016.
 */
function rowRecipeAndFillData(rec) {
    var section = document.createElement("article");<!-- внешний артикль всего блока -->

    section.appendChild(addStarsDiv(rec));<!-- рейтинг -->

    var headerName = document.createElement("h1");<!-- заголовок рецепта -->
    headerName.innerText = rec.name;
    section.appendChild(headerName);

    section.appendChild(addImage(rec));<!-- картинки рецепта -->

    var ingridient = document.createElement("article");<!-- внутринний артикль ингридиентов -->
    ingridient.setAttribute("class", "ingridients");
    section.appendChild(ingridient);

    var h2_Ingridients = document.createElement("h2");<!-- заголовок ингридиентов -->
    h2_Ingridients.innerText = "Ingredients";
    ingridient.appendChild(h2_Ingridients);
    ingridient.appendChild(add_ul(rec));

    var cooking = document.createElement("article");<!-- внутренний артикль приготовления -->
    cooking.setAttribute("class", "cooking");
    section.appendChild(cooking);

    var h2_Cooking = document.createElement("h2");
    h2_Cooking.innerText = "Cooking";
    cooking.appendChild(h2_Cooking);
    cooking.appendChild(addCooking(rec));

    section.appendChild(addBtnCheck(rec));
    section.appendChild(addBtnDel(rec));<!-- настройки рецепта -->
    section.appendChild(addBtnUpd(rec));<!-- настройки рецепта -->

    
    return section;
}
function add_ul(rec) {<!-- пробег по ингридиентам -->
    var ul = document.createElement("ul");
    var strIng = rec.ingridients;
    var ar = strIng.split(/[\n\r]+/);

    for (var i = 0; i < ar.length; i++) {
        var li = document.createElement("li");
        li.innerText = ar[i];
        ul.appendChild(li);
    }
    return ul;
}
function addCooking(rec) {<!-- пробег по приготовлению -->
    var p = document.createElement("p");
    p.innerText = rec.cooking;
    return p;
}
function addImage(rec) {<!-- картинка рецепта -->
    var set_img = rec.image.split(/[\n\r]+/);
    var block_image = document.createElement("div");
    block_image.setAttribute('class', 'block_img');
    for (var i = 0; i < set_img.length-1; i++){
        if(set_img[i]!="")
        {
            var image = document.createElement("img");
            if (block_image.childNodes[0] == null) {
                var div_bigimg = document.createElement("div");
                div_bigimg.setAttribute('class', 'div_bigimg');

                image.setAttribute("src", set_img[i]);
                image.setAttribute("class", "big_img");
                div_bigimg.appendChild(image);
                block_image.appendChild(div_bigimg);
            }
            else {
                image.setAttribute("class", "small_img");
                image.setAttribute('onclick', 'image_change(this)');
                image.setAttribute("src", set_img[i]);
                block_image.appendChild(image);
            }
        }
    }
    return block_image;
}
function image_change(element) {<!-- смена картинок -->
    var tmp = element.parentElement.firstElementChild.firstElementChild.src;
    element.parentElement.firstElementChild.firstElementChild.src = element.src;
    element.src = tmp;
}
function addBtnDel(rec) {<!-- настройки рецепта -->
    var btn = document.createElement("button");
    btn.setAttribute('value', rec.id);
    btn.setAttribute('onclick', 'readyDel(this,this.value)');
    btn.setAttribute('class', 'btn_option');
    btn.innerText = "D";
    return btn;
}
function addBtnUpd(rec) {<!-- настройки рецепта -->
    var btn = document.createElement("button");
    btn.setAttribute('value', rec.id);
    btn.setAttribute('onclick', 'updateRec(this.value)');
    btn.setAttribute('class', 'btn_option');
    btn.innerText = "R";
    return btn;
}
function addBtnCheck(rec) {
    var btn = document.createElement("input");
    btn.setAttribute('type', 'checkbox');
    if(rec.liked == "true"){
        btn.setAttribute('checked', '');
    }
    btn.setAttribute('class', 'btn_option');
    btn.setAttribute('value', rec.id);
    btn.setAttribute('onclick', 'addLikeRec(this.value, this.checked)');
    return btn;
}
function addStarsDiv(rec) {
    var tmp = [0,5,4,3,2,1];
    var btn = document.createElement("div");
    btn.setAttribute('class', 'raiting');
    btn.setAttribute('id', 'raiting-input');
    for (var i=1;i<=5;i++){
        var tmpRadio = document.createElement("input");
        tmpRadio.setAttribute('type', 'radio');
        tmpRadio.setAttribute('id', 'star-'+rec.id+i);
        tmpRadio.setAttribute('name', rec.id);
        if(tmp[rec.raiting]==i){
            tmpRadio.setAttribute('checked', '');
        }
        tmpRadio.setAttribute('value', i);
        tmpRadio.setAttribute('onclick', 'changeRaiting(this.name, this.value)');
        btn.appendChild(tmpRadio);

        var tmpLabel = document.createElement("label");
        tmpLabel.setAttribute('for', 'star-'+rec.id+i);
        btn.appendChild(tmpLabel);
    }
    return btn;
}