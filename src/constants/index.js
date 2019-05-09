export const flowOptions = {
  NONE: 0,
  HEAVY: 4,
  MODERATE: 3,
  LIGHT: 2,
  VERY_LIGHT: 1,
  BROWN: 5
}

export const flowOptionsList = [
  flowOptions.HEAVY,
  flowOptions.MODERATE,
  flowOptions.LIGHT,
  flowOptions.VERY_LIGHT,
  flowOptions.BROWN
]

export const flowDescriptions = {
  [flowOptions.HEAVY]: {
    shortDesc: 'H',
    longDesc: 'Heavy'
  },
  [flowOptions.MODERATE]: {
    shortDesc: 'M',
    longDesc: 'Moderate'
  },
  [flowOptions.LIGHT]: {
    shortDesc: 'L',
    longDesc: 'Light'
  },
  [flowOptions.VERY_LIGHT]: {
    shortDesc: 'VL',
    longDesc: 'Very Light'
  },
  [flowOptions.BROWN]: {
    shortDesc: 'B',
    longDesc: 'Brown'
  }
}

export const otherOptions = {
  NONE: 0,
  LUBRICATIVE: 1,
  INTERCOURSE: 2,
  PEAK: 3,
}

export const otherOptionsList = [
  otherOptions.LUBRICATIVE,
  otherOptions.INTERCOURSE,
  otherOptions.PEAK,
  otherOptions.NEW_CYCLE,
]

export const otherDescriptions = {
  [otherOptions.LUBRICATIVE]: {
    shortDesc: 'L',
    longDesc: 'Lubricative'
  },
  [otherOptions.INTERCOURSE]: {
    shortDesc: 'I',
    longDesc: 'Intercourse'
  },
  [otherOptions.PEAK]: {
    shortDesc: 'P',
    longDesc: 'Peak'
  },
  [otherOptions.NEW_CYCLE]: {
    shortDesc: 'N',
    longDesc: 'New Cycle'
  },
}

export const consistencyOptions = {
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

export const consistencyOptionsList = [
  consistencyOptions.DRY,
  consistencyOptions.STICKY,
  consistencyOptions.TACKY,
  consistencyOptions.STRETCHY,
  consistencyOptions.DAMP,
  consistencyOptions.WET,
  consistencyOptions.SHINY,
]

export const consistencyDescriptions = {
  [consistencyOptions.DRY]: {
    shortDesc: '0',
    longDesc: 'Dry'
  },
  [consistencyOptions.DAMP]: {
    shortDesc: '2',
    longDesc: 'Damp'
  },
  [consistencyOptions.WET]: {
    shortDesc: '2W',
    longDesc: 'Wet'
  },
  [consistencyOptions.SHINY]: {
    shortDesc: '4',
    longDesc: 'Shiny'
  },
  [consistencyOptions.STICKY]: {
    shortDesc: '6',
    longDesc: 'Sticky'
  },
  [consistencyOptions.TACKY]: {
    shortDesc: '8',
    longDesc: 'Tacky'
  },
  [consistencyOptions.STRETCHY]: {
    shortDesc: '10',
    longDesc: 'Stretchy'
  },
  [consistencyOptions.DAMP]: {
    shortDesc: '10DL',
    longDesc: 'Damp'
  },
  [consistencyOptions.SHINY]: {
    shortDesc: '10SL',
    longDesc: 'Shiny'
  },
  [consistencyOptions.WET]: {
    shortDesc: '10WL',
    longDesc: 'Wet'
  }
}

export const colorOptions = {
  N_A: 0,
  BROWN: 1,
  CLOUDY: 2,
  GUMMY: 3,
  CLEAR: 4,
  PASTY: 5,
  YELLOW: 6
}

export const colorOptionsList = [
  colorOptions.BROWN,
  colorOptions.CLOUDY,
  colorOptions.GUMMY,
  colorOptions.CLEAR,
  colorOptions.PASTY,
  colorOptions.YELLOW
]

export const colorDescriptions = {
  [colorOptions.BROWN]: {
    shortDesc: 'B',
    longDesc: 'Brown'
  },
  [colorOptions.CLOUDY]: {
    shortDesc: 'C',
    longDesc: 'Cloudy'
  },
  [colorOptions.GUMMY]: {
    shortDesc: 'G',
    longDesc: 'Gummy'
  },
  [colorOptions.CLEAR]: {
    shortDesc: 'K',
    longDesc: 'Clear'
  },
  [colorOptions.PASTY]: {
    shortDesc: 'P',
    longDesc: 'Pasty'
  },
  [colorOptions.YELLOW]: {
    shortDesc: 'Y',
    longDesc: 'Yellow'
  }
}

export const countOptionsList = [
  1,2,3,4
]

export const countDescriptions = {
  1: {
    shortDesc: 'x1',
    longDesc: 'One Time'
  },
  2: {
    shortDesc: 'x2',
    longDesc: 'Two Times'
  },
  3: {
    shortDesc: 'x3',
    longDesc: 'Three Times'
  },
  4: {
    shortDesc: 'AD',
    longDesc: 'All Day'
  },
}

export const optionTypes = {
  SELECT_ONE: 1,
  SELECT_MANY: 2,
  BOOLEAN: 3,
  TEXT: 4,
  STICKER_SELECT: 5,
}

export const observationTypeOptions = {
  'consistency': {
    label: 'Consistency',
    optionsType: optionTypes.SELECT_ONE,
    optionsList: consistencyOptionsList,
    optionsDesc: consistencyDescriptions
  },
  'color': {
    label: 'Color',
    optionsType: optionTypes.SELECT_MANY,
    optionsList: colorOptionsList,
    optionsDesc: colorDescriptions
  },
  'count': {
    label: 'Occurrence',
    optionsType: optionTypes.SELECT_ONE,
    optionsList: countOptionsList,
    optionsDesc: countDescriptions
  },
  'flow': {
    label: 'Flow',
    optionsType: optionTypes.SELECT_ONE,
    optionsList: flowOptionsList,
    optionsDesc: flowDescriptions
  },
  'other': {
    label: 'Other',
    optionsType: optionTypes.SELECT_MANY,
    optionsList: otherOptionsList,
    optionsDesc: otherDescriptions
  },
  'notes': {
    label: 'Notes',
    optionsType: optionTypes.TEXT,
  }
}

export const observationTypesList = [
  'consistency',
  'color',
  'count',
  'flow',
  'other',
  'notes'
]
