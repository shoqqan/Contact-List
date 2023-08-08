import {v1} from "uuid";

export type ContactType = {
    id: string
    phoneNumber: string
    name: string
    mail: string
    sex: 'male' | 'female'
    isEditing: boolean
}
type InitStateType = {
    contacts: ContactType[]
}
type EditContactAT = {
    type: 'EDIT-CONTACT'
    contact: ContactType
}

type CreateContactAT = {
    type: 'CREATE-CONTACT'
    contact: ContactType
}

type DeleteContactAT = {
    type: 'DELETE-CONTACT'
    id: string
}

type SetEditModeAT = {
    type: 'SET-EDIT-MODE'
    id: string
    value: boolean
}
type ActionType = EditContactAT
    | SetEditModeAT
    | CreateContactAT
    | DeleteContactAT
const initState: InitStateType = {
    contacts: [
        {
            id: v1(),
            phoneNumber: "+77755998905",
            name: "Alice Johnson",
            mail: "alice@example.com",
            sex: "female",
            isEditing: false
        },
        {
            id: v1(),
            phoneNumber: "+71234567890",
            name: "Bob Smith",
            mail: "bob@example.com",
            sex: "male",
            isEditing: false
        }
    ]
}

export const editContactAC = (contact: ContactType): EditContactAT => (
    {type: 'EDIT-CONTACT', contact}
)
export const createContactAC = (contact: ContactType): CreateContactAT => (
    {type: 'CREATE-CONTACT', contact}
)

export const deleteContactAC = (id: string): DeleteContactAT => (
    {type: 'DELETE-CONTACT', id}
)
export const setEditModeAC = (id: string, value: boolean): SetEditModeAT => (
    {type: 'SET-EDIT-MODE', id, value}
)
export const appReducer = (state: InitStateType = initState, action: ActionType) => {
    switch (action.type) {
        case "EDIT-CONTACT": {
            console.log(action.contact)
            return {
                ...state,
                contacts: state.contacts.map((el) => (el.id === action.contact.id ? action.contact : {...el}))
            }
        }
        case "SET-EDIT-MODE": {
            return {
                ...state,
                contacts: state.contacts.map((el) => (el.id === action.id ? {...el, isEditing: action.value} : {...el}))
            }
        }
        case "DELETE-CONTACT":{
            return {
                ...state,
                contacts: state.contacts.filter(el=>el.id!==action.id)
            }
        }
        case "CREATE-CONTACT": {
            return {
                ...state,
                contacts: [action.contact, ...state.contacts]
            }
        }
        default: {
            return state
        }
    }
}