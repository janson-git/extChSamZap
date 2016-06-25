alert('hello ' + document.location.href);


chrome.storage.local.get(['clinicId', 'specialityIds'], function (items) {
  if (items.clinicId === undefined) {
    return; //  Не задана клиника для запроса
  }
  if (items.specialityIds === undefined || items.specialityIds.length == 0) {
    return; // Не заданы специальности для отслеживания
  }

  // СОЗДАДИМ ФОРМУ ДЛЯ POST-ЗАПРОСА С ДАННЫМИ И ОТПРАВИМ ЕЁ
  // var i;
  // for (i in items.specialityIds) {
  //   Requests.getTicketsForSpeciality(items.clinicId, items.specialityIds[i], xhrOnReadyChangeCallback);
  // }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message.requestData);
});