// Для разбора HTML, полученого по запросу
var view = chrome.extension.getViews()[0];
var loadedHtml = view.document.createElement('html');

function $(selector) {
  if (selector.indexOf('#') !== 0) {
    return loadedHtml.querySelectorAll(selector);
  }
  return loadedHtml.querySelector(selector);
}

// ГЛОБАЛЬНЫЕ ЗНАЧЕНИЯ И ПРИВЯЗКИ К ЭЛЕМЕНТАМ
var clinicControl = document.getElementById('clinic');
var clinicSelectedValue;
var specSelectedValue;
var currentStep = 1;

// функции отрисовки отдельных элементов формы

////// возможно у нас есть что-то сохранёное для формы. Восстановим значения
chrome.storage.local.get(['clinicId','specialityIds'], function(items) {
  // console.log('ITEMS', items);
  // clinicControl.value = items.clinicId;
  // renderSpecialitiesByClinicId(items.clinicId, items.specialityIds);
});


/////////////////// Регистрируем обработчики изменений

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

function goForClinicSelect(e) {
  // РИСУЕМ ФОРМУ ВЫБОРА КЛИНИКИ
  Renderer.renderClinicSelectForm(document, clinicSelectCallback);
  currentStep = 1;
  document.getElementById('back').setAttribute('class', 'hide');
}

function clinicSelectCallback(e) {
  console.log(e.target, document.getElementById('clinic'));
  var clinicControlLocal = document.getElementById('clinic');
  clinicSelectedValue = clinicControlLocal.value;
  goForSpecSelect();
}
function goForSpecSelect() {
  // Сделаем запрос на список доступных специальностей в поликлинике
  Requests.getSpecialityList(clinicSelectedValue, function(xhr, requestData) {
    console.log('SPECIALITIES LIST:', xhr);

    loadedHtml.innerHTML = xhr.responseText;
    var spec = parseListDataOnPage();
    console.log(spec);

    // РИСУЕМ ФОРМУ ВЫБОРА СПЕЦИАЛЬНОСТИ
    Renderer.renderSpecialitiesForm(document, spec, specSelectCallback);
    currentStep = 2;
    document.getElementById('back').setAttribute('class', '');
  });
}

function specSelectCallback(e) {
  specSelectedValue = e.target.value;
  goForDoctorSelect();
}

function goForDoctorSelect() {
  // Сделаем запрос на список доступных специальностей в поликлинике
  Requests.getDoctorListBySpeciality(clinicSelectedValue, specSelectedValue, function(xhr, requestData) {
    console.log('DOCTORS LIST:', xhr);

    loadedHtml.innerHTML = xhr.responseText;

    // варианты на выбор передаются в <input id="listreturn">
    var doctors = parseListDataOnPage();
    console.log(doctors);

    var enabledDoctors = $('button.SM_ACTIV[onClick*=codemed] span');
    console.log(enabledDoctors);

    // РИСУЕМ ФОРМУ ВЫБОРА ВРАЧА
    Renderer.renderDoctorsForm(document, doctors, doctorClicked);
    currentStep = 3;
    document.getElementById('back').setAttribute('class', '');
  });
}

function doctorClicked(e) {
  console.log('DOCTOR CLICKED:', e.target);
}


function goBackOneStep(e) {
  var backStep = currentStep - 1;
  switch (backStep) {
    case 2:
      goForSpecSelect();
      break;
    default:
      goForClinicSelect();
  }
}

// document.getElementById('selectClinic').addEventListener('click', goForSpecSelect);
document.getElementById('back').addEventListener('click', goBackOneStep);
goForClinicSelect();


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


// console.log('STORAGE', chrome.storage.StorageArea.get(['clinic', 'specialities']));

