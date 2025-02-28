import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const pathUrl = 'url';

export const axiosApiInstance = axios.create({
  baseURL: pathUrl
});
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    // const value = await redisClient.get(rediskey)
    // const access_token = JSON.parse(localStorage.getItem("accessToken"))
    const access_token =await AsyncStorage.getItem("accessToken")
    config.headers = {
      'x-access-token': `${access_token}`,
      'Accept': 'application/json',
      ...config.headers
      // 'Content-Type': 'multipart/form-data'
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
    //   const refreshtoken = localStorage.getItem('refreshToken');
      const refreshtoken = AsyncStorage.getItem('refreshToken');
      const response = await axios.post(`${pathUrl}/api/auth/refreshtoken`, {
        refreshToken: refreshtoken
      });
      const { accessToken,refreshToken } = response.data;
      const accessTokenJson = JSON.stringify(accessToken);
      const refreshTokenJson = JSON.stringify(refreshToken);
      await AsyncStorage.setItem('accessToken', accessTokenJson);
      await AsyncStorage.setItem('refreshToken', refreshTokenJson);
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);

      // Retry the original request with the new token
      originalRequest.headers['x-access-token'] = `${accessToken}`;
      return axiosApiInstance(originalRequest);
    } catch (error) {
      // Handle refresh token error or redirect to login
      console.log('error access token', error)
    }
  }
  return Promise.reject(error);
});

// return axiosApiInstance