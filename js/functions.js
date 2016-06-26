
/////////// REQUESTS ////////////////
// запрос на список врачей (44 - невропатолог)
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=44&SELECTUCH="]);
var Requests = {

  getSpecialityList: function(clinicId, xhrCallback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        return;
      }

      xhrCallback(xhr, {
        'clinicId': clinicId,
        'clinic': clinics[clinicId].title
      });
    };
console.log(clinicId);
    var clinicUrl = clinics[clinicId].url;

    xhr.open('POST', clinicUrl, true);
    xhr.send(["COMMAND=2&TITLE=1"]);
  },

  getDoctorListBySpeciality: function(clinicId, specCode, xhrCallback) {
    if (specCode === undefined) {
      return 'Не указана специализация для списка врачей';
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        return;
      }

      var spec = '';
      for (i in clinics[clinicId].specialities) {
        if (clinics[clinicId].specialities[i].code == specCode) {
          spec = clinics[clinicId].specialities[i].title;
          break;
        }
      }

      xhrCallback(xhr, {
        'clinicId': clinicId,
        'specId': specCode,
        'clinic': clinics[clinicId].title,
        'spec': spec
      });
    };

    var clinicUrl = clinics[clinicId].url;

    xhr.open('POST', clinicUrl, true);
    xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=" + specCode + "&SELECTUCH="]);
  }
};

var CodeSnippets = {
  getInputElementCode: function(varName, type, name, value) {
    return "var " + varName + " = document.createElement('input');" +
      "inputUser.setAttribute('type', '" + type + "');" +
      "inputUser.setAttribute('name', '" + name + " ');" +
      "inputUser.setAttribute('value', '" + value + "');";
  },
  createAndSendFormForDoctorsListBySpeciality: function(clinicId, specId) {
    var url = clinics[clinicId].url;

    return "var form = document.createElement('form');" +
      "form.setAttribute('method', 'POST');" +
      "form.setAttribute('action', '" + url + "');" +

      "var inputUser = document.createElement('input');" +
      "inputUser.setAttribute('type', 'hidden');" +
      "inputUser.setAttribute('name', 'USER');" +
      "inputUser.setAttribute('value', '');" +

      "var inputCommand = document.createElement('input');" +
      "inputCommand.setAttribute('type', 'hidden');" +
      "inputCommand.setAttribute('name', 'COMMAND');" +
      "inputCommand.setAttribute('value', '10');" +

      "var inputDialogCommand = document.createElement('input');" +
      "inputDialogCommand.setAttribute('type', 'hidden');" +
      "inputDialogCommand.setAttribute('name', 'DIALOGSPECCOMMAND');" +
      "inputDialogCommand.setAttribute('value', '2');" +

      "var inputCodeType = document.createElement('input');" +
      "inputCodeType.setAttribute('type', 'hidden');" +
      "inputCodeType.setAttribute('name', 'CODETYPE');" +
      "inputCodeType.setAttribute('value', '1');" +

      "var inputCodeSpec = document.createElement('input');" +
      "inputCodeSpec.setAttribute('type', 'hidden');" +
      "inputCodeSpec.setAttribute('name', 'CODESPEC');" +
      "inputCodeSpec.setAttribute('value', '" + specId + "');" +

      "var inputSelectUch = document.createElement('input');" +
      "inputSelectUch.setAttribute('type', 'hidden');" +
      "inputSelectUch.setAttribute('name', 'SELECTUCH');" +
      "inputSelectUch.setAttribute('value', '');" +

      "form.appendChild(inputUser);" +
      "form.appendChild(inputCommand);" +
      "form.appendChild(inputDialogCommand);" +
      "form.appendChild(inputCodeType);" +
      "form.appendChild(inputCodeSpec);" +
      "form.appendChild(inputSelectUch);" +

      "document.body.appendChild(form);" +
      "form.submit();"
  }

};

var Renderer = {
  renderClinicSelectForm: function(document, clickCallback) {
    var formElement = document.getElementById('form');
    formElement.innerHTML = '';

    var field1 = document.createElement('div');
    field1.setAttribute('class', 'formField');

    var label = document.createElement('label');
    label.setAttribute('class', 'formLabel');
    label.setAttribute('for', 'clinic');
    label.innerText = 'Выберите поликлинику:';

    var select = document.createElement('select');
    select.setAttribute('id', 'clinic');

    var options = [];
    var i, selected;
    for (i in clinics) {
      selected = (i === clinicSelectedValue);
      options.push('<option value="' + i + '" ' + (selected ? ' selected ' : '') +'>' + clinics[i]['title'] + '</option>');
    }
    select.innerHTML = options.join("\n");

    field1.appendChild(label);
    field1.appendChild(select);

    var field2 = document.createElement('div');
    field2.setAttribute('class', 'formField');

    var button = document.createElement('button');
    button.setAttribute('class', 'buttonNext');
    button.innerText = 'Далее';

    field2.appendChild(button);

    formElement.appendChild(field1);
    formElement.appendChild(field2);

    button.addEventListener('click', clickCallback);
  },
  renderSpecialitiesForm: function(document, formDataArray, clickCallback) {
    var formElement = document.getElementById('form');
    formElement.innerHTML = '';

    for (var i in formDataArray) {
      var field = document.createElement('div');
      field.setAttribute('class', 'formField');

      var el = document.createElement('button');
      el.setAttribute('value', i);
      el.innerText = formDataArray[i];

      field.appendChild(el);
      formElement.appendChild(field);

      el.addEventListener('click', clickCallback);
    }
  },

  renderDoctorsForm: function(document, formDataArray, clickCallback) {
    var formElement = document.getElementById('form');
    formElement.innerHTML = '';

    for (var i in formDataArray) {
      var field = document.createElement('div');
      field.setAttribute('class', 'formField');

      var el = document.createElement('button');
      el.setAttribute('value', i);
      el.innerText = formDataArray[i];

      field.appendChild(el);
      formElement.appendChild(field);

      el.addEventListener('click', clickCallback);
    }
  }
};