export const barSeparator = (value: string) => {
  if (!value) return
  return value.split('|').map((v, i) => (
    <p key={i} className="m-0">{v}</p>
  ))
}

export const simplicityRoadAddressSeparator = (value: string) => {
  if (!value) return
  if (value.split('|').length >= 2) {
    return (
      value.split('|')[0]+" 외"
    )
  } else {
    return (
      value
    )
  }
}