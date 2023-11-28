import { axiosWargaSecure } from "@/config/axios.config"

export const authorizeUser = async () => {
    const data = await axiosWargaSecure.get('/check-auth')
    return data
}

export const getAllForms = async () => {
    const data = await axiosWargaSecure.get('/warga/get-forms')
    return data
}

export const getForm = async (formId: string) => {
    const data = await axiosWargaSecure.get(`/warga/get-form?id=${formId}`)
    return data
}