import axios from '../axiosConfig'

export const updateProfile = async (data) =>
    await axios.post('/update-user', { ...data })

export const uploadResumeApi = async (data) =>
    await axios.post('/update-resume', data)

export const uploadImageApi = async (data) =>
    await axios.post('/upload-image', data)

export const userProfile = async (userId) =>
    await axios.get(`/user-profile?userId=${userId}`)