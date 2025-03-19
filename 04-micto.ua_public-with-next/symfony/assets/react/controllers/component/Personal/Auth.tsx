import React from "react";
import EditButton from "@/controllers/component/Elements/EditButton";
import {Link} from "react-router-dom";
import { useAppSelector } from '@/reduxToolkit/hooks';

const Auth = () => {
    const { email } = useAppSelector(state => state.user.userInfo.info);

    return (
        <div className='mt-6'>
            <section className='flex flex-col gap-8 bg-[var(--white)] rounded-[7px] p-4 desktop:p-6'>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <span className='text-[var(--color10)] fontMedium desktop:fontUbuntuMedium'>Ел. пошта</span>
                    <span className='fontRegular2 text-[var(--color10)] desktop:fontMediumRegular'>{email}</span>
                    <Link to='/cabinet/change-email'>
                        <EditButton className='mt-2'/>
                    </Link>
                </div>

                <div className='flex flex-col justify-start items-start gap-3'>
                    <span className='text-[var(--color10)] fontMedium desktop:fontUbuntuMedium'>Пароль</span>
                    <span className='fontRegular2 text-[var(--color10)] desktop:fontMediumRegular'>*******</span>
                    <Link to='/cabinet/change-pass'>
                        <EditButton className='mt-2'/>
                    </Link>
                </div>


            </section>
        </div>
    );
};

export default Auth;
