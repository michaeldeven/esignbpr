import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Box, Button, Toast, Container, TextField, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';

import { auth } from '../../firebase/firebase';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const sendResetEmail = (event) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError('Error resetting password');
      });
  };

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Reset Password</Heading>
          </Box>
          {error !== null && <Toast text={error} />}
          {emailHasBeenSent !== false && <Toast text={'prosses mengirim email untuk reset password!'} />}
          <Box padding={2}>
            <TextField id="email" onChange={(event) => setEmail(event.value)} placeholder="Masukan Email disini" label="Email" value={email} type="email" />
          </Box>
          <Box padding={2}>
            <Button
              onClick={(event) => {
                sendResetEmail(event);
                navigate('/');
              }}
              text="Reset"
              color="blue"
              inline
            />
          </Box>
          <Box padding={2}>
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Kembali Masuk
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
export default PasswordReset;
