
/////////// REQUESTS ////////////////
// запрос на список врачей (44 - невропатолог)
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=44&SELECTUCH="]);
var Request = {

  getSpecialityList: function(clinicId, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        return;
      }

      callback(xhr, {
        'clinicId': clinicId,
        'clinic': clinics[clinicId].title
      });
    };
    
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
