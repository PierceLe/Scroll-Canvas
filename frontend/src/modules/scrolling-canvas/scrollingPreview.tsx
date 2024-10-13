import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  classnames,
  typography,
  sizing,
  spacing,
  display,
  justifyContent,
  gap,
} from '@frontend/tailwindcss-classnames';
import { Button } from '@frontend/components/button';
import { useAuthContext } from '../auth';
import { ROLE_TYPE } from '@frontend/repositories';
import { ReactPDF } from '@frontend/components/react-pdf';


type ScrollingPreview = {
  isShowModal: boolean;
  onClose:
    | ((
        event?: React.SyntheticEvent | KeyboardEvent | TouchEvent | MouseEvent,
      ) => void)
    | undefined;
  title?: string;
  createdBy?: string;
  createdByUsername?: string;
  date?: string;
  url?: string;
};

export const ScrollingPreview = (props: ScrollingPreview) => {
  const {
    isShowModal,
    onClose,
    title,
    createdBy,
    createdByUsername,
    date,
    url,
  } = props;
  const { user } = useAuthContext();

  const styles = useStyles();

  const handleCreateUser = async () => {};

  return (
    <div>
      <Popup
        key="createUserModal"
        modal={true}
        closeOnDocumentClick
        onClose={onClose}
        open={isShowModal}
        className="w-900"
      >
        <div className="modal">
          <div className={`line-clamp-2 ${classnames(styles.title)}`}>
            {title}
          </div>

          <div className={classnames(styles.pdfPreviewWrap)}>
            <ReactPDF url={url ?? ''}/>
          </div>

          <div className={`actions ${classnames(styles.action)}`}>
            <Button
              variant="contained"
              size="md"
              color="success"
              onClick={handleCreateUser}
            >
              Save
            </Button>
            {(user?.role === ROLE_TYPE.ADMIN ||
              user?.username === createdByUsername) && (
              <Button
                variant="contained"
                size="md"
                color="danger"
                onClick={handleCreateUser}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
};

const useStyles = () => {
  return {
    title: classnames(typography('text-tx22', 'font-bold'), spacing('mb-5')),
    form: classnames(spacing('mb-4')),
    inputWrap: classnames(spacing('mb-2', 'last:!mb-0')),
    input: classnames(sizing('w-full')),
    inputLabel: classnames(
      spacing('mb-1'),
      typography('text-tx14', 'md:text-tx16'),
    ),
    action: classnames(
      display('flex'),
      justifyContent('justify-center'),
      gap('gap-4'),
    ),
    icon: classnames(sizing('w-5', 'h-5')),
    pdfPreviewWrap: classnames(spacing('mb-4')),
  };
};
