
var view = chrome.extension.getViews()[0];
var loadedHtml = view.document.createElement('html');

function $(selector) {
  return loadedHtml.querySelectorAll(selector);
}


/////////// REQUESTS ////////////////
// запрос на список врачей (44 - невропатолог)
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=44&SELECTUCH="]);
var Requests = {
  /**
   *
   * @param xhr XMLHttpRequest
   * @param clinicUrl string
   * @param specialityCode integer
   */
  getDoctorsList: function(xhr, clinicUrl, specialityCode) {
    if (specialityCode === undefined) {
      return 'Не указана специализация для списка врачей';
    }
    xhr.open('POST', clinicUrl, true);
    xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=" + specialityCode + "&SELECTUCH="]);
  },

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