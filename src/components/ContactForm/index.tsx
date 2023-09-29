import "./style.scss"
import Time from "../../assets/bi_clock-fill.svg"
import Phone from "../../assets/bxs_phone.svg"
import Location from "../../assets/Vector.svg"
import { Formik, Field, Form, FormikErrors, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { ContactFormValues } from "definitions"
import { ContactService } from "services/ContactService"
import { showSuccessToast } from "helpers/toast"
import { ToastContainer } from "react-toastify"


const DisplayErrorMessageSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    subject: Yup.string(),
    message: Yup.string().required('Required'),
})


const ContactForm = () => {

  const hasErrors = (error: FormikErrors<ContactFormValues>) => {
      return error.message ?? error.name ?? error.subject ?? error.email
  }

  return (
    <div className="contact">
      <div className="contact-text">
        <h3 className="title-md">Get In Touch With Us</h3>
        <p className="text-sm">
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </div>
      <div className="contact-form">
        <div className="contact-form--left">
          <div className="contact-form-info">
            <div className="contact-form-info-icon">
                <img src={Location} alt="Location"/>
            </div>
            <div className="contact-form-info-text">
              <h3 className="title-sm">Address</h3>
              <p className="text-sm">
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
          </div>
          <div className="contact-form-info">
            <div className="contact-form-info-icon">
                <img src={Phone} alt="Phone"/>
            </div>
            <div className="contact-form-info-text">
              <h3 className="title-sm">Phone</h3>
              <p className="text-sm">
                Mobile: +(84) 546-6789
                Hotline: +(84) 456-6789
              </p>
            </div>
          </div>
          <div className="contact-form-info">
            <div className="contact-form-info-icon">
                <img src={Time} alt="time"/>
            </div>
            <div className="contact-form-info-text">
              <h3 className="title-sm">Working Time</h3>
              <p className="text-sm">
                Monday-Friday: 9:00 - 22:00
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>
        <div className="contact-form--right">
          <Formik initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  }}
                  validationSchema={DisplayErrorMessageSchema}
                    onSubmit={async (values: ContactFormValues, { setSubmitting }: FormikHelpers<ContactFormValues>) => {
                      ContactService.postContactMessage(values).then((status) => {
                        if (status === 200) {
                          showSuccessToast({ message: "Message sent! We'll get back to you as soon as possible." })
                        }
                      }
                    )}
                  }
          >
            {
                ({ errors, touched }) => (
                  <Form>
                    <div className="field">
                      <label htmlFor="name">Your name*</label>
                      <Field id="name" name="name" placeholder="Abc" />
                      {errors.name && touched.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email address*</label>
                      <Field id="email" name="email" placeholder="Abc@def.com" />
                      {errors.email && touched.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="field">
                      <label htmlFor="subject">Subject</label>
                      <Field id="subject" name="subject" placeholder="This is an optional" />
                      {errors.subject && touched.subject && <div className="error">{errors.subject}</div>}
                    </div>
                    <div className="field message">
                      <label htmlFor="message">Message*</label>
                      <Field as="textarea" id="message" name="message" placeholder="Hi! I'd like to ask about" />
                      {errors.message && touched.message && <div className="error">{errors.message}</div>}
                    </div>
                    <button className={`btn-full btn-sm ${hasErrors(errors) && 'error-btn'}`} type="submit">Submit</button>
                    <ToastContainer />
                  </Form>
                )
            }
          </Formik >
        </div>
      </div>
    </div>
  )
}

export default ContactForm;
