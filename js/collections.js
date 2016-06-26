var clinics = {
  'spo13': { // относится к ГП 8
    'title': 'Стоматологическая поликлиника 13',
    'url': 'http://94.19.37.202:3042/cgi-bin/tcgi1.exe'
  },
  'spo31': { // относится к ГП 8
    'title': 'Стоматологическая поликлиника 31',
    'url': 'http://94.19.37.202:3054/cgi-bin/tcgi1.exe'
  },
  'dpo33': { // относится к ГП 8
    'title': 'Детская поликлиника 33',
    'url': 'http://94.19.37.202:3077/cgi-bin/tcgi1.exe'
  },
  'dpo58': { // относится к ГП 8
    'title': 'Детская поликлиника 58',
    'url': 'http://94.19.37.202:3076/cgi-bin/tcgi1.exe'
  },
  'po8': {
    'title': 'Городская поликлиника 8',
    'url': 'http://94.19.37.202:3080/cgi-bin/tcgi1.exe'
  },
  'po6': {
    'title': 'Городская поликлиника 6',
    'url': 'http://94.19.37.202:3103/cgi-bin/tcgi1.exe'
  },
  'po25': {
    'title': 'Городская поликлиника 25',
    'url': 'http://94.19.37.202:3088/cgi-bin/tcgi1.exe'
  },
  'po46': {
    'title': 'Городская поликлиника 46',
    'url': 'http://94.19.37.202:3069/cgi-bin/tcgi1.exe'
  },
  'po77': {
    'title': 'Городская поликлиника 77',
    'url': 'http://94.19.37.202:3071/cgi-bin/tcgi1.exe'
  },
  'po7': { // относится к 77 поликлинике
    'title': 'Поликлиническое отделение 7 (п77)',
    'url': 'http://94.19.37.202:3071/cgi-bin/tcgi1.exe'
  },
  'po87': {
    'title': 'Городская поликлиника 87',
    'url': 'http://94.19.37.202:3087/cgi-bin/tcgi1.exe'
  },
  'po94': {
    'title': 'Городская поликлиника 94',
    'url': 'http://p94.spb.ru/cgi-bin/tcgi1.exe'
  },
  'po100': {
    'title': 'Городская поликлиника 100',
    'url': 'http://94.19.37.202:3070/cgi-bin/tcgi1.exe'
  },
  'dpo62': {
    'title': 'Детская поликлиника 62',
    'url': 'http://94.19.37.202:3078/cgi-bin/tcgi1.exe'
  },
  'dpo73': {
    'title': 'Детская поликлиника 73',
    'url': 'http://94.19.37.202:3079/cgi-bin/tcgi73.exe'
  },
  'dpo6': { // относится к 73
    'title': 'Детская поликлиника 6',
    'url': 'http://94.19.37.202:3079/index_6.Sht'
  },
  'dpo13': { // относится к 73
    'title': 'Детская поликлиника 13',
    'url': 'http://94.19.37.202:3079/index_13.Sht'
  },
  'dpo45': {
    'title': 'Детская поликлиника 45',
    'url': 'http://94.19.37.202:3075/cgi-bin/tcgi1.exe'
  }
};

var Commands = {
  SPEC_LIST: 2
};

// var catalog = {
// 	// СПЕЦИАЛЬНОСТИ ВРАЧЕЙ
// 	"specialities": {
// 		"4": {
// 			"title": "Терапевт участковый",
// 			"code": "4"
// 		},
// 		"9": {
// 			"title": "Ревматолог",
// 			"code": "9"
// 		},
// 		"10": {
// 			"title": "Кардиолог",
// 			"code": "10"
// 		},
// 		"16": {
// 			"title": "Аллерголог/Иммунолог",
// 			"code": "16"
// 		},
// 		"23": {
// 			"title": "Хирург",
// 			"code": "23"
// 		},
// 		"27": {
// 			"title": "Ортопед",
// 			"code": "27"
// 		},
// 		"28": {
// 			"title": "Уролог",
// 			"code": "28"
// 		},
// 		"35": {
// 			"title": "Акушер-гинеколог",
// 			"code": "35"
// 		},
// 		"37": {
// 			"title": "Педиатр",
// 			"code": "37"
// 		},
// 		"38": {
// 			"title": "Педиатр участковый",
// 			"code": "38"
// 		},
// 		"370": {
// 			"title": "Педиатр",
// 			"code": "370"
// 		},
// 		"380": {
// 			"title": "Педиатр",
// 			"code": "380"
// 		},
// 		"39": {
// 			"title": "Детский хирург",
// 			"code": "39"
// 		},
// 		"41": {
// 			"title": "Офтальмолог",
// 			"code": "41"
// 		},
// 		"42": {
// 			"title": "Отоларинголог",
// 			"code": "42"
// 		},
// 		"44": {
// 			"title": "Невропатолог",
// 			"code": "44"
// 		},
// 		"50": {
// 			"title": "Дерматолог-венеролог",
// 			"code": "50"
// 		}
// 	},
//
// 	// ЛЕЧЕБНЫЕ УЧРЕЖДЕНИЯ
//   "clinics" : {
//
// 		"poly45": {
// 			"url": "http://94.19.37.202:3075/cgi-bin/tcgi1.exe",
// 			"title": "Городская детская поликлиника №45",
// 			"specialities": { // 39-ДЕТСКИЙ ХИРУРГ;37-ПЕДИАТР;38-ПЕДИАТР УЧАСТ.;380-ПЕДИАТР(ВТОРНИК И ЧЕТВЕРГ-ДЕТИ ДО ГОДА);370-ПЕДИАТР(ВТОРНИК И ЧЕТВЕРГ-ДЕТИ ДО ГОДА);16-АЛЛЕРГОЛОГ/ИММ.;50-ДЕРМАТО-ВЕНЕРОЛ;10-КАРДИОЛОГ;44-НЕВРОПАТОЛОГ;27-ОРТОПЕД;42-ОТОЛАРИНГОЛОГ;41-ОФТАЛЬМОЛОГ
// 				"10": {
// 					"title": "Кардиолог",
// 					"code": "10"
// 				},
// 				"16": {
// 					"title": "Аллерголог/Иммунолог",
// 					"code": "16"
// 				},
// 				"27": {
// 					"title": "Ортопед",
// 					"code": "27"
// 				},
// 				"37": {
// 					"title": "Педиатр",
// 					"code": "37"
// 				},
// 				"38": {
// 					"title": "Педиатр участковый",
// 					"code": "38"
// 				},
// 				"370": {
// 					"title": "Педиатр (вторник и четверг - дети до года)",
// 					"code": "370"
// 				},
// 				"380": {
// 					"title": "Педиатр (вторник и четверг - дети до года)",
// 					"code": "380"
// 				},
// 				"39": {
// 					"title": "Детский хирург",
// 					"code": "39"
// 				},
// 				"41": {
// 					"title": "Офтальмолог",
// 					"code": "41"
// 				},
// 				"42": {
// 					"title": "Отоларинголог",
// 					"code": "42"
// 				},
// 				"44": {
// 					"title": "Невропатолог",
// 					"code": "44"
// 				},
// 				"50": {
// 					"title": "Дерматолог-венеролог",
// 					"code": "50"
// 				},
// 				"850": {
// 					"title": "Травматолог",
// 					"code": "850"
// 				},
// 				"1000": {
// 					"title": "Ортопед",
// 					"code": "1000"
// 				}
// 			}
// 		},
//
//     "poly62": {
// 			"url": "http://94.19.37.202:3078/cgi-bin/tcgi1.exe",
//       "title": "Городская детская поликлиника №62",
//       "specialities": { // 37-ПЕДИАТР;38-ПЕДИАТР УЧАСТ.;50-ДЕРМАТО-ВЕНЕРОЛ;44-НЕВРОПАТОЛОГ;1000-ОРТОПЕД;42-ОТОЛАРИНГОЛОГ;41-ОФТАЛЬМОЛОГ;372-ПЕДИАТР комнаты здорового ребенка;850-ТРАВМАТОЛОГ;23-ХИРУРГ
// 				"22": {
// 					"title": "Функц. диагност.",
// 					"code": 37,
// 					"doctors": []
// 				},
// 				"23": { // 41-ОФТАЛЬМОЛОГ;27-ТРАВМАТОЛ/ОРТОП;22-ФУНКЦ.ДИАГНОСТ.;23-ХИРУРГ
// 					"title": "Хирург",
// 					"code": 23,
// 					"doctors": []
// 				},
// 				"27": {
// 					"title": "Травматолог/Ортопед",
// 					"code": 37,
// 					"doctors": []
// 				},
// 				"37": {
// 					"title": "Педиатр",
// 					"code": 37,
// 					"doctors": []
// 				},
// 				"38": {
// 					"title": "Педиатр участковый",
// 					"code": 38,
// 					"doctors": []
// 				},
// 				"41": {
// 					"title": "Офтальмолог",
// 					"code": 41,
// 					"doctors": []
// 				},
// 				"42": {
// 					"title": "Отоларинголог",
// 					"code": 42,
// 					"doctors": []
// 				},
// 				"44": {
// 					"title": "Невропатолог",
// 					"code": 44,
// 					"doctors": [
// 						{"code":"д62.18", "title": "СТЕПАНОВА МА"},
// 						{"code":"д62.92", "title": "БАРДИЕР ВА"},
// 						{"code":"д62.98", "title": "ГОРБУНОВА ВГ"}
// 					]
// 				},
// 				"50": {
// 					"title": "Дерматолог-венеролог",
// 					"code": 50,
// 					"doctors": []
// 				},
// 				"850": {
// 					"title": "Травматолог",
// 					"code": 850,
// 					"doctors": []
// 				},
// 				"1000": {
// 					"title": "Ортопед",
// 					"code": 1000,
// 					"doctors": []
// 				}
// 			}
//     },
//
// 		"poly100": {
// 			"url": "http://94.19.37.202:3070/cgi-bin/tcgi1.exe",
// 			"title": "Поликлиника 100",
// 			"specialities": { // 35-АКУШЕР-ГИНЕКОЛ.;44-НЕВРОПАТОЛОГ;42-ОТОЛАРИНГОЛОГ;41-ОФТАЛЬМОЛОГ;9-РЕВМАТОЛОГ;4-ТЕРАПЕВТ УЧАСТ.;23-ХИРУРГ;28-УРОЛОГ
// 				"4": {
// 					"title": "Терапевт участковый",
// 					"code": 4,
// 					"doctors": []
// 				},
// 				"9": {
// 					"title": "Ревматолог",
// 					"code": 9,
// 					"doctors": []
// 				},
// 				"23": {
// 					"title": "Хирург",
// 					"code": 23,
// 					"doctors": []
// 				},
// 				"28": {
// 					"title": "Уролог",
// 					"code": 28,
// 					"doctors": []
// 				},
// 				"35": {
// 					"title": "Акушер-гинеколог",
// 					"code": 35,
// 					"doctors": []
// 				},
// 				"41": {
// 					"title": "Офтальмолог",
// 					"code": 41,
// 					"doctors": []
// 				},
// 				"42": {
// 					"title": "Отоларинголог",
// 					"code": 42,
// 					"doctors": []
// 				},
// 				"44": {
// 					"title": "Невропатолог",
// 					"code": 44,
// 					"doctors": []
// 				}
// 			}
// 		}
//   }
// };
//
