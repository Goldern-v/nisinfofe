const empty = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

export default {
  bind (el) {
    if (el.tagName === 'IMG') {
      el.addEventListener('error', () => {
        el.setAttribute('src', empty)
      })
    }
  }
}
