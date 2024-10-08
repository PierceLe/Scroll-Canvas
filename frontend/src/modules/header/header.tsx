import { useNavigate } from 'react-router-dom';
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  borders,
  boxShadow,
  cursor,
  display,
  gap,
  group,
  justifyContent,
  layout,
  position,
  sizing,
  spacing,
  typography,
} from '@frontend/tailwindcss-classnames';
import { useAuthContext } from '@frontend/modules/auth';
import { Navigation } from '@frontend/modules/navigation';
import { Button } from '@frontend/components/button';
import { PAGE_LINKS } from '@frontend/react-routes/permissionLink';

export const Header = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  const { user, isLogged } = useAuthContext();

  console.log(user, isLogged);

  const handleNavigateProfilePage = () => {
    navigate(PAGE_LINKS.PROFILE.path)
  }

  const handleNavigateUserManagementPage = () => {
    navigate(PAGE_LINKS.USER_MANAGEMENT.path)
  }

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.logo)}>LOGO</div>
      <div className={styles.navigation}>
        <Navigation />
      </div>
      <div className={classnames(styles.profile)}>
        {isLogged ? (
          <>
            <div className={classnames(styles.profileWrap)}>
              <img
                src="../../../public/react.png"
                className={classnames(styles.avatar)}
              />
              <div className={classnames(styles.name)}>{user?.firstName}</div>
              <div className={classnames(styles.profileDropdown)}>
                <div className={classnames(styles.dropdownContent)} onClick={handleNavigateProfilePage}>
                  Profile
                </div>
                <div className={classnames(styles.dropdownContent)} onClick={handleNavigateUserManagementPage}>
                  User management
                </div>
                <div
                  className={classnames(styles.dropdownContent, styles.logout)}
                >
                  Log out
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Button variant="outlined" size="md" color="default">
              Log in
            </Button>
            <Button variant="contained" size="md">
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(
      sizing('h-16'),
      display('flex'),
      justifyContent('justify-between'),
      spacing('px-10'),
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
    profileWrap: classnames(
      display('flex'),
      gap('gap-2'),
      alignItems('items-center'),
      cursor('cursor-pointer'),
      borderRadius('rounded-3xl'),
      spacing('p-2'),
      group('group'),
      position('relative'),
    ),
    name: classnames(typography('font-bold', 'text-tx18')),
    avatar: classnames(sizing('h-8', 'w-8'), borderRadius('rounded-3xl')),
    profileDropdown: classnames(
      display('hidden', 'group-hover:block'),
      position('absolute'),
      layout('top-12','-right-4'),
      backgroundColor('bg-white'),
      borderRadius('rounded-xl'),
      sizing('w-48'),
      spacing('py-2'),
      boxShadow('shadow-md'),
      borders('border')
    ),
    dropdownContent: classnames(
      spacing('px-4','py-2'),
      backgroundColor('hover:bg-gray-50')
    ),
    logout: classnames(typography('text-red-500')),
  };
};
