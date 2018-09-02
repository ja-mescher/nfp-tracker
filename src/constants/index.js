export const FlowOptions = {
  NONE: 0,
  HEAVY: 1,
  MODERATE: 2,
  LIGHT: 3,
  VERY_LIGHT: 4,
  BROWN: 5
}

export const FlowOptionsList = [
  FlowOptions.HEAVY,
  FlowOptions.MODERATE,
  FlowOptions.LIGHT,
  FlowOptions.VERY_LIGHT,
  FlowOptions.BROWN
]

export const FlowDescriptions = {
  [FlowOptions.NONE]: {
    shortDesc: '---',
    longDesc: 'None'
  },
  [FlowOptions.HEAVY]: {
    shortDesc: 'H',
    longDesc: 'Heavy'
  },
  [FlowOptions.MODERATE]: {
    shortDesc: 'M',
    longDesc: 'Moderate'
  },
  [FlowOptions.LIGHT]: {
    shortDesc: 'L',
    longDesc: 'Light'
  },
  [FlowOptions.VERY_LIGHT]: {
    shortDesc: 'VL',
    longDesc: 'Very Light'
  },
  [FlowOptions.BROWN]: {
    shortDesc: 'B',
    longDesc: 'Brown'
  }
}

export const ConsistencyOptions = {
  // N_A: 0,
  DRY: 1,
  DAMP: 2,
  WET: 3,
  SHINY: 4,
  STICKY: 5,
  TACKY: 6,
  STRETCHY: 7,
  // DAMP: 8,
  // SHINY: 9,
  // WET: 10
}

export const ConsistencyOptionsList = [
  ConsistencyOptions.DRY,
  ConsistencyOptions.DAMP,
  ConsistencyOptions.WET,
  ConsistencyOptions.SHINY,
  ConsistencyOptions.STICKY,
  ConsistencyOptions.TACKY,
  ConsistencyOptions.STRETCHY
]

export const ConsistencyDescriptions = {
  [ConsistencyOptions.DRY]: {
    shortDesc: '0',
    longDesc: 'Dry'
  },
  [ConsistencyOptions.DAMP]: {
    shortDesc: '2',
    longDesc: 'Damp'
  },
  [ConsistencyOptions.WET]: {
    shortDesc: '2W',
    longDesc: 'Wet'
  },
  [ConsistencyOptions.SHINY]: {
    shortDesc: '4',
    longDesc: 'Shiny'
  },
  [ConsistencyOptions.STICKY]: {
    shortDesc: '6',
    longDesc: 'Sticky'
  },
  [ConsistencyOptions.TACKY]: {
    shortDesc: '8',
    longDesc: 'Tacky'
  },
  [ConsistencyOptions.STRETCHY]: {
    shortDesc: '10',
    longDesc: 'Stretchy'
  },
  [ConsistencyOptions.DAMP]: {
    shortDesc: '10DL',
    longDesc: 'Damp'
  },
  [ConsistencyOptions.SHINY]: {
    shortDesc: '10SL',
    longDesc: 'Shiny'
  },
  [ConsistencyOptions.WET]: {
    shortDesc: '10WL',
    longDesc: 'Wet'
  }
}

export const ColorOptions = {
  N_A: 0,
  BROWN: 1,
  CLOUDY: 2,
  GUMMY: 3,
  CLEAR: 4,
  PASTY: 5,
  YELLOW: 6
}

export const ColorOptionsList = [
  ColorOptions.BROWN,
  ColorOptions.CLOUDY,
  ColorOptions.GUMMY,
  ColorOptions.CLEAR,
  ColorOptions.PASTY,
  ColorOptions.YELLOW
]

export const ColorDescriptions = {
  [ColorOptions.BROWN]: {
    shortDesc: 'B',
    longDesc: 'Brown'
  },
  [ColorOptions.CLOUDY]: {
    shortDesc: 'C',
    longDesc: 'Cloudy'
  },
  [ColorOptions.GUMMY]: {
    shortDesc: 'G',
    longDesc: 'Gummy'
  },
  [ColorOptions.CLEAR]: {
    shortDesc: 'K',
    longDesc: 'Clear'
  },
  [ColorOptions.PASTY]: {
    shortDesc: 'P',
    longDesc: 'Pasty'
  },
  [ColorOptions.YELLOW]: {
    shortDesc: 'Y',
    longDesc: 'Yellow'
  }
}
