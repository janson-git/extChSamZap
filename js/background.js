var Request = require('modules/request');
var getParser = require('modules/parser');

var parser = getParser();

function makeRequestsWithStorageData() {
  ////// возможно у нас есть что-то сохранёное в настройках расширения. Сделаем запрос с этими данными
  chrome.storage.local.get(['clinicId', 'specId', 'doctorId'], function (items) {
    console.log('NEW BG SCRIPT!!!');
    return;
    console.log('ITEMS', items);
    if (items.clinicId === undefined) {
      return; //  Не задана клиника для запроса
    }
    if (items.specId === undefined) {
      return; // Не задана специальность для отслеживания
    }

    if (items.doctorId === undefined) {
      // запросим список докторов по специальности
      Request.getDoctorListBySpeciality(
        items.clinicId,
        items.specId,
        function(response) {
          if (response.status !== 200) {
            console.error(response);
          } else {
            parser.loadedHtml.innerHTML = response.responseText;
            var data = parser.parseListDataOnPage();
            var counters = parser.parsePageForTicketCounts('codespec');

            data.map(function(item, index) {
              var count = 0;
              if (counters[ item.id ] !== undefined) {
                count = counters[item.id];
              }
              data[index]['counter'] = count;
            });
            console.log('LOADED DOCTORS DATA: ', data);
          }
        }
      );
    } else {
      // запросим билетики по доктору
      Request.getDoctorsTicketList(
        items.clinicId,
        items.specId,
        items.doctorId,
        function(response) {
          if (response.status !== 200) {
            console.error(response);
          } else {
            parser.loadedHtml.innerHTML = response.responseText;
            var data = parser.parseListDataOnPage('codedate');
            console.log(data);
            var counters = parser.parsePageForTicketCounts('codedate');

            data.map(function(item, index) {
              var count = 0;
              if (counters[ item.id ] !== undefined) {
                count = counters[item.id];
              }
              data[index]['counter'] = count;
            });
            console.log('LOADED TICKETS DATA: ', data);
          }
        }
      );
    }

  });
}

makeRequestsWithStorageData();

//
// chrome.alarms.onAlarm.addListener(function(alarm) {
//   console.log('ALARM!');
//   if (alarm.name == 'noti') {
//     makeRequestsWithStorageData();
//   }
// });
//
// //ниже мы указываем, что наша фоновая задача должна запускаться каждые [periodInMinutes] минут
// chrome.alarms.create('noti', {
//     delayInMinutes: 1, //здесь указываем через сколько времени будет запускаться наша фоновая задача первый раз
//     periodInMinutes: 1 //здесь указываем через сколько времени будет запускаться наша фоновая задача повторно
// });



///////////////////////////////////////////////////////////////
var notificationsData = [];

//
// chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
//   // if (notificationId == 'resultNotification') {
//     if (buttonIndex == 0) { // кликнули на "Посмотреть на странице"
//
//       // УМЕЕМ ПОКАЗЫВАТЬ ТОЛЬКО ОДНУ СТРАНИЦУ НА УВЕДОМЛЕНИЕ
//       chrome.tabs.create({url: 'http://google.com'}, function(tab) {
//         var data = notificationsData.pop();
//         var url = catalog.clinics[data.requestData.clinicId].url;
//         var specId = data.requestData.specId;
//
//         // создаём форму в открытой табе, с методом POST и отправляем её
//         chrome.tabs.executeScript(tab.id, {
//           'code': CodeSnippets.createAndSendFormForDoctorsListBySpeciality(data.requestData.clinicId, data.requestData.specId)
//         });
//       });
//     }
//     if (buttonIndex == 1) { // кликнули "Не нужен"
//       chrome.notifications.clear(notificationId);
//     }
//   // }
// });

// Ждём уведомления обо всяких событиях из окна настроек
chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  console.log('ON MESSAGE', message, sender);
  console.log('NEW BG SCRIPT');
  return;
  // если пришло сообщение что нужно сдёрнуть список по специальности
  if (message.hasOwnProperty('type') && message.type === 'specList') {
    var i;
    for (i in message.spec) {
      Requests.getTicketsForSpeciality(message.clinic, message.spec[i], xhrOnReadyChangeCallback);
    }
  }

  switch (message.name) {
    case 'Follow.Spec':
      console.log('FOLLOW SPEC!!! NOT IMPLEMENTED!!!');
      console.log('LOCALSTORAGE: ', chrome.storage.local.get((items) => {console.log(items)}));
      break;
    case 'Follow.Doctor':
      console.log('FOLLOW DOCTOR!!! NOT IMPLEMENTED!!!');
      console.log('LOCALSTORAGE: ', chrome.storage.local.get((items) => {console.log(items)}));
      break;
    default:
      console.log('DEFAULT!', message);
  }
});



// Для разбора HTML, полученого по запросу
var view = chrome.extension.getViews()[0];
var loadedHtml = view.document.createElement('html');

function $(selector) {
  return loadedHtml.querySelectorAll(selector);
}

xhrOnReadyChangeCallback = function(xhr, requestData) { // (3)
  if (xhr.readyState !== 4) {
    return;
  }

  loadedHtml.innerHTML = xhr.responseText;

  // варианты на выбор передаются в <input id="listreturn">
  // var list = $('#listreturn');
  // console.log(list);

  var enabledDoctors = $('button.SM_ACTIV[onClick*=codemed] span');
  var data;

  console.log(enabledDoctors);
  if (enabledDoctors.length > 0) {

    data = {
      'type': 'basic',
      'title': requestData.clinic,
      'message': 'Есть свободные номерки: ' + requestData.spec,
      'iconUrl': 'img/128.png',
      'items': [],
      'buttons': [
        {'title': 'Посмотреть на странице'},
        {'title': 'Не нужен'}
      ]
    };

    chrome.notifications.create('resultNotification' + requestData.specId, data, function(notificationId) {
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
