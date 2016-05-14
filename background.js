function makeRequestsWithStorageData() {
  ////// возможно у нас есть что-то сохранёное в настройках расширения. Сделаем запрос с этими данными
  chrome.storage.local.get(['clinicId', 'specialityIds'], function (items) {
    console.log('ITEMS', items);
    if (items.clinicId === undefined) {
      return; //  Не задана клиника для запроса
    }
    if (items.specialityIds === undefined || items.specialityIds.length == 0) {
      return; // Не заданы специальности для отслеживания
    }

    var i;
    for (i in items.specialityIds) {
      Requests.getTicketsForSpeciality(items.clinicId, items.specialityIds[i], xhrOnReadyChangeCallback);
    }
  });
}

makeRequestsWithStorageData();


chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log('ALARM!');
  if (alarm.name == 'noti') {
    makeRequestsWithStorageData();
  }
});

//ниже мы указываем, что наша фоновая задача должна запускаться каждые [periodInMinutes] минут
chrome.alarms.create('noti', { 
    delayInMinutes: 1, //здесь указываем через сколько времени будет запускаться наша фоновая задача первый раз
    periodInMinutes: 1 //здесь указываем через сколько времени будет запускаться наша фоновая задача повторно
});



///////////////////////////////////////////////////////////////
var notificationsData = [];


chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
  console.log(notificationId, buttonIndex);
  // if (notificationId == 'resultNotification') {
    if (buttonIndex == 0) { // кликнули на "Посмотреть на странице"
      // УМЕЕМ ПОКАЗЫВАТЬ ТОЛЬКО ОДНУ СТРАНИЦУ НА УВЕДОМЛЕНИЕ
      chrome.tabs.create({url: 'http://google.com'}, function(tab) {
        var data = notificationsData.pop();
        var url = catalog.clinics[data.requestData.clinicId].url;
        var specId = data.requestData.specId;

        // создаём форму в открытой табе, с методом POST и отправляем её
        chrome.tabs.executeScript(tab.id, {
          'code':
            // "document.body.style.backgroundColor='red';" +
            "var form = document.createElement('form');" +
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
        });
      });
      console.log(notificationsData);
    }
    if (buttonIndex == 1) { // кликнули "Не нужен"
      chrome.notifications.clear(notificationId);
    }
  // }
});

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  console.log('ON MESSAGE', message, sender);
  // если пришло сообщение что нужно сдёрнуть список по специальности
  if (message.hasOwnProperty('type') && message.type === 'specList') {
    var i;
    for (i in message.spec) {
      Requests.getTicketsForSpeciality(message.clinic, message.spec[i], xhrOnReadyChangeCallback);
    }
  }
});



xhrOnReadyChangeCallback = function(xhr, requestData) { // (3)
  if (xhr.readyState != 4) {
    return;
  }

  loadedHtml.innerHTML = xhr.responseText;

  // варианты на выбор передаются в <input id="listreturn">
  // var list = $('#listreturn');
  // console.log(list);

  var enabledDoctors = $('button.SM_ACTIV[onClick*=codemed] span');
  var data, notification;

  console.log(enabledDoctors);
  if (enabledDoctors.length > 0) {

    data = {
      'type': 'basic',
      'title': requestData.clinic,
      'message': 'Есть свободные номерки: ' + requestData.spec,
      'iconUrl': '128.png',
      'items': [],
      'buttons': [
        {'title': 'Посмотреть на странице'},
        {'title': 'Не нужен'}
      ]
    };

    // var i;
    // for (i in enabledDoctors) {
    //   var text = enabledDoctors[i].innerText;
    //   if (text !== undefined && text !== '') {
    //     data.items.push({'title': text, 'message': ''});
    //   }
    // }
    // console.log(data);

    notification = chrome.notifications.create('resultNotification' + requestData.specId, data, function(notificationId) {
      // put notification data to storage
      notificationsData.push({'id': notificationId, requestData: requestData});
      // при закрытии уведомления - почистим и хранилище от него
      chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
        notificationsData = notificationsData.filter(function(item) {
          return item.id != notificationId;
        });
      });
    });
    chrome.browserAction.setBadgeBackgroundColor({'color': '#00FF00'});
    chrome.browserAction.setBadgeText({text: '' + enabledDoctors.length});

  } else {
    console.log(xhr);
    // data = {
    //   'type': 'basic',
    //   'title': requestData.clinic,
    //   'message': requestData.spec + '. Номерков нет.',
    //   'iconUrl': '128.png'
    // };
    // notification = chrome.notifications.create('resultNotification', data);
    chrome.browserAction.setBadgeText({text: ''});
  }
};



// запрос на список врачей (44 - невропатолог)
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=10&DIALOGSPECCOMMAND=2&CODETYPE=&CODESPEC=44&SELECTUCH="]);
//Requests.getDoctorsList(xhr, catalog.clinics.poly62.url, catalog.clinics.poly62.specialities.neuropathist.code);

// запрос на страницу конкретно СТЕПАНОВОЙ, в случае наличия свободных номерков, будет несколько кнопок с подписями
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=20&CODETYPE=&CODEMED=%E462.18&CODESPEC=44&SELECTUCH=&CODEGRUP=&FIRSTDAY="]);

// запрос на страницу конкретной даты, которая была на зелёной кнопке. Страница со списком номерков.
// на каждой кнопке номерка написано "номер занят", "номер зарезервирован", ...?
// xhr.open('POST', 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe', true);
// xhr.send(["USER=&COMMAND=30&CODETYPE=&CODEMED=%E462.33&CODESPEC=37&DATE=06%2F05%2F2016&SELECTUCH=&TIMEEND=&TIMESTOPBEGIN=&TIMESTOPEND="]);
