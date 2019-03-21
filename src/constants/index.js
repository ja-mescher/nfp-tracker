export const FlowOptions = {
  NONE: 0,
  HEAVY: 4,
  MODERATE: 3,
  LIGHT: 2,
  VERY_LIGHT: 1,
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
  ConsistencyOptions.STICKY,
  ConsistencyOptions.TACKY,
  ConsistencyOptions.STRETCHY,
  ConsistencyOptions.DAMP,
  ConsistencyOptions.WET,
  ConsistencyOptions.SHINY,
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

export const CountOptionsList = [
  1,2,3,4
]

export const CountDescriptions = {
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

export const OptionTypes = {
  SELECT_ONE: 1,
  SELECT_MANY: 2,
  BOOLEAN: 3,
  TEXT: 4,
  STICKER_SELECT: 5,
}

export const observationTypeOptions = {
  'consistency': {
    label: 'Consistency',
    optionsType: OptionTypes.SELECT_ONE,
    optionsList: ConsistencyOptionsList,
    optionsDesc: ConsistencyDescriptions
  },
  'color': {
    label: 'Color',
    optionsType: OptionTypes.SELECT_MANY,
    optionsList: ColorOptionsList,
    optionsDesc: ColorDescriptions
  },
  'count': {
    label: 'Occurrence',
    optionsType: OptionTypes.SELECT_ONE,
    optionsList: CountOptionsList,
    optionsDesc: CountDescriptions
  },
  'flow': {
    label: 'Flow',
    optionsType: OptionTypes.SELECT_ONE,
    optionsList: FlowOptionsList,
    optionsDesc: FlowDescriptions
  },
  'sensation': {
    label: 'Sensation',
    optionsType: OptionTypes.BOOLEAN,
  },
  'intercourse': {
    label: 'Intercourse',
    optionsType: OptionTypes.BOOLEAN,
  },
  'peak': {
    label: 'Peak',
    optionsType: OptionTypes.BOOLEAN,
  },
  'notes': {
    label: 'Notes',
    optionsType: OptionTypes.TEXT,
  }
}

export const observationTypesList = [
  'consistency',
  'color',
  'flow',
  'count',
]

// date - calendar
// flow - select 1
// consistency - select 1
// color - select many

// sensation - boolean
// observation count - select 1
// intercourse - boolean
// peak - boolean
// notes
