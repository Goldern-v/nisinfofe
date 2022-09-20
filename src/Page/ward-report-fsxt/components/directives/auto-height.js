function autoHeight (el, minHeight) {
  el.style.height = 'auto'

  const height = el.scrollHeight > minHeight ? el.scrollHeight : minHeight
  el.style.height = height + 'px'
}

export default {
  inserted (el, binding) {
    const minHeight = binding.value || 15

    setTimeout(() => {
      autoHeight(el, minHeight)
    }, 0);

    el.addEventListener('input', () => {
      autoHeight(el, minHeight)
    })
  },
  update (el, binding) {
    const minHeight = binding.value || 15

    autoHeight(el, minHeight)
  }
}
