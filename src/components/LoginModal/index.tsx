import { FC, useState } from "react"
import "./style.scss"
import { Formik } from "formik"
import * as Yup from "yup"
import { fetchUserByEmail, loginUser } from "api"
import { AxiosError } from "axios"
import { useAppDispatch } from "hooks/hooks"
import { setUser } from "redux/userSlice"
import { setCart } from "redux/cartSlice"

type Props = {
    closeModal: () => void
}

const LoginModal: FC<Props> = ({ closeModal }) => {
    const [errorLogin, setErrorLogin] = useState<string>("")
    const dispatch = useAppDispatch()

    const schema = Yup.object().shape({
        email: Yup.string()
            .required("You forgot to enter your email")
            .email("Invalid email format"),
        password: Yup.string()
            .required("You do have a password, right?")
            .min(4, "Password must be at least 4 characters")
    })

              // fetchUserByEmail(values.email).then(user => {
    return (
      <>
        <div className="overlay-login" onClick={closeModal} />
        <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              fetchUserByEmail("atuny0@sohu.com").then(user => {
                  if(!user) {
                      setErrorLogin("Sorry, that user doesn't exist")
                      return;
                  }

                  /* loginUser(user.username, values.password) */
                  loginUser("atuny0", "9uQFF1Lh")
                      .then((data) => {
                          window.localStorage.setItem("success-response", JSON.stringify(data))
                          window.localStorage.setItem("user_token", data.token)
                          closeModal()
                      }).catch((err: AxiosError<{ message: string }>) => {
                          if (err.response?.data.message) {
                            setErrorLogin("Invalid email or password, please try again")
                          }
                      })
                  }).catch(err => {
                      console.log(err)
                      setErrorLogin("Invalid email or password, please try again")
                  })
            }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
          }) => (
            <div className="login">
              <button className="close" onClick={closeModal}>X</button>
              <form noValidate onSubmit={handleSubmit}>
                <span className="title-md">Welcome</span>
                <div>
                <div>
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    onChange={(e) => {setErrorLogin(""); handleChange(e)}}
                    onBlur={handleBlur}
                    value={values.email} />
                </div>
                <div>
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => {setErrorLogin(""); handleChange(e)}}
                    onBlur={handleBlur}
                    value={values.password} />
                </div>
              </div>
              <div className="bottom">
                <p className="error"> {errorLogin} </p>
                <button type="submit" className="submit btn-line-primary btn-sm">Login</button>
              </div>
              </form>
            </div>
            )}
        </Formik>
      </>
    )
}

export default LoginModal
