import classnames, { backgroundColor, borderRadius, borders, spacing, typography } from '@frontend/tailwindcss-classnames';
import { ButtonProps, ButtonVariant } from './types';

export const Button = (props: ButtonProps) => {
  const { variant, size, children, classNames, onClick } = props;

  const styles = useStyles();

  return (
    <button className={classnames(classNames, styles.common, styles.variant(variant))} onClick={onClick}>
      {children}
    </button>
  );
};

const useStyles = () => {
  return {
    common: classnames(borderRadius('rounded-xl'), spacing('p-2')),
    variant: (variant: ButtonVariant) => 
      classnames(
        variant === 'contained' ? classnames(
          backgroundColor('bg-primary-color', 'hover:bg-secondary-color'),
          typography('text-white'),
        ) : null,
        variant === 'outlined' ? classnames(
          backgroundColor('hover:bg-primary-color'),
          typography('hover:text-white'),
          borders('border-2')
        ) : null,
      )
    
  };
};
