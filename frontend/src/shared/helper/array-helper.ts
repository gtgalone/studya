export const setSearchRecents = (v) => {
  // 최근 검색 주소(로컬 스토리지)
  let tmp = JSON.parse(localStorage.getItem('search-recents')) || []

  let pos = tmp.map((e: any) => e.address_name).indexOf(v.address_name)

  if (pos != -1) {
    tmp.splice(pos, 1)
  } else {
    if (tmp.length >= 6) tmp.pop()
  }
  tmp.unshift(v)

  localStorage.setItem('search-recents', JSON.stringify(tmp))
}

export const getSearchRecents = () => JSON.parse(localStorage.getItem('search-recents')) || []

export const countSearchRecents = () => {
  let tmp = JSON.parse(localStorage.getItem('search-recents')) || []
  return tmp.length
}

export const isEqualsArray = (source, target) => {
  // if the other array is a falsy value, return
  if (!source || !target)
    return false

  // compare lengths - can save a lot of time 
  if (source.length != target.length)
    return false

  for (var i = 0, l=source.length; i < l; i++) {
    // Check if we have nested arrays
    if (source[i] instanceof Array && target[i] instanceof Array) {
      // recurse into the nested arrays
      if (!source[i].equals(target[i]))
        return false     
    }           
    else if (source[i] != target[i]) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;  
    }           
  }       
  return true
}

export const generateIndexArray = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
