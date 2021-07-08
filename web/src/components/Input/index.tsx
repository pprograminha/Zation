import { useField } from '@unform/core';
import {
  ComponentType,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: {
    component: ComponentType<IconBaseProps>;
    props: IconBaseProps;
  };
  name: string;
};
const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {icon && <icon.component {...icon.props} />}
      <input
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error && !isFocused && <span>{error}</span>}
    </Container>
  );
};
export default Input;
