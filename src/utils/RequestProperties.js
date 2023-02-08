export const setAllowOrigin = (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Controller-Allow-Methods': '*'
    });

    response.end();

    return;
  }
}