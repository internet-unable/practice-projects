import Container from "@/controllers/component/Elements/Container";
import HeaderTabs from "@/controllers/component/Elements/HeaderTabs";
import ChangePassForm from "@/controllers/component/Forms/ChangePassForm";
import React from "react";

const ChangePass = () => {
  return (
    <div>
        <header className="bg-white px-[75px] h-[73px] items-center hidden desktop:flex">
          <Container className="w-full">
            <a href="/">
              <img
                className="max-w-[155px] desktop:max-w-[170px]"
                src="/img/logo.svg"
                alt="Logo"
              />
            </a>
          </Container>
        </header>

        <HeaderTabs
          headerImgUrl='/img/cabinet/arrow-left.svg'
        >
          <img className='max-w-[155px] desktop:hidden' src='/img/logo.svg' alt="Logo"/>
          <div className="text-[var(--color5)] fontHeaderBold hidden desktop:block">Повернутись</div>
        </HeaderTabs>

        <Container className='gap-5 mt-20 px-6 pb-20 max-w-[630px] desktop:px-0 desktop:mt-10'>
          <ChangePassForm />
        </Container>
    </div>
  )
};

export default ChangePass;