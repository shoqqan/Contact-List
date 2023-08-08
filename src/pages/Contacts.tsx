import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {ContactType, deleteContactAC, setEditModeAC} from "../store/reducers/appReducer";
import {CreateEditForm} from "../components/CreateEditForm";
import {useNavigate} from "react-router-dom";

export const Contacts = () => {
    const contacts = useSelector<AppStateType, ContactType[]>(state => state.app.contacts)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    return (
        <div className={'w-full h-screen flex flex-col items-center bg-[#F9F9F9] gap-y-12 py-12'}>
            <div>Contacts</div>
            <div
                className={'w-[800px] flex flex-col items-center bg-lime-900 gap-y-12 py-12 cursor-pointer rounded-xl shadow-2xl'}>
                <div className={'w-full flex justify-end px-12'}>
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

