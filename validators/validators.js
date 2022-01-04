export const required = (v) => {
  const message = '入力して下さい'
  if (typeof v === 'string') {
    return !!v || message
  }

  if (typeof v === 'number') {
    return (v === 0 || !!v) || message
  }

  return !!v || message
}

export const shorter = (length) => {
  return (v) => {
    return (v.length <= length) || `${length}文字以内で入力して下さい`
  }
}

export const select = (selectItems) => {
  return (v) => {
    return selectItems.some(i => i.value === v) || '不正な値です'
  }
}

export const bigger = (number) => {
  return (v) => {
    return v > number || `${number}より大きい数値を入力して下さい`
  }
}

export const decimalPoint = (number) => {
  return (v) => {
    const digits = v.toString().split('.')[1] || ''
    return digits.length <= number || `小数点${number}以下の数値を入力して下さい`
  }
}
