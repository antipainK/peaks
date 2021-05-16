import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import { serverUrl } from '../../utils/const';

const ImagePreviewButton = ({ imageUrl, disabled = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        disabled={disabled || !imageUrl}
      >
        <ImageIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <Box display="flex" justifyContent="center">
          <img
            src={`${serverUrl}${imageUrl}`}
            alt="Podgląd obrazka"
            style={{ maxWidth: '100%' }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default ImagePreviewButton;
