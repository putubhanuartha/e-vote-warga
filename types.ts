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