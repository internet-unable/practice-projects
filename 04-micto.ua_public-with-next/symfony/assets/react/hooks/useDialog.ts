import * as React from "react";

export const useDialog = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const onOpen = () => setDialogOpen(true);
  const onClose = () => setDialogOpen(false);

  return {
    dialogOpen,
    onOpen,
    onClose,
    setDialogOpen,
  };
};
