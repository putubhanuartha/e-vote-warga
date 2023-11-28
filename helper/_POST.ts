import { axiosWargaDefault, axiosWargaSecure } from "@/config/axios.config"

export const registerWarga = async ({ nik, token, password }: { nik: string, token: string, password: string }) => {
    const response = await axiosWargaDefault.post('/warga/signup', { nik, token, password })
    return response
}

export const loginWarga = async ({ nik, password }: { nik: string, password: string }) => {
    const response = await axiosWargaSecure.post('/warga/login', { nik, password })
    return response
}

export const postAnswerForm = async (payload: { data: string, idForm: string }) => {
    const response = await axiosWargaSecure.post(`/warga/answer-form?id=${payload.idForm}`, { data: payload.data })
    return response.data
}