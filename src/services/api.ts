import axios, { AxiosError, AxiosResponse } from "axios";

type apiProps = {
  method: 'GET',
  url: string;
  params?: object;
}

export default async function api<T>({
  method,
  url,
  params
}: apiProps) {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: 'https://rickandmortyapi.com/api' + url,
      params
    });

    return response;
  } catch(err: unknown) {
    if(err instanceof AxiosError) {
      return err;
    }

    return err;
  }
}