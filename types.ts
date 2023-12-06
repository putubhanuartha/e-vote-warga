import { InputFormType, StatusFormFilling } from "./enums"

export type FormResponse = {
    id: string,
    titleForm: string,
    contentForm: string,
    status: StatusFormFilling
}

export type DynamicFormType = {
    type: InputFormType
    title: string
    option?: string[]
    id: string
}

export type Administrative = {
    id: string
    jenisPilihan: string
    kecamatan: string
    kelurahan: string
    rt?: number
    rw: number
}
export type VotingResponse = {
    id: string
    Administrative: Administrative
    epochtimeStart: number
    epochtimeEnd: number
}

export type Warga = {
    id: string
    nama: string
}

export type Candidate = {
    id: string
    Warga: Warga
    visi: string
    misi: string
    VotingCandidateId: string
    photoUrl: string
}