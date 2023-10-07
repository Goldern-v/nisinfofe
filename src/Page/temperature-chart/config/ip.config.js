const { hostname, protocol, port } = window.location;
console.log('connection', hostname, protocol, window.location);
export const ipEnvUrl = `${protocol}//${hostname}:${port}`;
