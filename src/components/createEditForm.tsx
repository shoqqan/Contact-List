import React, {useCallback, useState} from 'react';
import {useFormik} from "formik";
import {Input} from "./Input";
import {ContactType, editContactAC} from "../store/reducers/appReducer";
import {useDispatch} from "react-redux";

const validate = ({name, phoneNumber, mail}: initStateType) => {
    let errors = {};
    if (!name) {
        errors = {...errors, name: "expired"};
    }

    if (!phoneNumber) {
        errors = {...errors, phoneNumber: "expired phone number"};
    } else if (phoneNumber.length !== 12) {
        errors = {...errors, phoneNumber: "expired more"};
    }


    if (!mail) {
        errors = {...errors, mail: "expired mail"};
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
        errors = {...errors, mail: "its not a mail"};
    }
    return errors;
}

const sexDefining = (sex:'male' | 'female') =>(
    sex === 'female'
)
type initStateType = {
    name: string;
    phoneNumber: string;
    mail: string;
    sex: boolean;
}
type CreateEditForm = {
    contact: ContactType
}

export const CreateEditForm: React.FC<CreateEditForm> = ({contact}) => {
    const dispatch = useDispatch<any>()
    const [sex,setSex] = useState<boolean>(sexDefining(contact.sex))
    const {values, handleSubmit, handleChange, touched, errors, setTouched} = useFormik({
        initialValues: {
            name: contact ? contact.name : '',
            phoneNumber: contact ? contact.phoneNumber : '+7',
            mail: contact ? contact.mail : '',
            sex: contact ? sexDefining(contact.sex) : true,
        },
        validate,
        onSubmit: values => {
            dispatch(editContactAC({
                id: contact.id,
                phoneNumber: values.phoneNumber,
                name: values.name,
                mail: values.mail,
                sex: values.sex?'male':'female',
                isEditing: false
            }))
        },
    });

    const onPhoneNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = numbersRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const onSexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSex(e.currentTarget.checked)
        e.currentTarget.checked=sex
        handleChange(e)
        // if (e.currentTarget.checked) {
        //     e.currentTarget.value='female'
        // } else {
        //     e.currentTarget.value='male'
        // }
        // handleChange(e)
        // console.log(e.currentTarget.value)
    }, []);

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = latinRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = emailRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const setTouchedAll = () => {
        setTouched({
            name: true,
            phoneNumber: true,
            mail: true,
            sex: true,
        })
    };


    const numbersRegex = (v: string) => v.replace(/[^0-9+ ]/gi, "").replace(/;/i, "").substring(0, 12);
    const emailRegex = (v: string) => v.replace(/[^A-Z-0-9_.-@]/gi, "").replace(/;/i, "");
    const latinRegex = (v: string) => v.replace(/[^A-Z- ]/gi, "").replace(/;/i, "");

    return (
        <form className="card-section" onSubmit={handleSubmit}>
            <div className={'flex flex-col items-center justify-center'}>
                <Input
                    label={'Name'}
                    name={'name'}
                    placeholder="John Doe"
                    onChange={onNameChange}
                    value={values.name}
                    error={(touched.name && errors.name) ? errors.name : ''}
                />

                <Input
                    label={'Phone Number'}
                    name="phoneNumber"
                    placeholder="+7••••••••••"
                    onChange={onPhoneNumberChange}
                    value={values.phoneNumber}
                    error={(touched.phoneNumber && errors.phoneNumber) ? errors.phoneNumber : ''}
                />
                <Input
                    label={'Email'}
                    name="mail"
                    onChange={onEmailChange}
                    value={values.mail}
                    error={(touched.mail && errors.mail) ? errors.mail : ''}
                />
                <label htmlFor="Toggle3"
                       className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800">
                    <input id="Toggle3" type="checkbox" checked={sex} onChange={onSexChange}
                           className="hidden peer"/>
                    <span
                        className="px-4 py-2 rounded-l-md dark:bg-violet-400 peer-checked:dark:bg-gray-300">Male</span>
                    <span
                        className="px-4 py-2 rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-violet-400">Female</span>
                </label>
            </div>
            <button
                className='w-[80px] h-[40px] bg-white rounded-3xl'
                onClick={() => {
                    setTouchedAll()
                }}
                type="submit">
                Save
            </button>
        </form>
    );
};