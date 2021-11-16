const checkId = (res, receivedId, message = 'ID is required') => {
  const id = parseInt(receivedId)
  if (!id) {
    res.status(400).json({ message })
    return false
  }
  return true
}

const checkRequiredFields = (res, fields) => {
  const missingFields = []
  fields.forEach((field, value) => {
    if (!value.trim()) missingFields.push(field)
  })
  if (!!missingFields.length) {
    res.status(400).json({ message: `Missing required field(s): ${missingFields}` })
    return false
  }
  return true
}

module.exports = {
  checkId,
  checkRequiredFields
}
