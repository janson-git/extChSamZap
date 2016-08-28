var Clinics = {
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

// если вдруг подключили файл напрямую
if (typeof module !== 'undefined') {
  module.exports = Clinics;
}