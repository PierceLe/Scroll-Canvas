import classnames, {
  alignItems,
  borders,
  display,
  gap,
  justifyContent,
  sizing,
  spacing,
  typography,
} from '@frontend/tailwindcss-classnames';
import { useAuthContext } from '@frontend/modules/auth';
import { Icon } from '@frontend/components/icon';
import { Navigation } from '@frontend/modules/navigation';

export const Header = () => {
  const styles = useStyles();
  const { user } = useAuthContext();

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.logo)}>LOGO</div>
      <div className={styles.navigation}>
        <Navigation/>
      </div>
      <div className={classnames(styles.profile)}>
        <Icon type="bell" classNames={styles.notiIcon} />
        <div className={classnames(styles.separate)}></div>
        <div>Profile</div>
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(
      sizing('h-14'),
      display('flex'),
      justifyContent('justify-between'),
    ),
    navigation: classnames(sizing('w-2/3')),
    title: classnames(typography('text-gray-6', 'font-semibold', 'text-tx20')),
    subTitle: classnames(typography('text-gray-3')),
    notiIcon: classnames(sizing('w-4', 'h-4')),
    profile: classnames(
      display('flex'),
      alignItems('items-center'),
      gap('gap-2'),
    ),
    separate: classnames(
      borders('border-l', 'border-gray-400'),
      sizing('h-2/3'),
    ),
    logo: classnames(
      typography('font-bold', 'text-tx22'),
      spacing('mb-10', 'px-5'),
    ),
  };
};
