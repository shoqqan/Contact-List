import './App.css'
import {Route, Routes} from "react-router-dom";
import {Contacts} from "./pages/Contacts";

export const App = () => {

    return (
        <div className={'w-full bg-[#F9F9F9] flex justify-center items-center font-poppins'}>
            <Routes>
                <Route path={'/'} element={<Contacts/>}/>
                <Route path={'/new-contact'}/>
            </Routes>
        </div>
    )
}

