import { Box, Chip, Dialog, Typography } from "@mui/material";
import { Log } from "./TableLogs";
import { users } from '../mock/users.json';

interface Props {
  isOpen: boolean;
  setOpenModal: (value: boolean) => void;
}

function UsersList(props: Props) {
  const { isOpen, setOpenModal } = props;


  return (
    <Dialog
      scroll='body'
      fullWidth
      maxWidth="lg"
      open={isOpen}
      onClose={() => setOpenModal(false)}
      PaperProps={{ style: { overflow: 'scroll' } }}
    >
      <Box sx={{ padding: 4, display: 'flex', gap: 2 }}>
        {(users as Log['user'][]).map((user, index) => (
          <Box key={index} sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid black', borderRadius: '5px' }}>
            <Typography variant="h6" sx={{marginBottom: 2}}>{`User ID: ${user._id}`}</Typography>
            <Typography>{`Name: ${user.name}`}</Typography>
            <Typography>{`Email: ${user.email}`}</Typography>
            <Typography>{`Phone: ${user.phone}`}</Typography>
            <Box>
              <Typography>Subscriptions: </Typography>
              {user.subscribed.map((sub: string, indexSub: number) => <Typography key={indexSub}>{sub}</Typography>)}
            </Box>
            <Box>
              <Typography>Channels: </Typography>
              {user.channels.map((channel: string, indexChannel: number) => <Typography key={indexChannel}>{channel}</Typography>)}
            </Box>
          </Box>
        ))}
      </Box>
    </Dialog>
  )
}

export default UsersList
