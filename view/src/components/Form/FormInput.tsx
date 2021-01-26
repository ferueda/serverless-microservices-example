import { FormLabel, Input, Flex } from '@chakra-ui/react';

interface Props {
  label: string;
  id: string;
  name?: string;
  type?: 'email' | 'password' | 'text';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInput({ label, id, name = id, type = 'text', placeholder, value, onChange }: Props) {
  return (
    <Flex alignItems="center" w="100%" justifyContent="space-between" mb={4}>
      <FormLabel htmlFor={id} width={32} m={0} p={0}>
        {label}
      </FormLabel>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Flex>
  );
}

export default FormInput;
