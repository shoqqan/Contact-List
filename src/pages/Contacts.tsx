import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {ContactType, setEditModeAC} from "../store/reducers/appReducer";
import {CreateEditForm} from "../components/createEditForm";

export const Contacts = () => {
    const contacts = useSelector<AppStateType, ContactType[]>(state => state.app.contacts)
    const dispatch = useDispatch<any>()
    return (
        <div className={'w-full flex flex-col items-center gap-y-12 py-12'}>
            <div>Contacts</div>
            <div className={'w-[800px] flex flex-col items-center gap-y-12 py-12 cursor-pointer rounded-xl shadow-2xl'}>
                {
                    contacts.map(el =>
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

                                <div
                                    className={'w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full'}
                                    onClick={()=>{
                                        dispatch(setEditModeAC(el.id,true))
                                    }}

                                >
                                    <i className="fa-solid fa-pen"></i></div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

