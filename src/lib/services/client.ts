import { message } from "antd";
import axios, { AxiosResponse } from "axios";

export async function client(
  endpoint: string | string[],
  { data, apiURL, method = "GET", params, headers: customHeaders, ...customConfig }: any = {}
) {
  const config = {
    url: `${apiURL}${endpoint}`,
    method: method || (data ? "POST" : "GET"),
    headers: {
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  if (params) {
    config.params = params;
    config.method = "GET";
  }

  if (data) {
    config.data = data;
  }

  return axios(config)
    .then(async (response: AxiosResponse<any, any>) => {
      // console.log(
      //   `@success res, url = ${response.config.url} , METHOD = ${response.config.method}`,
      //   response
      // );

      return response;
    })
    .catch((e: any) => {
      // console.log(`@Error res, url = ${e.config.url} , METHOD = ${e.config.method}`, e);
      // message.error(e?.message);
    });
}
