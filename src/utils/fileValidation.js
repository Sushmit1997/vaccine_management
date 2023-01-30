export function checkIfFilesAreTooBig(files) {
    let valid = true
    if (files) {
      files.map(file => {
        const size = file.size / 1024 / 1024
        if (size > 10) {
          valid = false
        }
      })
    }
    return valid
  }
  
  export function checkIfFilesAreCorrectType(files){
    let valid = true
    if (files) {
      files.map(file => {
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
          valid = false
        }
      })
    }
    return valid
  }