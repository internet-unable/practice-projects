import * as React from "react";
import HeaderTabs from "@/controllers/component/Elements/HeaderTabs";
import Contacts from "@/controllers/component/Personal/Contacts";
import Auth from "@/controllers/component/Personal/Auth";
import CustomButton from "@/controllers/component/Elements/CustomButton";
import Container from "@/controllers/component/Elements/Container";
import { useEffect } from "react";
import { useAppDispatch } from "@/reduxToolkit/hooks";
import { fetchUserInfo } from "@/reduxToolkit/slices/userSlice";

type Props = {};

export default function Personal(props: Props) {
  // if (isLoading) {
  //   <div>Loading...</div>;
  // }
  const dispatch = useAppDispatch();

  const handleSave = () => {
    console.log("Saving form data");
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <>
      <HeaderTabs
        headerImgUrl="/img/cabinet/arrow-left.svg"
        headerTitle="Особисті дані"
      />
      <Container className="gap-5 mt-6 px-6 pb-24 max-w-[630px] desktop:px-0 desktop:pb-0 desktop:gap-6 desktop:mt-10">
        <Contacts />
        <Auth />
      </Container>

      <CustomButton
        onClick={handleSave}
        text="Зберегти"
        className=" my-8 min-w-[265px] px-10 h-[44px] bg-[var(--color5)] rounded-[var(--default-round)] font-medium text-[16px] text-white hover:opacity-90 "
        classNameContainer="mx-auto fixed bottom-0 left-0 h-[76px] bg-[var(--white)] border-t border-[var(--gray1)] desktop:relative desktop:bg-[var(--bg-color)] desktop:mt-10 desktop:mb-20"
      />
    </>
  );
}
