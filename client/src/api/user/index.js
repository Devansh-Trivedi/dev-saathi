import axios from '../axiosConfig'

export const updateProfile = async (data) =>
    await axios.post('/update-user', { ...data })

export const uploadResumeApi = async (data) =>
    await axios.post('/update-resume', data)