module.exports = (pageIndex, pageSize) => {
  const offset = pageIndex * pageSize
  const limit = offset + parseInt(pageSize)
  return {
    offset,
    limit,
  }
}