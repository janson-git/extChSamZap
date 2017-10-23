import * as ActionTypes from '../constants/ActionTypes.js';
import Requests from '../modules/requests.js';
import getParser from '../modules/parser.js';

export function saveSelectedClinicId(id) {
    return {type: ActionTypes.SELECTED_CLINIC, id};
}

export function getSpecListByClinicId(dispatch, clinicId) {
    Requests.getSpecialityList(clinicId, (xhr) => {
        if (xhr.status !== 200) {
            console.error('Failed to load specialist list');
        } else {
            const parser = getParser();
            parser.loadedHtml.innerHTML = xhr.responseText;
            let data = parser.parseListDataOnPage();
            let counters = parser.parsePageForTicketCounts('codespec');

            data.map(function (item, index) {
                let count = 0;
                if (counters[item.id] !== undefined) {
                    count = counters[item.id];
                }
                data[index]['counter'] = count;
            });
            dispatch({type: ActionTypes.GET_SPECIALITY_LIST_DATA, data: data});
            dispatch({type: ActionTypes.SHOW_SPECIALITY_SELECT});

        }
    });
}
export function saveSelectedSpecialityId(id) {
    return {type: ActionTypes.SELECTED_SPECIALITY, id};
}

export function getDoctorListBySpecialityId(dispatch, clinicId, specId) {
  Requests.getDoctorListBySpeciality(clinicId, specId, (xhr) => {
    if (xhr.status !== 200) {
      console.error('Failed to load doctor list');
    } else {
      const parser = getParser();
      parser.loadedHtml.innerHTML = xhr.responseText;
      let data = parser.parseListDataOnPage();
      let counters = parser.parsePageForTicketCounts('codemed');

      data.map(function (item, index) {
        let count = 0;
        if (counters[item.id] !== undefined) {
          count = counters[item.id];
        }
        data[index]['counter'] = count;
      });
      dispatch({type: ActionTypes.GET_DOCTOR_LIST_DATA, data: data});
      dispatch({type: ActionTypes.SHOW_DOCTOR_SELECT});

    }
  });
}

export function saveSelectedDoctorId(id) {
  return {type: ActionTypes.SELECTED_DOCTOR, id};
}

