import classnames, {
  borderRadius,
  borders,
  sizing,
  spacing,
  typography,
} from '@frontend/tailwindcss-classnames';
import { InputProps } from './types';

export const Input = (props: InputProps) => {
  const { size, placeholder, type, classNames, onChange, value } = props;

  const styles = useStyles();

  return (
    <input
      className={classnames(classNames, styles.common, styles.size(size))}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
    />
  );
};

const useStyles = () => {
  return {
    common: classnames(
      borderRadius('rounded-xl'),
      spacing('p-2'),
      borders('border-2'),
    ),
    size: (size: 'sm' | 'md' | 'lg') =>
      classnames(
        size === 'sm' ? classnames(sizing('h-4')) : null,
        size === 'md'
          ? classnames(sizing('h-8'), typography('text-tx14', 'md:text-tx16'))
          : null,
      ),
  };
};
