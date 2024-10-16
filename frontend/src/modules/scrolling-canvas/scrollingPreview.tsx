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
import { useState, useEffect, SetStateAction } from 'react';
import { Input } from '@frontend/components/input';
import { getCookie } from '@frontend/helpers/cookie';
import { toast } from 'react-toastify';

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

  const [editTitle, setEditTitle] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [file, setFile] = useState<any>();

  const styles = useStyles();

  useEffect(() => {
    setEditTitle(title ?? '');
    setIsEdit(false);
  }, [id]);

  const handleDeleteScroll = (closeConfirmDelete: any) => {
    dispatch(
      scrollController.deleteScrolling({
        id,
      }),
    );

    closeConfirmDelete();
    if (onClose) onClose();
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleTitle = (e: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setEditTitle(e.target.value);
  };

  const handleUpdateScroll = async () => {
    const formData = new FormData();

    // Update the formData object
    formData.append('file', file);
    formData.append('title', editTitle ?? '');

    // dispatch(scrollController.updateScrolling(formData));

    fetch('http://localhost:8080/api/v1/scroll/upload', {
      method: 'post',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + getCookie('Authentication'),
      },
    }).then(async response => {
      console.log(response);
      const res = await response.json();
      if (res.statusCode === 200) {
        toast.info('Update scroll successfully!');
      }
      // dispatch(createScrollSuccess(res.data));
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url ?? '';
    link.setAttribute('download', 'yourfile.pdf'); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <div className="mb-5">
            {isEdit ? (
              <Input
                size="md"
                value={editTitle}
                classNames={classnames(styles.input)}
                onChange={handleTitle}
              />
            ) : (
              <div className={`line-clamp-2 ${classnames(styles.title)}`}>
                {title}
              </div>
            )}
          </div>

          {isEdit ? (
            <Input
              size="md"
              type="file"
              onChange={handleFile}
              classNames={classnames(styles.input)}
            />
          ) : (
            <div className={classnames(styles.pdfPreviewWrap)}>
              <ReactPDF url={url ?? ''} />
            </div>
          )}

          <div className={`actions ${classnames(styles.action)}`}>
            {isEdit && (
              <Button
                variant="contained"
                size="md"
                color="success"
                onClick={handleUpdateScroll}
              >
                Save
              </Button>
            )}
            {isEdit ? (
              <Button
                variant="contained"
                size="md"
                color="default"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="contained"
                size="md"
                color="success"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>
            )}
            <Button variant="contained" size="md" onClick={handleDownload}>
              Download
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
    title: classnames(typography('text-tx22', 'font-bold')),
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
