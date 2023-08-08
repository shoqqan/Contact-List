import {ContactType, FilterType} from "../store/reducers/appReducer";

export const onChangeFilter = (contacts: ContactType[], setFrontContacts: (frontContacts) => void, filter: FilterType) => {
    switch (filter) {
        case "Number": {
            setFrontContacts(contacts.slice().sort((a, b) => {
                const phoneNumberA = a.phoneNumber;
                const phoneNumberB = b.phoneNumber;

                if (phoneNumberA < phoneNumberB) {
                    return -1;
                }
                if (phoneNumberA > phoneNumberB) {
                    return 1;
                }
                return 0;
            }))
            break
        }
        case "Only females": {
            setFrontContacts(contacts.filter(el => el.sex !== 'male'))
            break
        }
        case "Only males": {
            setFrontContacts(contacts.filter(el => el.sex !== 'female'))
            break
        }

        case "All": {
            setFrontContacts(contacts)
            break
        }
        case "Name": {
            setFrontContacts(contacts.slice().sort((a, b) => {
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
            )
            break;
        }
        case "Mail": {
            setFrontContacts(contacts.slice().sort((a, b) => {
                const emailA = a.mail.toUpperCase();
                const emailB = b.mail.toUpperCase();

                if (emailA < emailB) {
                    return -1;
                }
                if (emailA > emailB) {
                    return 1;
                }
                return 0;
            }))
            break
        }

    }

}