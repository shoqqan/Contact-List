import './App.css'
import {Route, Routes} from "react-router-dom";
import {Contacts} from "./pages/Contacts";
import {CreateContact} from "./pages/CreateContact";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setStateAC} from "./store/reducers/appReducer";

export const App = () => {
    const dispatch = useDispatch<any>()
    useEffect(()=>{
       if  (localStorage.getItem('initState')){
           dispatch(setStateAC(JSON.parse(localStorage.getItem('initState')).contacts))
       }
    },[])
    return (
        <div className={'w-full bg-[#F9F9F9] flex justify-center items-center overflow-x-hidden font-poppins lg:bg-lime-900'}>
            <Routes>
                <Route path={'/'} element={<Contacts/>}/>
                <Route path={'/new-contact'} element={<CreateContact/>}/>
            </Routes>
        </div>
    )
}

