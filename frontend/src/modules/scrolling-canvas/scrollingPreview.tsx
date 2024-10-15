/* eslint-disable @typescript-eslint/ban-ts-comment */
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  classnames,
  typography,
  sizing,
  spacing,
  display,
  gap,
  justifyContent,
  fill,
  alignItems,
} from '@frontend/tailwindcss-classnames';
import { Button } from '@frontend/components/button';
import { useAuthContext } from '../auth';
import { ROLE_TYPE } from '@frontend/repositories';
import { ReactPDF } from '@frontend/components/react-pdf';
import { useReduxDispatch } from '@frontend/redux/hooks';
import { ScrollingController } from '@frontend/handlers/scrolling';
import { Icon } from '@frontend/components/icon';

type ScrollingPreview = {
  isShowModal: boolean;
  onClose:
    | ((
        event?: React.SyntheticEvent | KeyboardEvent | TouchEvent | MouseEvent,
      ) => void)
    | undefined;
  id?: number;
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
    id,
    title,
    // createdBy,
    createdByUsername,
    // date,
    url,
  } = props;
  const { user } = useAuthContext();

  const dispatch = useReduxDispatch();
  const scrollController = ScrollingController.getInstance();

  const styles = useStyles();

  const handleDeleteScroll = (closeConfirmDelete: any) => {
    dispatch(
      scrollController.deleteScrolling({
        id,
      }),
    );

    closeConfirmDelete()
    if (onClose) onClose();
  };

  const handleUpdateScroll = async () => {};

  return (
    <div>
      <Popup
        key="createUserModal"
        modal={true}
        closeOnDocumentClick
        onClose={onClose}
        open={isShowModal}
        nested={true}
        className="w-900"
      >
        <div className="modal">
          <div className={`line-clamp-2 ${classnames(styles.title)}`}>
            {title}
          </div>

          <div className={classnames(styles.pdfPreviewWrap)}>
            <ReactPDF url={url ?? ''} />
          </div>

          <div className={`actions ${classnames(styles.action)}`}>
            <Button
              variant="contained"
              size="md"
              color="success"
              onClick={handleUpdateScroll}
            >
              Save
            </Button>
            {(user?.role === ROLE_TYPE.ADMIN ||
              user?.username === createdByUsername) && (
              <Popup
                key="confirmDeleteModal"
                modal={true}
                trigger={
                  <button>
                    <Button variant="contained" size="md" color="danger">
                      Delete
                    </Button>
                  </button>
                }
              >
                {/** @ts-ignore */}
                {close => (
                  <div className="modal">
                    <div className={classnames(styles.deleteWarn)}>
                      <Icon
                        classNames={classnames(styles.warnIcon)}
                        type="warning"
                      ></Icon>
                      <div className={classnames(styles.deleteWarnTitle)}>
                        Do you want to delete this scroll?
                      </div>
                    </div>

                    <div
                      className={`actions ${classnames(styles.deleteAction)}`}
                    >
                      <Button
                        variant="contained"
                        size="md"
                        color="success"
                        onClick={() => handleDeleteScroll(close)}
                      >
                        OK
                      </Button>
                      <Button
                        variant="contained"
                        size="md"
                        color="danger"
                        onClick={() => {
                          close();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </Popup>
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    warnIcon: classnames(sizing('h-8', 'w-8'), fill('fill-yellow-500')),
    deleteWarn: classnames(
      display('flex'),
      justifyContent('justify-center'),
      alignItems('items-center'),
      gap('gap-2'),
      spacing('mb-6'),
    ),
    deleteWarnTitle: classnames(typography('text-tx22', 'font-bold')),
    deleteAction: classnames(
      display('flex'),
      justifyContent('justify-center'),
      gap('gap-2'),
    ),
  };
};
