import apiRequest, {simpleApiRequest} from "./api";

export const makeDataRequest = (callback) => {
    const csvRequest = apiRequest("/api/j/csv", "GET");
    return simpleApiRequest(csvRequest(), callback);
};