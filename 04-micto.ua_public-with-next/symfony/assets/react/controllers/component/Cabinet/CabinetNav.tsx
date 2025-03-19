import * as React from "react";
import { Link } from "react-router-dom";

import "../../../../styles/components/cabinetNav.scss";
import { InstitutionUnit, ResponseError } from "../../../Types/cabinetTypes";

type Props = {
  institutionUnitState?: {
    loading: boolean;
    unit: InstitutionUnit;
    errors?: ResponseError[];
  };
};

function CabinetNav({ institutionUnitState }: Props) {
  // TODO: add storage -> check user roles in middleware?
  const userRole = "MANAGER";

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="menu">
      <nav className="cabinet-nav">
        <ul className="menu-list">
          <li className="item">
            <Link to={"personal"}>Профіль</Link>
          </li>
          <li className="item">
            <Link to={"doctors"}>Лікарі</Link>
          </li>
          <li className="item">
            <Link to={"settings"}>Налаштування</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CabinetNav;
