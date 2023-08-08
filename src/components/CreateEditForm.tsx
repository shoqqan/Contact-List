import React, {useCallback, useState} from 'react';
import {useFormik} from "formik";
import {Input} from "./Input";
import {ContactType, createContactAC, editContactAC} from "../store/reducers/appReducer";
import {useDispatch} from "react-redux";
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";

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

const sexDefining = (sex: 'male' | 'female') => (
    sex === 'female'
)
type initStateType = {
    name: string;
    phoneNumber: string;
    mail: string;
    sex: boolean;
}
type CreateEditForm = {
    contact?: ContactType
}

export const CreateEditForm: React.FC<CreateEditForm> = ({contact}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [sex, setSex] = useState<boolean>(contact ? sexDefining(contact.sex) : false)
    const {values, handleSubmit, handleChange, touched, errors, setTouched} = useFormik({
        initialValues: {
            name: contact ? contact.name : '',
            phoneNumber: contact ? contact.phoneNumber : '+7',
            mail: contact ? contact.mail : '',
            sex: contact ? sexDefining(contact.sex) : true,
        },
        validate,
        onSubmit: values => {
            if (contact) {
                dispatch(editContactAC({
                    id: contact.id,
                    phoneNumber: values.phoneNumber,
                    name: values.name,
                    mail: values.mail,
                    sex: values.sex ? 'male' : 'female',
                    isEditing: false
                }))
            } else {
                dispatch(createContactAC({
                    id: v1(),
                    phoneNumber: values.phoneNumber,
                    name: values.name,
                    mail: values.mail,
                    sex: values.sex ? 'male' : 'female',
                    isEditing: false
                }))
                navigate('/')
            }
        },
    });

    const onPhoneNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = numbersRegex(e.currentTarget.value);
        handleChange(e);
    }, []);

    const onSexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSex(e.currentTarget.checked)
        e.currentTarget.checked = sex
        handleChange(e)
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
            <div className={'flex flex-col items-center justify-center gap-y-5'}>
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
                <div className={'flex gap-x-2 mb-12'}>
                    <div>Male</div>
                    <input
                        className="h-0 w-0 invisible peer"
                        id={'1'}
                        type="checkbox"
                        checked={sex}
                        onChange={onSexChange}
                    />
                    <label
                        style={{WebkitTapHighlightColor: "transparent"}}
                        className={'peer-checked:bg-pink-500 peer-checked:[&>span]:left-[calc(100%_-_2px)] peer-checked:[&>span]:-translate-x-full peer-checked:[&:active>span]:w-[30px] peer-disabled:opacity-50 peer-disabled:[&:active>span]:w-[55px] flex items-center justify-between bg-indigo-600 cursor-pointer w-[50px] h-[30px] relative transition-[background-color] duration-[0.2s] rounded-full'}
                        htmlFor={'1'}
                    >
                        <span
                            className="content-[''] absolute bg-white w-[25px] h-[25px] transition-[0.2s] shadow-[0_0_2px_0_rgba(10,10,10,0.29)] rounded-[45px] left-0.5 top-0.5"/>
                    </label>
                    <div>Female</div>
                </div>

            </div>
            <button
                className='w-[80px] h-[40px] bg-white rounded-3xl hover:scale-110 ease-in-out duration-300'
                onClick={() => {
                    setTouchedAll()
                }}
                type="submit">
                {contact ? 'Save' : 'Create'}
            </button>
        </form>
    );
};