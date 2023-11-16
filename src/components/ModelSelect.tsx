import Select from "react-select";
import { SelectCategoriserTypeOption } from "../types/types";

const options: SelectCategoriserTypeOption[] = [
  { value: "keyword", label: "🔑 Keyword Categorisation" },
  { value: "ai", label: "🤖 AI Categorising" },
];

interface ModelSelectProps {
  onChange: (selectedOption: SelectCategoriserTypeOption | null) => void;
}

function ModelSelect({ onChange }: ModelSelectProps) {
  return (
    <div className="w-full max-w-3xl text-gray-600">
      <Select
        instanceId="model-select"
        options={options}
        isSearchable={false}
        onChange={(selectedOption) =>
          onChange(selectedOption as SelectCategoriserTypeOption)
        }
        placeholder="Choose categorising model type"
        defaultValue={options[0]}
      />
    </div>
  );
}

export default ModelSelect;
