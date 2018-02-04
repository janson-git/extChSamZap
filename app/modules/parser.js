import * as windows1251 from 'windows-1251';

const getParser = function() {
  var self = this;

  // Для разбора HTML, полученого по запросу
  var view = chrome.extension.getViews()[0];
  var loadedHtml = view.document.createElement('html');

  var $ = function(selector) {
    if (selector.indexOf('#') !== 0) {
      return loadedHtml.querySelectorAll(selector);
    }
    return loadedHtml.querySelector(selector);
  };

  /**
   * Ищет в загруженом документе тег input id="listreturn" и вытаскивает оттуда данные
   * @returns {Array}
   */
  var parseListDataOnPage = function(type) {
    // варианты на выбор передаются в <input id="listreturn">
    var listStr = $('#listreturn').value;
    var list = listStr.split(';');
    var vals = []; // array of {specKey: specTitle} pairs
    for (var i in list) {
      if (type === 'codedate') { // даты у нас сами себе ID
        vals.push({id: list[i], title: list[i]});
      } else {
        var s = list[i].split('-');
        vals.push({id: s[0], title: s[1]});
      }
    }
    return vals;
  };

  /**
   * Ищет в загруженом документе активные (зелёные) кнопки с номерками докторов
   * @param type string Возможные значения 'codemed' (кнопки докторов), 'codespec' (кнопки специальностей)
   * @return {Object}
   */
  var parsePageForTicketCounts = function(type) {
    var onclickValue = type || 'codemed';
    var counters = {};

    var enabledDoctors = $('button.SM_ACTIV[onClick*=' + onclickValue + ']');
    var i;
    for (i in enabledDoctors) {
      var item = enabledDoctors[i];
      if (typeof item === 'object' && item.hasAttribute('onclick')) {
        var reg = new RegExp(".*" + onclickValue + "\.value='([^']*)'", 'i');
        // var reg = /.*codemed\.value='([^']*)'/i;
        var itemId = reg.exec(item.getAttribute('onclick'))[1];

        // распарсим количество номерков с кнопки
        var buttonText = item.querySelector('span').innerText;
        console.log(buttonText);

        const n = windows1251.decode('НОМЕРКОВ:');
        const regExp = new RegExp('.*' + n + '\\s?([\\d]*).*', 'i');
        var ticketsNum = regExp.exec(buttonText)[1];

        counters[itemId + ''] = parseInt(ticketsNum);
      }
    }
    return counters;
  };

  return {
    "loadedHtml": loadedHtml,
    "parseListDataOnPage": parseListDataOnPage,
    "parsePageForTicketCounts": parsePageForTicketCounts
  };

};

export default getParser;