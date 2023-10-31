let ab = {
    // INIT
    hForm: null, // html форма добавления/редактирования
    hID: null,
    hName: null,
    hEmail: null,
    hTel: null,
    hAddr: null,
    data: [], // записи в адресной книге
    hList: null, // список записей html
    init: () => {
    // ПОЛУЧИТЬ HTML-ЭЛЕМЕНТЫ
    ab.hID = document.querySelector("#abID");
    ab.hForm = document.querySelector("#abForm");
    ab.hName = document.querySelector("#abName");
    ab.hEmail = document.querySelector("#abEmail");
    ab.hTel = document.querySelector("#abTel");
    ab.hAddr = document.querySelector("#abAddr");
    ab.hList = document.querySelector("#abList");
    // ЗАГРУЗИТЬ ЗАПИСИ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА
    let data = localStorage.getItem("ab");
    if (data != null) {
    ab.data = JSON.parse(data);
    }
    // ВЫВЕСТИ АДРЕСНЫЕ ЗАПИСИ
    ab.draw();
    },
    // ПЕРЕКЛЮЧИТЬ ПОКАЗАТЬ/СКРЫТЬ ФОРМУ ЗАПИСИ
    toggle: (id) => {
    // ЗАКРЫТЬ И СКРЫТЬ
    if (id === false) {
    ab.hID.value = "";
    ab.hName.value = "";
    ab.hEmail.value = "";
    ab.hTel.value = "";
    ab.hAddr.value = "";
    ab.hForm.classList.remove("show");
    }
    // ПОКАЗЫВАТЬ
    else {
    // РЕЖИМ РЕДАКТИРОВАНИЯ
    if (Number.isInteger(id)) {
    ab.hID.value = id;
    ab.hName.value = ab.data[id]["n"];
    ab.hEmail.value = ab.data[id]["e"];
    ab.hTel.value = ab.data[id]["t"];
    ab.hAddr.value = ab.data[id]["a"];
    }
    // ПОКАЗАТЬ ФОРМУ ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ
    ab.hForm.classList.add("show");
    }
    },
    
    // СОХРАНИТЬ ВВОД АДРЕСА
    save : () =>
    {
        // ВВОД ДАННЫХ
        let data = 
        {
            n: ab.hName.value,
            e: ab.hEmail.value,
            t: ab.hTel.value,
            a: ab.hAddr.value
        };

        // ДОБАВИТЬ/ОБНОВИТЬ ЗАПИСЬ
        if (ab.hID.value == "")
        {
            ab.data.push(data);
        }
        else
        {
            ab.data[ab.hID.value] = data;
        }

        // ОБНОВИТЬ ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        localStorage.setItem("ab", JSON.stringify(ab.data));
        ab.toggle(false);
        ab.draw();
        return false;
    },
    
    // УДАЛИТЬ ЗАПИСЬ АДРЕСА
    del : (id) => 
    {
        if (confirm("Delete Entry?"))
        {
            ab.data.splice(id, 1);
            localStorage.setItem("ab", JSON.stringify(ab.data));
            ab.draw();
        }
    },

    // ВЫВОД ЗАПИСЕЙ В АДРЕСНОЙ КНИГЕ
    draw : () =>
    {
        ab.hList.innerHTML = "";
        for (let i in ab.data)
        {
            let row = document.createElement("div");
            row.className = "row";
            row.innerHTML = `<div class="info">
            <div>Имя ${ab.data[i]["n"]}</div>
            <div>email ${ab.data[i]["e"]}</div>
            <div>Телефон ${ab.data[i]["t"]}</div>
            </div>
            <div>Адрес ${ab.data[i]["a"]}</div>
            </div>
            <input type="button" class="material-icons" value="удалить" onclick="ab.del(${i})"/>
            <input type="button" class="material-icons" value="редактировать" onclick="ab.toggle(${i})"/>`;
            ab.hList.appendChild(row);
        }
    }
};

window.addEventListener("load", ab.init);