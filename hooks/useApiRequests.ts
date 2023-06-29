import axios, { AxiosResponse } from "axios";
const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface IGenericRequest {
  method: string;
  path: string;
  body?: unknown;
  token: string;
  additionalHeaders?: { [key: string]: string };
}

const genericRequest = async ({
  method,
  path,
  body = null,
  token,
  additionalHeaders = {},
}: IGenericRequest): Promise<AxiosResponse> => {
  const headers = {
    Authorization: token,
    ...additionalHeaders,
  };
  const params = {
    method,
    url: `${API_URL}/${path}`,
    headers,
  };
  if (body) {
    Object.assign(params, {
      data: body,
    });
  }
  return await axios(params);
};

const getItemById = async (category: string, id: string): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/${category}/${id}`);
};

const getItemsByCategory = async (category: string): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/${category}`);
};

const getS3Urls = async (token: string): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/images`, { headers: { Authorization: token } });
};

const useApiRequests = () => ({
  genericRequest,
  getItemById,
  getItemsByCategory,
  getS3Urls,
});

export default useApiRequests;
