

export const togglePopover = (self, e) => {
  e.preventDefault()
  e.stopPropagation()
  const type = e.target.dataset.type
  self.setState({
    isOpenPopover: {
      [type]: !self.state.isOpenPopover[type]
    }
  })
}
