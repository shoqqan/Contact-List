import React from 'react';
import {CreateEditForm} from "../components/CreateEditForm";
import {useNavigate} from "react-router-dom";

export const CreateContact = () => {
    const navigate = useNavigate()
    return (
        <div className={'w-full h-screen flex flex-col items-center py-12 lg:py-0'}>
            <div
                className={'w-[800px] bg-zinc-700 flex flex-col items-center gap-y-12 py-12 cursor-pointer rounded-xl shadow-2xl lg:w-full lg:rounded-none lg:h-screen lg:py-0'}>
                <div className={'w-full px-12 lg: mt-5'}>
                    <div
                        className={'w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full hover:scale-110 ease-in-out duration-300 lg:w-[50px] lg:h-[50px]'}
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                </div>
                <div className={'text-white'}>Create Contact</div>
                <CreateEditForm/>
            </div>
        </div>
    );
};

