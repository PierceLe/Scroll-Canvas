import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  sizing,
  spacing,
  typography,
} from '@frontend/tailwindcss-classnames';
import { convertDateToString } from '@frontend/utils/date';

type ScrollingCardProps = {
  title: string;
  createdBy: string;
  date: string;
};
export const ScrollingCard = (props: ScrollingCardProps) => {
  const { title, createdBy, date } = props;
  const styles = useStyles();

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.header)}>
        <div
          className={`line-clamp-4 ${classnames(styles.title)}`}
          title={title}
        >
          {title}
        </div>
      </div>
      <div className={classnames(styles.footer)}>
        <div>
          by <span className={classnames(styles.createdBy)}>{createdBy}</span>
        </div>
        <div>{convertDateToString((new Date(date)), 'DD-MM-YYYY')}</div>
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(
      backgroundColor('bg-white'),
      borderRadius('rounded-xl'),
      spacing('px-6', 'py-4'),
      display('flex'),
      justifyContent('justify-between'),
      flexDirection('flex-col'),
      sizing('h-44'),
    ),
    header: classnames(spacing('mb-4')),
    footer: classnames(
      display('flex'),
      justifyContent('justify-between'),
      typography('text-gray-600'),
    ),
    title: classnames(typography('text-tx18', 'font-bold')),
    createdBy: classnames(typography('font-bold')),
  };
};
