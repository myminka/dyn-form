const formDef1 =
    [
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
        { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
        { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
        },
        { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
        { label: 'Описание сайта:', kind: 'memo', name: 'description' },
        { caption: 'Опубликовать', kind: 'submit' },
    ];

const formDef2 =
    [
        { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
        { label: 'Имя:', kind: 'longtext', name: 'firstname' },
        { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
        { label: 'Возраст:', kind: 'number', name: 'age' },
        { caption: 'Зарегистрироваться', kind: 'submit' },
    ];

let firstForm = document.forms.firstForm;
let secondForm = document.forms.secondForm;

generateForm(firstForm, formDef1);
generateForm(secondForm, formDef2);

function generateForm(form, elements){
    console.log(form);

    elements.forEach(element => {
      if('label' in element){
        let labelChildElement = document.createElement('label');
        labelChildElement.innerHTML = element.label;
        form.appendChild(labelChildElement);
      }

      let childElement = generateChildElement(element); 
      form.appendChild(childElement)

      let brChildElement = document.createElement('br');
      form.appendChild(brChildElement);
    });
}

function generateChildElement(element){
    switch (element.kind){
        case 'submit':
            return generateButton(element);
        case 'combo':
            return generateSelect(element);
        case 'radio':
            return generateRadio(element);
        default:
            return generateInput(element);
    }
}

function generateButton(element){
    let childElement = document.createElement('button');    
    childElement.innerHTML = element.caption;

    for (let key in element){
        childElement.setAttribute(key, element[key]);
    }

    return childElement;
}

function generateSelect(element){
    let childElement = document.createElement('select');

    element.variants.forEach(variant => {
        let optionElement = document.createElement('option');
        optionElement.innerHTML = variant.text;
        optionElement.setAttribute('value', variant.value);
        childElement.appendChild(optionElement);
    });

    return childElement;
}

function generateRadio(element){
    let fieldsetElement = document.createElement('fieldset');

    element.variants.forEach(e => {
        let childElement = document.createElement('input');
        childElement.setAttribute('type', 'radio');
        childElement.setAttribute('value', e.value);
        childElement.setAttribute('id', e.value);
        childElement.setAttribute('name', element.name)
        fieldsetElement.appendChild(childElement);

        let inputChildElement = document.createElement('label');
        inputChildElement.innerHTML = e.text;
        fieldsetElement.appendChild(inputChildElement);
    });

    return fieldsetElement;
}

function generateInput(element){
    let childElement = document.createElement('input');

        childElement.setAttribute('kind', element.kind);
        childElement.setAttribute('name', element.name);

    return childElement;
}