import { PAGE_LINKS } from '@frontend/react-routes/permissionLink';
import classnames, {
  display,
  justifyContent,
  sizing,
  spacing,
  alignItems,
  typography,
  backgroundColor,
  borderRadius,
} from '@frontend/tailwindcss-classnames';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const styles = useStyles();

  const pages = [PAGE_LINKS.HOME, PAGE_LINKS.DASHBOARD];
  return (
    <div className={styles.navigation}>
      {pages.map(page => {
        return <NavigationItem title={page.title} path={page.path} />;
      })}
    </div>
  );
};

const NavigationItem = (props: { title: string; path: string }) => {
  const { title, path } = props;
  const styles = useNavigationItemStyles();

  return (
    <Link className={classnames(styles.root)} to={path}>
      {title}
    </Link>
  );
};

const useStyles = () => {
  return {
    navigation: classnames(
      display('flex'),
      justifyContent('justify-center'),
      sizing('h-full'),
      alignItems('items-center'),
    ),
  };
};

const useNavigationItemStyles = () => {
  return {
    root: classnames(
      spacing('py-2', 'px-4'),
      typography('text-gray-600', 'text-tx18'),
      backgroundColor('hover:bg-gray-100'),
      borderRadius('rounded-3xl')
    ),
  };
};
