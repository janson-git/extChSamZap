// ГЛОБАЛЬНЫЕ ПРИВЯЗКИ К ЭЛЕМЕНТАМ
var clinicControl = document.getElementById('clinic');
var specControlsList = document.getElementById('specialities');

// функции отрисовки отдельных элементов формы

////// возможно у нас есть что-то сохранёное для формы. Восстановим значения
chrome.storage.local.get(['clinicId','specialityIds'], function(items) {
  console.log('ITEMS', items);
  clinicControl.value = items.clinicId;
  renderSpecialitiesByClinicId(items.clinicId, items.specialityIds);
});

// при смене поликлиники - нужно перерисовать список специальностей (могут быть разные коды)
function renderSpecialitiesByClinicId(clinicId, selectedList) {
  var specList = catalog.clinics[clinicId]['specialities'];
  selectedList = selectedList || [];

  var selectSpecialities = specControlsList; // ul
  var items = [];
  var code, name, selected;
  for (i in specList) {
    code = specList[i].code;
    name = specList[i].title;
    selected = selectedList.indexOf(code) !== -1 ? ' checked ' : '';
    console.log(code, selectedList, selectedList.indexOf(code), selected);
    items.push('<li><input type="checkbox" name="speciality[]" value="' + code + '" ' + selected + '>' + name + '</li>');
  }
  selectSpecialities.innerHTML = items.join("\n");
}

/////////////////// Регистрируем обработчики изменений
clinicControl.addEventListener('change', function(e) {
  console.log(e.target.value);
  renderSpecialitiesByClinicId(e.target.value);
});


document.getElementById('searchButton').addEventListener('click', function(e) {
  console.log(e.target);

  var checkBoxList = document.getElementsByName('speciality[]');
  var selectedBoxes = [];
  console.log(checkBoxList);
  for (i in checkBoxList) {
    if (checkBoxList.hasOwnProperty(i) && checkBoxList[i].checked === true) {
      selectedBoxes.push(parseInt(checkBoxList[i].value));
    }
  }

  // TODO: сохранение заданых настроек в storage и запуск отслеживания
  console.log(clinicControl.value);
  console.log(selectedBoxes);

  chrome.storage.local.set({
    clinicId: clinicControl.value,
    specialityIds: selectedBoxes
  });

  chrome.runtime.sendMessage(
    {"type": "specList", "clinic": clinicControl.value, "spec": selectedBoxes}
  );

  //
  // var bgPage = chrome.runtime.getBackgroundPage(function(bgWindow) {
  //   bgWindow.tt();
  //   console.log('Callback', bgWindow);
  // });
});


// ОТРИСУЕМ СЕЛЕКТОРЫ НАСТРОЕК В СООТВЕТСТВИИ С КОНФИГУРАЦИОННЫМ ФАЙЛОМ

// 0. TODO: смотреть в хранилище на предмет сохранёных данных о поиске.
//    Там будут хранится настройки расширения между запусками браузера и т.д.
//    Туда и нам нужно будет сохранять выбраные пользователем настройки.

// 1. отрисуем селектор поликлиник
var selectClinic = document.getElementById('clinic');
var options = [];
var i;
for (i in catalog.clinics) {
  options.push(
    '<option value="' + i + '">' + catalog.clinics[i]['title'] + '</option>'
  );
}
selectClinic.innerHTML = options.join("\n");

// console.log('STORAGE', chrome.storage.StorageArea.get(['clinic', 'specialities']));


// 2. отрисуем выбор специальностей
var selectedClinic = selectClinic.value;
renderSpecialitiesByClinicId(selectedClinic);

