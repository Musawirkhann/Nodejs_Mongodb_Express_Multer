import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/';

export const singleFileUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'singleFile', data, options);
    } catch (error) {
        throw error;
    }
}
export const getSingleFiles = async () => {
    try {
            const {data} = await axios.get(apiUrl + 'getSingleFiles');
            return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}
export const getMultipleFiles = async () => {
    try{
        const {data} = await axios.get(apiUrl + 'getMultipleFiles');
        return data;
    }catch(error){
        throw error;
    }
}