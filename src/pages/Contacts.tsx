import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {ContactType, deleteContactAC, FilterType, setEditModeAC} from "../store/reducers/appReducer";
import {CreateEditForm} from "../components/CreateEditForm";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {onChangeFilter} from "../helpers/filterHandler";

export const Contacts = () => {

    const contacts = useSelector<AppStateType, ContactType[]>(state => state.app.contacts)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const filters: { title: FilterType }[] = [
        {title: 'All'},
        {title: 'Name'},
        {title: 'Mail'},
        {title: 'Number'},
        {title: 'Only males'},
        {title: 'Only females'}
    ]
    const [activeFilter, setActiveFilter] = useState<FilterType>('All')
    const [frontContacts, setFrontContacts] = useState<ContactType[]>(contacts)


    return (
        <div className={'w-full h-screen flex flex-col items-center bg-[#F9F9F9] gap-y-12 py-12'}>
            <div>Contacts</div>
            <div
                className={'w-[800px] flex flex-col items-center bg-lime-900 gap-y-12 py-12 cursor-pointer rounded-xl shadow-2xl'}>
                <div className={'w-full flex justify-between px-12'}>
                    <div className={'flex gap-x-2 text-white'}>
                        <div>Sort by:</div>
                        <div className={'flex gap-x-2'}>
                            {filters.map((el) => {
                                    const divClass = `h-[30px] flex justify-center items-center px-3 bg-white text-black rounded-2xl ${activeFilter === el.title ? `bg-white` : 'bg-gray-400'}`
                                    return (<div className={divClass}
                                                 onClick={() => {
                                                     onChangeFilter(contacts, setFrontContacts, el.title)
                                                     setActiveFilter(el.title)
                                                 }}
                                    >{el.title}</div>)
                                }
                            )}
                        </div>
                    </div>
                    <div
                        className={'w-[50px] h-[50px] flex justify-center items-center bg-white rounded-full'}
                        onClick={() => {
                            navigate('/new-contact')
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>
                {
                    frontContacts.map(el =>
                        el.isEditing ?
                            <div
                                className={'w-[500px] flex justify-center gap-y-9 px-9 py-9 bg-slate-300 rounded-2xl shadow-2xl'}>
                                <CreateEditForm contact={el}/>
                            </div>
                            :
                            <div
                                className={'w-[500px] flex justify-between gap-y-9 px-9 py-9 bg-slate-300 rounded-2xl shadow-2xl'}>
                                <div className={'flex flex-col gap-y-9 py-9'}>
                                    <div>{el.name}</div>
                                    <div>{el.phoneNumber}</div>
                                    <div>{el.mail}</div>
                                    <div>{el.sex}</div>
                                </div>

                                <div className={'flex flex-col justify-between'}>
                                    <div
                                        className={'w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full'}
                                        onClick={() => {
                                            dispatch(setEditModeAC(el.id, true))
                                        }}

                                    >
                                        <i className="fa-solid fa-pen"></i></div>

                                    <div
                                        className={'w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full'}
                                        onClick={() => {
                                            dispatch(deleteContactAC(el.id))
                                        }}

                                    >
                                        <i className="fa-solid fa-trash"></i></div>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

