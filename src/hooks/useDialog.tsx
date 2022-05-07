import { useState } from 'react';

export const useDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        instance: {
            open,
            onClose: handleClose,
        },
        actions: {
            open: handleClickOpen,
            close: handleClose,
        },
    };
};

export type useDialogInstance = ReturnType<typeof useDialog>;
