import './App.css'
import {Route, Routes} from "react-router-dom";
import {Contacts} from "./pages/Contacts";
import {CreateContact} from "./pages/CreateContact";

export const App = () => {

    return (
        <div className={'w-full bg-[#F9F9F9] flex justify-center items-center overflow-x-hidden font-poppins'}>
            <Routes>
                <Route path={'/'} element={<Contacts/>}/>
                <Route path={'/new-contact'} element={<CreateContact/>}/>
            </Routes>
        </div>
    )
}

