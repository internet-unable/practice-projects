import FormDepartmentEdit from "@/controllers/component/Forms/InstitutionEdit/FormDepartmentEdit";
import React from "react";

type Props = {
 isEdit: boolean;
 setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepartmentVariant: React.FC<Props> = ({ isEdit, setIsEdit }) => {
  return (
    <>
      {isEdit ? (<FormDepartmentEdit />) : (<></>)}
    </>
  );
};

export default DepartmentVariant;