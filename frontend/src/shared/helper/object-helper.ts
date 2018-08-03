import { isEqualsArray } from "./array-helper"

export const isEqualsArrayObject = (source, target) => {
  const ret = Object.keys(source).map((v) => {
    if (!isEqualsArray(source[v], target[v])) return false
    return true
  })
  if (ret.includes(false)) return false
  return true
}