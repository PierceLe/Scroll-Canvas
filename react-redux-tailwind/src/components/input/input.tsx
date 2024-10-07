import classnames, { borderRadius, borders, spacing } from '@frontend/tailwindcss-classnames';
import { InputProps } from './types';

export const Input = (props: InputProps) => {
  const { size, placeholder, type, classNames, onChange } = props;

  const styles = useStyles();

  return (
    <input className={classnames(classNames, styles.common)} placeholder={placeholder} type={type} onChange={onChange}/>
  );
};

const useStyles = () => {
  return {
    common: classnames(
      borderRadius('rounded-xl'), 
      spacing('p-2'),
      borders('border-2')
    ),
  };
};
