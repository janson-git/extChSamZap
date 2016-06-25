// Для разбора HTML, полученого по запросу
var view = chrome.extension.getViews()[0];
var loadedHtml = view.document.createElement('html');

function $(selector) {
  if (selector.indexOf('#') !== 0) {
    return loadedHtml.querySelectorAll(selector);
  }
  return loadedHtml.querySelector(selector);
}


// ГЛОБАЛЬНЫЕ ПРИВЯЗКИ К ЭЛЕМЕНТАМ
var clinicControl = document.getElementById('clinic');

// функции отрисовки отдельных элементов формы

////// возможно у нас есть что-то сохранёное для формы. Восстановим значения
chrome.storage.local.get(['clinicId','specialityIds'], function(items) {
  // console.log('ITEMS', items);
  // clinicControl.value = items.clinicId;
  // renderSpecialitiesByClinicId(items.clinicId, items.specialityIds);
});


/////////////////// Регистрируем обработчики изменений
// clinicControl.addEventListener('change', function(e) {
//   console.log(e.target.value);
// });

function parseListDataOnPage() {
  // варианты на выбор передаются в <input id="listreturn">
  var listStr = $('#listreturn').value;
  var list = listStr.split(';');
  var spec = {}; // array of {specKey: specTitle} pairs
  for (var i in list) {
    var s = list[i].split('-');
    spec[s[0]] = s[1];
  }
  return spec;
}

function goForSpecSelect(e) {
    // Сделаем запрос на список доступных специальностей в поликлинике
    Requests.getSpecialityList(clinicControl.value, function(xhr, requestData) {
      console.log('SPECIALITIES LIST:', xhr);

      loadedHtml.innerHTML = xhr.responseText;
      var spec = parseListDataOnPage();
      console.log(spec);
      //
      // var enabledDoctors = $('button.SM_ACTIV[onClick*=codemed] span');
      // var data;

      // TODO: РИСУЕМ ФОРМУ ВЫБОРА СПЕЦИАЛЬНОСТИ
      Renderer.renderSpecialitiesForm(document, spec, specClicked);
    });
}

function specClicked(e) {
  goForDoctorSelect(e);
}

function goForDoctorSelect(e) {
  var clinicId = clinicControl.value;
  var specCode = e.target.value;

  // Сделаем запрос на список доступных специальностей в поликлинике
  Requests.getDoctorListBySpeciality(clinicControl.value, specCode, function(xhr, requestData) {
    console.log('DOCTORS LIST:', xhr);

    loadedHtml.innerHTML = xhr.responseText;

    // варианты на выбор передаются в <input id="listreturn">
    var doctors = parseListDataOnPage();
    console.log(doctors);
    //
    // var enabledDoctors = $('button.SM_ACTIV[onClick*=codemed] span');
    // var data;

    // TODO: РИСУЕМ ФОРМУ ВЫБОРА СПЕЦИАЛЬНОСТИ
    Renderer.renderDoctorsForm(document, doctors, doctorClicked);
  });
}

function doctorClicked(e) {
  console.log('DOCTOR CLICKED:', e.target);
}

document.getElementById('selectClinic').addEventListener('click', goForSpecSelect);

//
// document.getElementById('searchButton').addEventListener('click', function(e) {
//   console.log(e.target);
//
//   var checkBoxList = document.getElementsByName('speciality[]');
//   var selectedBoxes = [];
//   console.log(checkBoxList);
//   for (i in checkBoxList) {
//     if (checkBoxList.hasOwnProperty(i) && checkBoxList[i].checked === true) {
//       selectedBoxes.push(parseInt(checkBoxList[i].value));
//     }
//   }
//
//   // TODO: сохранение заданых настроек в storage и запуск отслеживания
//   console.log(clinicControl.value);
//   console.log(selectedBoxes);
//
//   chrome.storage.local.set({
//     clinicId: clinicControl.value,
//     specialityIds: selectedBoxes
//   });
//
//   chrome.runtime.sendMessage(
//     {"type": "specList", "clinic": clinicControl.value, "spec": selectedBoxes}
//   );
//
//   //
//   // var bgPage = chrome.runtime.getBackgroundPage(function(bgWindow) {
//   //   bgWindow.tt();
//   //   console.log('Callback', bgWindow);
//   // });
// });


// ОТРИСУЕМ СЕЛЕКТОРЫ НАСТРОЕК В СООТВЕТСТВИИ С КОНФИГУРАЦИОННЫМ ФАЙЛОМ

// 0. TODO: смотреть в хранилище на предмет сохранёных данных о поиске.
//    Там будут хранится настройки расширения между запусками браузера и т.д.
//    Туда и нам нужно будет сохранять выбраные пользователем настройки.

// 1. отрисуем селектор поликлиник
var selectClinic = document.getElementById('clinic');
var options = [];
var i;
for (i in clinics) {
  options.push(
    '<option value="' + i + '">' + clinics[i]['title'] + '</option>'
  );
}
selectClinic.innerHTML = options.join("\n");

// console.log('STORAGE', chrome.storage.StorageArea.get(['clinic', 'specialities']));

