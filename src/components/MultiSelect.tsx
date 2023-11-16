import chroma from "chroma-js";
import Select, { MultiValue, StylesConfig } from "react-select";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    if (typeof data.color !== "string" || !data.color.length) {
      // console.warn("Invalid color data detected, add to styles:", data.color);
      return styles; // or provide a default styling
    }

    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
  menu: (styles) => ({
    ...styles,
    marginTop: 0,
  }),
};

export default function MultiSelect({
  options,
  values,
  onChangeHandler,
}: {
  options: ColourOption[];
  values: MultiValue<ColourOption>;
  onChangeHandler: (value: MultiValue<ColourOption>) => void;
}) {
  return (
    <Select
      // menuPosition="fixed"
      value={values}
      closeMenuOnSelect
      isMulti
      options={options}
      styles={colourStyles}
      onChange={onChangeHandler}
    />
  );
}
