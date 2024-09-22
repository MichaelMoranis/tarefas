module.exports = {
  process() {
    return 'module.exports = {};'
  },
  getFileContent(filePath) {
    return filePath;
  },
}
