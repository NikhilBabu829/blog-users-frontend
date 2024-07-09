import {Box,Container,TextField,Typography,Button,Card,CardContent, Snackbar} from "@mui/material";
import { useEffect } from "react";
import Loading from "./Loading";

export default function UserForm({handleSubmit, formData, handleSnackBarOnClose, setFormData, displaySnackBar, formType, snackBarMsg, currentUser}){
    return (
    <>
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          minWidth: "40%",
          maxHeight: "fitContent",
          minHeight: "fitContent",
          padding: "2%",
        }}
      >
        <Typography gutterBottom variant="h3" component="div">
          {formType}
        </Typography>
        <CardContent>
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();
          }}>
            { 
              ( typeof currentUser == "object" && Object.keys(currentUser).length <= 0) || (currentUser==null) || (currentUser==undefined) ? (
                <TextField
                    id="username"
                    label="Username"
                    variant="filled"
                    size="small"
                    type="text"
                    fullWidth
                    required
                    sx={{ display: "block", marginBottom: "5%" }}
                    onChange={(e)=>{
                      setFormData({username: e.target.value});
                    }}
                  />
              )
              : (
                <TextField
                  id="username"
                  label={currentUser.user}
                  variant="filled"
                  size="small"
                  type="text"
                  fullWidth
                  required
                  sx={{ display: "block", marginBottom: "5%" }}
                  onChange={(e)=>{
                    setFormData({username: e.target.value});
                  }}
                />
              )
            }
            <TextField
              id="password"
              label="Password"
              variant="filled"
              size="small"
              type="password"
              fullWidth
              required
              sx={{ display: "block", marginBottom: "5%" }}
              onChange={(e)=>{
                setFormData({...formData, password: e.target.value });
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ display: "block", marginBottom: "5%" }}
              type="submit"
            >
              {formType}
            </Button>
          </form>
        </CardContent>
      </Card>
        <Snackbar
            open={displaySnackBar}
            autoHideDuration={4000}
            onClose={handleSnackBarOnClose}
            message={snackBarMsg}
            anchorOrigin = {{vertical : 'bottom', horizontal : 'right'}}
        />
    </Container>
    </>
  )
}