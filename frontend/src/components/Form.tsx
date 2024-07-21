import { Button, CircularProgress, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import UsersList from './Users';

interface Props {
  fetchDataOnSuccess: CallableFunction;
}

function Form(props: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState(false)

  const [category, setCategory] = useState('')
  const [categoryError, setCategoryError] = useState(false)

  const handleSubmit = () => {
    if (message.length === 0) {
      setMessageError(true)
    }

    if (category.length === 0) {
      setCategoryError(true)
    }

    if (messageError || categoryError) {
      return
    }

    const body ={
      message,
      category
    }

    const requestConfig = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    setLoading(true);

    fetch(`http://localhost:8080/notifications`, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        if (data.message === 'Success') {
          props.fetchDataOnSuccess();
        }
      })
      .catch(error => {
        console.log(`Error posting notification: ${error}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'stretch', width: '20%', padding: 4 }}>
      <UsersList isOpen={isOpenModal} setOpenModal={setIsOpenModal} />
      <Typography variant='h5' sx={{ marginBottom: 4 }}>Notification generator</Typography>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          label="Category"
          onChange={(event) => { setCategoryError(false); setCategory(event.target.value); }}
          error={categoryError}
          required
          disabled={loading}
        >
          <MenuItem value={'Movies'}>Movies</MenuItem>
          <MenuItem value={'Sports'}>Sports</MenuItem>
          <MenuItem value={'Finance'}>Finance</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        rows={7}
        multiline
        value={message}
        onChange={(event) => { setMessageError(false); setMessage(event.target.value); }}
        error={messageError}
        helperText={messageError && 'Message cannot be empty'}
        required
        disabled={loading}
      />
      <Button
        variant="outlined"
        id="submit-button"
        onClick={() => handleSubmit()}
        sx={{ width: '100%', marginTop: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Send'}
      </Button>
      <Link sx={{ marginTop: 4 }} onClick={() => setIsOpenModal(true)}>See users list</Link>
    </Paper>
  )
}

export default Form
