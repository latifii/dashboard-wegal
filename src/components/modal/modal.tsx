import type { ReactNode } from 'react';

import { createPortal } from 'react-dom';
import React, { useMemo, useState, useContext, cloneElement, createContext } from 'react';

import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Iconify } from '../iconify';

const ModalContext = createContext<any>(null);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  const contextValue = useMemo(() => ({ openName, close, open }), [openName]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}

function Open({ children, opens }: { children: ReactNode; opens: string }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opens),
  });
}

function Window({ children, name, title }: { children: ReactNode; name: string; title: string }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <Dialog
      open
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton
          edge="end"
          color="inherit"
          onClick={close}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 10,
            right: 20,
          }}
        >
          <Iconify icon="mingcute:close-line" width="24" height="24" />
        </IconButton>

        <span>{title}</span>
      </DialogTitle>
      <DialogContent>
        {cloneElement(children as React.ReactElement, { onClick: close })}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={close}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
