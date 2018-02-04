// Обертка над chrome.storage.local - чтобы туда сохранять и оттуда забирать настройки поиска номерков
// clinicId - ID клиники
// specId - ID специальности врача
// doctorId - ID врача
// followSettings - настройка отслеживания. За чем следим: специальность, конкретный врач?
const SettingsNames = {
  clinicId: 'clinicId',
  specId: 'specId',
  doctorId: 'doctorId',
  followSettings: 'followSettings',
};

const SettingsStorage = {
  getClinicId: (id, callback) => {
    this.get(SettingsNames.clinicId, callback);
  },
  getSpecialityId: (id, callback) => {
    this.get(SettingsNames.specId, callback);
  },
  getDoctorId: (id, callback) => {
    this.get(SettingsNames.doctorId, callback);
  },
  getFollowSettings: (type, callback) => {
    this.get(SettingsNames.followSettings, callback);
  },
    saveClinicId: (id) => {
    this.save(SettingsNames.clinicId, id);
  },
  saveSpecialityId: (id) => {
    this.save(SettingsNames.specId, id);
  },
  saveDoctorId: (id) => {
    this.save(SettingsNames.doctorId, id);
  },
  saveFollowSettings: (settings) => {
    this.save(SettingsNames.followSettings, settings);
  },
  get: (name, callback) => {
    chrome.storage.local.get(name, callback);
  },
  save: (name, value) => {
    chrome.storage.local.set({[name]: value});
  },
};

export default SettingsStorage;
