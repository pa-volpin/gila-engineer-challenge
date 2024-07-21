import { Box, Dialog, Typography } from "@mui/material";
import { Log } from "./TableLogs";
import { formatDate } from "../utils/formatDate";

interface Props {
  isOpen: boolean;
  setOpenModal: (value: boolean) => void;
  log?: Log;
}

function Details(props: Props) {
  const { log, isOpen, setOpenModal } = props;

  if (!log) {
    return <></>
  }

  return (
    <Dialog
      scroll='body'
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={() => setOpenModal(false)}
      PaperProps={{ style: { overflow: 'scroll' } }}
    >
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{marginBottom: 2}}>{`Message ID: ${log._id}`}</Typography>
        <Typography>{`Date: ${formatDate(log.createdAt)}`}</Typography>
        <Typography>{`Channel: ${log.channel}`}</Typography>
        <Typography>{`Category: ${log.messageCategory}`}</Typography>
        <Typography>{`User: ${log.user.name} (${log.user.email})`}</Typography>
        <Typography>{`Message: ${log.message}`}</Typography>
      </Box>
    </Dialog>
  )
}

export default Details
