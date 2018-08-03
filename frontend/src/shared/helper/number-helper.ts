const separate = (value: number) => {
  let v = value.toFixed(0)
  if (v.length > 2) {
    v = value.toFixed(0)
  } else {
    v = value.toFixed(1)
  }
  if (value.toFixed(1).length >= 6) {
    return v.replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString()
  } else {
    return v.toString()
  }
}

const separateDeleteDecimal = (value: number) => {
  let v = value.toFixed(0)
  return v.replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString()
}

export const numberToInfoArea = (value: number) => {
  return parseFloat(value.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const numberToRefinedArea = (value: number) => {
  if (value.toFixed(0).length >= 4) {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return value.toFixed(0)
  }
}

export const numberToCurrency = (value: number) => {
  let ret = value
  if (ret < 10000) {
    return separate(value)
  } else if (ret < 100000000 && ret >= 10000) {
    return separate(value * 0.0001)
  } else if (ret < 1000000000000 && ret >= 100000000) {
    return separate(value * 0.00000001)
  } else if (ret >= 1000000000000) {
    return separate(value * 0.000000000001)
  } else {
    return null
  }
}

export const numberToCurrencyDeleteDecimal = (value: number) => {
  let ret = value
  if (ret < 10000) {
    return separateDeleteDecimal(value)
  } else if (ret < 100000000 && ret >= 10000) {
    return separateDeleteDecimal(value * 0.0001)
  } else if (ret < 1000000000000 && ret >= 100000000) {
    return separateDeleteDecimal(value * 0.00000001)
  } else if (ret >= 1000000000000) {
    return separateDeleteDecimal(value * 0.000000000001)
  } else {
    return null
  }
}

export const getCurrencyUnit = (value: number) => {
  let ret = value
  if (ret < 10000) {
    return '원'
  } else if (ret < 100000000 && ret >= 10000) {
    return '만원'
  } else if (ret < 1000000000000 && ret >= 100000000) {
    return '억원'
  } else if (ret >= 1000000000000) {
    return '조원'
  } else {
    return null
  }
}

export const getCurrencyWithoutWonUnit = (value: number) => {
  let ret = value
  if (ret < 10000) {
    return ''
  } else if (ret < 100000000 && ret >= 10000) {
    return '만'
  } else if (ret < 1000000000000 && ret >= 100000000) {
    return '억'
  } else if (ret >= 1000000000000) {
    return '조'
  } else {
    return null
  }
}

export const numberToMagnification = (value: number) => {
  let v = parseFloat(value.toFixed(2).toString())
  return v
} 