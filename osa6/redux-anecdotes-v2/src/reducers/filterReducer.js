const filterReducer = (store = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filterString
    default:
      return store
  }
}


export const filterSetter = (filterStr) => {
  return {
    type: 'SET_FILTER',
    filterString: filterStr
  }
}

export default filterReducer
