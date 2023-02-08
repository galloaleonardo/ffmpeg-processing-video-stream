
import { createServer } from "node:http";
import * as url from "node:url";
import * as StreamVideoService from "./service/StreamVideoService.js";
import * as RequestProperties from "./utils/RequestProperties.js";

createServer(async (request, response) => {
  RequestProperties.setAllowOrigin(request, response);

  const queries = url.parse(request.url, true)?.query;
  const chosenFilter = queries?.filter;

  StreamVideoService.start(chosenFilter, request, response);

}).listen(3000, () => console.log('server is running at 3000'));

