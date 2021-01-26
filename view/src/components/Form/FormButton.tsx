import { Button } from '@chakra-ui/react';

interface Props {
  type?: 'button' | 'submit';
  children: string;
  isLoading?: boolean;
}

function FormButton({ type = 'button', children, isLoading = false }: Props) {
  return (
    <Button type={type} isLoading={isLoading} shadow="md" colorScheme="blue" d="flex" minW={24}>
      {children}
    </Button>
  );
}

export default FormButton;
