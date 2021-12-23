export const required = v => !!v || '入力して下さい'

export const shorter = (length) => {
  return (v) => {
    return (v.length <= length) || `${length}文字以内で入力して下さい`
  }
}
