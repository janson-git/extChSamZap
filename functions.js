
/////////// REQUESTS ////////////////
// запрос на список врачей (44 - невропатолог)
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=44&SELECTUCH="]);
var Requests = {

  getTicketsForSpeciality: function(clinicId, specialityCode, xhrCallback) {
    if (specialityCode === undefined) {
      return 'Не указана специализация для списка врачей';
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        return;
      }

      var spec = '';
      for (i in catalog.clinics[clinicId].specialities) {
        if (catalog.clinics[clinicId].specialities[i].code == specialityCode) {
          spec = catalog.clinics[clinicId].specialities[i].title;
          break;
        }
      }

      xhrCallback(xhr, {
        'clinicId': clinicId,
        'specId': specialityCode,
        'clinic': catalog.clinics[clinicId].title,
        'spec': spec
      });
    };

    var clinicUrl = catalog.clinics[clinicId].url;

    xhr.open('POST', clinicUrl, true);
    xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=" + specialityCode + "&SELECTUCH="]);
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
    var url = catalog.clinics[clinicId].url;

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