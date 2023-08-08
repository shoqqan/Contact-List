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

type SetEditModeAT = {
    type: 'SET-EDIT-MODE'
    id: string
    value: boolean
}
type ActionType = EditContactAT
    | SetEditModeAT
const initState: InitStateType = {
    contacts: [
        {
            id: 'lol',
            phoneNumber: "+77755998905",
            name: "Alice Johnson",
            mail: "alice@example.com",
            sex: "female",
            isEditing: false
        },
        {
            id: 'lol1',
            phoneNumber: "+71234567890",
            name: "Bob Smith",
            mail: "bob@example.com",
            sex: "male",
            isEditing: false
        },
        {
            id: 'lol2',
            phoneNumber: "+79806508796",
            name: "Carol Williams",
            mail: "carol@example.com",
            sex: "female",
            isEditing: false

        },
        {
            id: 'lol3',
            phoneNumber: "+77783999034",
            name: "David Brown",
            mail: "david@example.com",
            sex: "male",
            isEditing: false

        },
        {
            id: 'lol4',
            phoneNumber: "+76554335409",
            name: "Eve Davis",
            mail: "eve@example.com",
            sex: "female",
            isEditing: false
        }
    ]
}

export const editContactAC = (contact: ContactType): EditContactAT => (
    {type: 'EDIT-CONTACT', contact}
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
        default: {
            return state
        }
    }
}