import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {ContactType, deleteContactAC, FilterType, setEditModeAC, setFilterAC} from "../store/reducers/appReducer";
import {CreateEditForm} from "../components/CreateEditForm";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";


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
    return (
        <div
            className={'w-full h-screen flex flex-col items-center bg-[#F9F9F9] gap-y-12 py-12 md:bg-lime-900 lg:py-0'}>
            <div className={'text-2xl font-bold lg:hidden'}>Contacts</div>
            <div
                className={'w-3/4 flex flex-col items-center bg-lime-900 gap-y-12 py-12 cursor-pointer rounded-xl shadow-2xl md:shadow-none lg:py-2'}>
                <div className={'w-full flex justify-between px-12 xl:flex-col items-center gap-y-12'}>
                    <div className={'flex gap-x-2 text-white md:flex-col xl:flex-col items-center gap-y-9'}>
                        <div className={'font-bold'}>Sort by:</div>
                        <div className={'flex gap-x-2 md:w-[350px] h-[50px] flex-wrap justify-center gap-2'}>
                            {filters.map((el) => {
                                    const divClass = `h-8 flex justify-center items-center px-3 text-black rounded-2xl hover:scale-110 ease-in-out duration-300 ${activeFilter === el.title ? `bg-white` : `bg-gray-400`}`
                                    return (<div key={filters.indexOf(el)} className={divClass}
                                                 onClick={() => {
                                                     dispatch(setFilterAC(el.title))
                                                     setActiveFilter(el.title)
                                                 }}
                                    >{el.title}</div>)
                                }
                            )}
                        </div>
                    </div>
                    <div
                        className={'w-[50px] h-[50px] flex justify-center items-center bg-white rounded-full hover:scale-110 ease-in-out duration-300 lg:w-[200px]'}
                        onClick={() => {
                            navigate('/new-contact')
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>
                {
                    contacts.map(el =>
                        el.isEditing ?
                            <div
                                className={'w-2/4 flex justify-center gap-y-9 px-9 py-9 bg-slate-300 rounded-2xl shadow-2xl md:w-full'}>
                                <CreateEditForm contact={el}/>
                            </div>
                            :
                            <div
                                className={'w-2/4 flex justify-between gap-y-9 px-9 py-9 bg-slate-300 rounded-2xl shadow-2xl md:w-full'}>
                                <div className={'flex flex-col gap-y-9 py-9'}>
                                    <div>{el.name}</div>
                                    <div>{el.phoneNumber}</div>
                                    <div>{el.mail}</div>
                                    <div>{el.sex}</div>
                                </div>

                                <div className={'flex flex-col justify-between'}>
                                    <div
                                        className={'w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full hover:scale-110 ease-in-out duration-300'}
                                        onClick={() => {
                                            dispatch(setEditModeAC(el.id, true))
                                        }}

                                    >
                                        <i className="fa-solid fa-pen"></i></div>

                                    <div
                                        className={'w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full hover:scale-110 ease-in-out duration-300'}
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

