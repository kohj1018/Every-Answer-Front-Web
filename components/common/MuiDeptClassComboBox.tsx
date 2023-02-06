import { styled } from '@mui/system'
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled'
import { DEPT_CLASS_LIST, DeptClassMinimalType } from '../../utils/constants/serviceConstants'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { useEffect } from 'react'
import { DeptClassType } from '../../utils/types/responseTypes'

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 100%;
  background-color: #F9FAFB;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.375rem;

  &:hover {
    border-color: #1C65D1;
  }

  &.focused {
    border-color: #1C65D1;
  }

  & input {
    background-color: #F9FAFB;
    color: #111827;
    box-sizing: border-box;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
  
  @media (min-width: 1024px) {
    padding: 1.125rem 2rem;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

interface Props {
  deptClassList: DeptClassType[]
  setSelectedDept: (selectedDeptClass: DeptClassType) => void
}

export default function MuiDeptClassComboBox({ deptClassList, setSelectedDept }: Props) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: deptClassList,
    getOptionLabel: (option) => option.name,
  });

  useEffect(() => {
    if (value) {
      setSelectedDept(value)
    }
  }, [value])

  return (
    <div>
      <div {...getRootProps()}>
        <InputWrapper>
          <input
            placeholder='전공 선택하기'
            className='text-base font-medium text-gray-600 placeholder:text-gray-300 lg:text-lg'
            required
            {...getInputProps()}
          />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as DeptClassType[]).map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>{option.name === "기타 전공" ? "기타 전공 (추후 추가 예정)" : option.name}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}