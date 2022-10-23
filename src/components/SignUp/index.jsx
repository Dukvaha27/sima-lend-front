import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Notify from "../Notify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import useData from "../../services/useData";
import { styled } from "@mui/material";
import AddField from "../AddField";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
const theme = createTheme();

const StyledLink = styled(Link)({
  cursor: "pointer",
});
function SignUp() {
  const { fields, steps } = useData();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(0);
  const [contentNotify, setContentNotify] = useState({
    open: false,
    content: "",
    send: false,
  });

  const [data, setData] = useLocalStorage("data", { fields: {}, step: 0 });

  useEffect(() => {
    if (data?.step) {
      setStep(data.step);
    }
  }, []);

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = useCallback(
    (dataFields, ev) => {
      ev.preventDefault();
      if (step < steps.length - 1) {
        if (dataFields.password === dataFields.repeatPassword) {
          setStep(step + 1);
          setData({
            fields: { ...data.fields, ...dataFields },
            step: step + 1,
          });
          reset();
        } else {
          setContentNotify({
            ...contentNotify,
            open: true,
            content: "Пароли не совпадают",
          });
        }
      } else {
        setContentNotify({ ...contentNotify, content: dataFields.phone });
        if (contentNotify.content === dataFields.code) {
          navigate("/success");
          localStorage.removeItem("data");
        } else {
          setContentNotify({
            open: true,
            send: false,
            content: "Неверный код, запросите код еще раз",
          });
        }
      }
    },
    [contentNotify, step]
  );

  const getCodeHandler = useCallback(() => {
    const values = getValues();
    const { phone = "" } = values;

    if (!phone.length) {
      setContentNotify({
        ...contentNotify,
        open: true,
        content: "Номер телефона не может быть пустым",
      });
    } else {
      setContentNotify({ open: true, content: uuidv4(), send: true });
    }
  }, [contentNotify]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgColor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {steps[step].label}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <form>
                {fields
                  .filter(({ stepId }) => stepId === step)
                  .map(({ name, label, type, required, send, id }) => (
                    <>
                      <TextField
                        key={id}
                        margin="normal"
                        required={required}
                        fullWidth
                        id={name}
                        label={label}
                        name={name}
                        autoComplete={name}
                        type={type || "text"}
                        autoFocus
                        error={!!errors?.[name]}
                        {...register(name, { required })}
                      />
                      {send && (
                        <Button
                            key={send}
                          onClick={getCodeHandler}
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Получить
                        </Button>
                      )}
                    </>
                  ))}
                <div style={{display:'flex', alignItems:"center"}}>
                  <AddCircleTwoToneIcon
                      titleAccess={"Add new field"}
                      cursor={"pointer"}
                      onClick={() => setOpenModal(true)}
                  />
                  <span style={{marginLeft:".5rem"}}>Добавить новое поле</span>
                </div>
                <Button
                  onClick={(e) => handleSubmit(onSubmit)(e)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {steps.length - 1 === step
                    ? "Зарегистрироваться"
                    : "Продолжить"}
                </Button>
              </form>
              <Notify
                open={contentNotify}
                setOpen={setContentNotify}
                content={contentNotify}
              />
              <Grid container>
                <Grid item xs>
                  {!!step && (
                    <StyledLink
                      variant="body2"
                      onClick={() => setStep(step - 1)}
                      cursor={"pointer"}
                    >
                      К предыдущей странице
                    </StyledLink>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {openModal && <AddField onClose={() => setOpenModal(false)}/>}
    </>
  );
}

export default memo(SignUp);
