import classnames, {
  display,
  justifyContent,
  sizing,
  spacing,
  alignItems,
} from '@frontend/tailwindcss-classnames';

export const Navigation = () => {
  const styles = useStyles();

  return (
    <div className={styles.navigation}>
      <NavigationItem>Home</NavigationItem>
      <NavigationItem>Dashboard</NavigationItem>
    </div>
  );
};

const NavigationItem = (props: { children: any }) => {
  const { children } = props;
  const styles = useNavigationItemStyles();

  return <div className={classnames(styles.root)}>{children}</div>;
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
    root: classnames(spacing('p-2')),
  };
};
