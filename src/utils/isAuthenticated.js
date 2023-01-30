const isAuthenticated = () => {
    let isAuthenticated = false

    const token = localStorage.getItem('token')
    if (token) {
      isAuthenticated = true
    }
    return isAuthenticated
  }

module.exports = isAuthenticated