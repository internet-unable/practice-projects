import * as React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxToolkit/hooks";
import { fetchGraphQLResponse, SelectItem } from "../../../Types/cabinetTypes";
import {
  fetchGraphQL,
  getAreaQuery,
  getCityQuery,
  getDistrictsQuery,
} from "../../../reduxToolkit/query/selectQuery";

import Select from "react-select";
import AsyncSelect from "react-select/async";
import Input from "./Input";

type Props = {
  setAreaState: Function;
  setDistrictState: Function;
  setCityState: Function;
  zipCodeValue: string;
  setZipCodeValue: Function;
};

export default function CityInputs({
  setAreaState,
  setDistrictState,
  setCityState,
  setZipCodeValue,
  zipCodeValue,
}: Props) {
  const institutionUnit = useAppSelector((state) => state.institutionUnit.unit);

  const [selectedOption1, setSelectedOption1] = useState<SelectItem>({
    value: institutionUnit.city.area.id,
    label: institutionUnit.city.area.name,
  });
  const [selectedOption2, setSelectedOption2] = useState<SelectItem>({
    value: institutionUnit.city.district.id,
    label: institutionUnit.city.district.name,
  });
  const [selectedOption3, setSelectedOption3] = useState<SelectItem>({
    value: institutionUnit.city.id,
    label: institutionUnit.city.name,
  });

  const [options1, setOptions1] = useState<SelectItem[]>([]);
  const [options2, setOptions2] = useState<SelectItem[]>([]);
  const [options3, setOptions3] = useState<fetchGraphQLResponse>({
    options: [],
    pageInfo: {
      page: 1,
      limit: 30,
      totalPages: 1,
    },
  });

  const [citySearchValue, setCitySearchValue] = useState("");

  useEffect(() => {
    const fetchOptions1 = async () => {
      const dynamicOptions1 = await fetchOptionsFromAPI1();
      setOptions1(dynamicOptions1);
    };
    fetchOptions1();

    const fetchOptions2 = async () => {
      const dynamicOptions2 = await fetchOptionsFromAPI2(selectedOption1);
      setOptions2(dynamicOptions2);
    };
    fetchOptions2();

    const fetchOptions3 = async () => {
      const response = await fetchOptionsFromAPI3(selectedOption2);
      setOptions3({ ...options3, options: response.options });
    };
    fetchOptions3();
  }, []);

  useEffect(() => {
    setAreaState(selectedOption1);
  }, [selectedOption1]);

  useEffect(() => {
    setDistrictState(selectedOption2);
  }, [selectedOption2]);

  useEffect(() => {
    setCityState(selectedOption3);
  }, [selectedOption3]);

  const fetchOptionsFromAPI1 = async (): Promise<SelectItem[]> => {
    return await fetchGraphQL(getAreaQuery(), {}).then((data) => {
      return data.areas.items.map((el) => {
        return { value: el.id, label: el.name };
      });
    });
  };

  const fetchOptionsFromAPI2 = async (
    selectedOption1: SelectItem,
  ): Promise<SelectItem[]> => {
    return await fetchGraphQL(getDistrictsQuery(selectedOption1.value)).then(
      (data) => {
        return data.districts.items.map((el) => {
          return { value: el.id, label: el.name };
        });
      },
    );
  };

  const fetchOptionsFromAPI3 = async (
    selectedOption2: SelectItem,
    searchString: string = "",
    page: number = 1,
    limit: number = 30,
  ): Promise<fetchGraphQLResponse> => {
    if (options3.pageInfo.totalPages >= page - 1) {
      return await fetchGraphQL(
        getCityQuery(selectedOption2.value, searchString, page, limit),
      ).then((data) => {
        const options = data.cities.items.map((el) => {
          return { value: el.id, label: `${el.name} (${el.otg.name} отг)` };
        });

        const obj: fetchGraphQLResponse = {
          options: options,
          pageInfo: {
            ...options3.pageInfo,
            page: data.cities.pageInfo.page,
            totalPages: data.cities.pageInfo.totalPages,
          },
        };

        return obj;
      });
    } else {
      return {
        options: [],
        pageInfo: {
          ...options3.pageInfo,
        },
      };
    }
  };

  const handleSelectChange1 = async (value: SelectItem) => {
    setSelectedOption1({
      label: value.label,
      value: value.value,
    });
    setSelectedOption2(null);
    setSelectedOption3(null);
    setOptions2([]);
    setOptions3({ ...options3, options: [] });

    if (value) {
      const dynamicOptions2 = await fetchOptionsFromAPI2(value);
      setOptions2([...dynamicOptions2]);
    }
  };

  const handleSelectChange2 = async (value: SelectItem) => {
    setSelectedOption2(value);
    setSelectedOption3(null);
    setOptions3({ ...options3, options: [] });

    if (value) {
      const response = await fetchOptionsFromAPI3(value);
      setOptions3({ ...options3, options: [...response.options] });
    }
  };

  const handleSelectChange3 = (value: SelectItem) => {
    setSelectedOption3(value);
  };

  const handleOnScrollBottomCity = async (e: TouchEvent | WheelEvent) => {
    if (
      !citySearchValue &&
      options3.pageInfo.totalPages >= options3.pageInfo.page
    ) {
      const response = await fetchOptionsFromAPI3(
        selectedOption2,
        "",
        options3.pageInfo.page + 1,
      );
      setOptions3({
        ...response,
        options: [...options3.options, ...response.options],
      });
    }
  };

  const handleCityInputChange = (newValue: string) => {
    setCitySearchValue(newValue);
    return newValue;
  };

  useEffect(() => {
    setSelectedOption1({
      label: institutionUnit.city.area.name,
      value: institutionUnit.city.area.id,
    });
    setSelectedOption2({
      label: institutionUnit.city.district.name,
      value: institutionUnit.city.district.id,
    });
    setSelectedOption3({
      label: institutionUnit.city.name,
      value: institutionUnit.city.id,
    });

    const fetchOptions2 = async () => {
      const dynamicOptions2 = await fetchOptionsFromAPI2({
        label: institutionUnit.city.area.name,
        value: institutionUnit.city.area.id,
      });
      setOptions2(dynamicOptions2);
    };
    fetchOptions2();

    const fetchOptions3 = async () => {
      const response = await fetchOptionsFromAPI3({
        label: institutionUnit.city.district.name,
        value: institutionUnit.city.district.id,
      });
      setOptions3({ ...options3, options: response.options });
    };
    fetchOptions3();
  }, [institutionUnit]);

  return (
    <>
      <div className="row col-2">
        <div className={`input-wrapper`}>
          <label htmlFor="">Область</label>
          <Select
            options={options1}
            onChange={(val) => handleSelectChange1(val)}
            defaultValue={selectedOption1}
            value={selectedOption1}
            placeholder="Оберіть область"
          />
        </div>
        <div className={`input-wrapper`}>
          <label htmlFor="">Район</label>
          <Select
            options={options2}
            onChange={(val) => handleSelectChange2(val)}
            defaultValue={selectedOption2}
            value={selectedOption2}
            placeholder="Оберіть район"
          />
        </div>
      </div>
      <div className="row col-2">
        <div className={`input-wrapper`}>
          <label htmlFor="">Місто</label>
          <AsyncSelect
            options={options3.options}
            onChange={(val) => handleSelectChange3(val)}
            defaultValue={selectedOption3}
            value={selectedOption3}
            placeholder="Оберіть місто"
            onMenuScrollToBottom={(e) => handleOnScrollBottomCity(e)}
            loadOptions={async (inputValue: string) => {
              const response = await fetchOptionsFromAPI3(
                selectedOption2,
                inputValue,
              );
              return response.options;
            }}
            defaultOptions={options3.options}
            cacheOptions
            onInputChange={(newValue: string) =>
              handleCityInputChange(newValue)
            }
            inputValue={citySearchValue}
          />
        </div>
        <Input
          type={"text"}
          id={"zipCode"}
          name={"address.zipCode"}
          placeholder={"Наприклад: 4900"}
          label={"Індекс"}
          value={zipCodeValue}
          customOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setZipCodeValue(e.currentTarget.value);
          }}
        />
      </div>
    </>
  );
}
