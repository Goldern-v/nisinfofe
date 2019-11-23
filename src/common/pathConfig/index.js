

let { hostname, protocol } = window.location
let port = '8088'

export let formUrl = '/crNursing/formUrl'
// export let devFormUrl = 'http://localhost:8088'
export let devFormUrl = `${protocol}//${hostname}:${port}${formUrl}`
// export let devFormUrl = "http://" + window.location.hostname + ":8088" + formUrl;
export let devFormUrl_p80 = `${protocol}//${hostname}:80${formUrl}`
// export let devFormUrl_p80 = "http://" + window.location.hostname + ":80" + formUrl;
