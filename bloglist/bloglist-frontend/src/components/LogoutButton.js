import { Button } from "@mui/material";

const Logoutbutton = ({ onLogout }) => {
  return (
    <>
      <Button variant="contained" color="secondary" onClick={onLogout} id="logout-button">
        Logout
      </Button>
    </>
  );
};

export default Logoutbutton;
