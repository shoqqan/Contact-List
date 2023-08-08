import {v1} from "uuid";

export type FilterType = 'All' | 'Name' | 'Mail' | 'Number' | 'Only males' | 'Only females'
export type ContactType = {
    id: string
    phoneNumber: string
    name: string
    mail: string
    sex: 'male' | 'female'
    isEditing: boolean
}
export type InitStateType = {
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

type SetStateAT = {
    type: 'SET-STATE'
    contacts: ContactType[]
}

type SetFilterAT = {
    type: 'SET-FILTER'
    filter: FilterType
}
type ActionType = EditContactAT
    | SetEditModeAT
    | CreateContactAT
    | DeleteContactAT
    | SetFilterAT
    | SetStateAT

const initState: InitStateType = {
    contacts: [
        {
            id: v1(),
            phoneNumber: "+71234567890",
            name: "Victoria Li",
            mail: "li.victoria@example.com",
            sex: "female",
            isEditing: false
        },
        {
            id: v1(),
            phoneNumber: "+77755998000",
            name: "Shokan Tatayev",
            mail: "tatayev@example.com",
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

export const setFilterAC = (filter: FilterType): SetFilterAT => (
    {type: 'SET-FILTER', filter}
)
export const setEditModeAC = (id: string, value: boolean): SetEditModeAT => (
    {type: 'SET-EDIT-MODE', id, value}
)
export const setStateAC = (contacts: ContactType[]): SetStateAT => (
    {type: 'SET-STATE', contacts}
)
export const appReducer = (state: InitStateType = initState, action: ActionType) => {
    switch (action.type) {
        case "EDIT-CONTACT": {
            const newState = {
                ...state,
                contacts: state.contacts.map((el) => (el.id === action.contact.id ? action.contact : {...el}))
            }
            localStorage.setItem('initState', JSON.stringify(newState))
            return newState
        }
        case "SET-EDIT-MODE": {
            const newState = {
                ...state,
                contacts: state.contacts.map((el) => (el.id === action.id ? {...el, isEditing: action.value} : {...el}))
            }
            localStorage.setItem('initState', JSON.stringify(newState))
            return newState
        }
        case "DELETE-CONTACT": {
            const newState = {...state, contacts: state.contacts.filter(el => el.id !== action.id)}
            localStorage.setItem('initState', JSON.stringify(newState))
            return newState
        }
        case "CREATE-CONTACT": {
            const newState = {...state, contacts: [action.contact, ...state.contacts]}
            localStorage.setItem('initState', JSON.stringify(newState))
            return newState
        }
        case "SET-STATE":{
            return {...state,contacts: action.contacts}
        }
        case "SET-FILTER": {
            console.log('lol')
            switch (action.filter) {
                case "Number": {
                    console.log()
                    return {
                        ...state, contacts: JSON.parse(localStorage.getItem('initState')).contacts.slice().sort((a, b) => {
                            const phoneNumberA = a.phoneNumber;
                            const phoneNumberB = b.phoneNumber;

                            if (phoneNumberA < phoneNumberB) {
                                return -1;
                            }
                            if (phoneNumberA > phoneNumberB) {
                                return 1;
                            }
                            return 0;
                        })
                    }
                }
                case "Only females": {
                    return {...state, contacts: JSON.parse(localStorage.getItem('initState')).contacts.filter(el => el.sex !== 'male')}
                }
                case "Only males": {
                    return {...state, contacts: JSON.parse(localStorage.getItem('initState')).contacts.filter(el => el.sex !== 'female')}
                }

                case "All": {
                    return {...state, contacts: JSON.parse(localStorage.getItem('initState')).contacts}
                }
                case "Name": {
                    console.log('name')
                    return {
                        ...state, contacts: JSON.parse(localStorage.getItem('initState')).contacts.slice().sort((a, b) => {
                            const nameA = a.name.toUpperCase();
                            const nameB = b.name.toUpperCase();

                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        })
                    }

                }
                case "Mail": {
                    return {
                        ...state, contacts: JSON.parse(localStorage.getItem('initState')).contacts.slice().sort((a, b) => {
                            const emailA = a.mail.toUpperCase();
                            const emailB = b.mail.toUpperCase();

                            if (emailA < emailB) {
                                return -1;
                            }
                            if (emailA > emailB) {
                                return 1;
                            }
                            return 0;
                        })
                    }
                }
                default: {
                    return state
                }
            }

        }

        default: {
            return state
        }
    }
}