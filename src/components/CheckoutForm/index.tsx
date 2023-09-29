import { Formik, Form, FormikProps, Field, ErrorMessage } from "formik"
import { StyledInput } from "styles/StyledInput"
import Select, { ContainerProps, ControlProps, GroupBase, components } from 'react-select'
import { useAppSelector } from "hooks/hooks"
import { RootState } from "redux/store"
import * as Yup from 'yup';
import "./style.scss"
import { CartProduct, UserData, Values } from "definitions"
import { makeOrder } from "api"
import { showErrorToast, showSuccessToast } from "helpers/toast"
import { ToastContainer } from "react-toastify"


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const CheckoutSchema = Yup.object().shape({
    firstName: Yup.string().max(20,'Name size is too big.').required('Required'),
    lastName: Yup.string().max(20,'Name size is too big.').required('Required'),
    country: Yup.string().required('Required'),
    streetAddress: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zipCode: Yup.number().required('Required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().required(),
    additionalInfo: Yup.string().max(140, 'Too much information.')
})

const CheckoutForm = () => {
    const products = useAppSelector((state: RootState) => state.cart.cart?.products)
    const totalPrice = useAppSelector((state: RootState) => state.cart.cart?.total)
    const countries = ["USA", "France", "Germany", "Netherlands"]
    const countryOptions = countries.map(country => ({value: country, label: country}))
    const province = ["Puerto Rico", "New Caledonia", "Bavaria", "Aruba"]
    const provinceOptions = province.map(province => ({value: province, label: province}))

    return (
        <div className="checkout">
                <Formik initialValues={{
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    country: "",
                    streetAddress: "",
                    city: "",
                    province: "",
                    zipCode: null,
                    phone: "",
                    email: "",
                    additionalInfo: "",
                    transferOption: 1
                }}
                    validationSchema={CheckoutSchema}
                    onSubmit={(
                        values: Values
                    ) => {
                        const response = window.localStorage.getItem("success-response")
                        if(response && products) {
                            const user = JSON.parse(response) as UserData
                            const prod = products.map((p: CartProduct) => ({id: p.id, quantity: 1}))
                            try {
                                makeOrder(user.id, prod, values)
                                showSuccessToast({ message: "Order created!" })
                            }catch (e) {
                                showErrorToast({message: "Something went wrong."})
                            }
                        }
                    }}
                >
                {(props: FormikProps<Values>) => (
                    <Form>
                        <ToastContainer />
                        <div className="checkout__form">
                        <h3 className="title-md">Billing details</h3>
                            <div className="name">
                                <div className="name__first">
                                    <label htmlFor="firstName">First Name*</label>
                                    <StyledInput id="firstName" name="firstName" />
                                    <ErrorMessage name="firstName" className="error" component="div" />
                                </div>
                                <div className="name__last">
                                    <label htmlFor="lastName">Last Name*</label>
                                    <StyledInput id="lastName" name="lastName" />
                                    <ErrorMessage name="lastName" className="error" component="div" />
                                </div>
                            </div>

                            <label htmlFor="companyName">Company Name (Optional)</label>
                            <StyledInput id="companyName" name="companyName" />
                            <ErrorMessage name="companyName" className="error" component="div" />


                            <label htmlFor="country">Country / Region*</label>
                            <Select options={countryOptions}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            padding: '1rem',
                                            borderRadius: '0.6rem',
                                            borderColor: '#9F9F9F',
                                        }),
                                    }}
                                    onChange={selectedOption =>
                                                props.setFieldValue("country", selectedOption?.value)
                                             }
                                    name="country"
                            />
                            <ErrorMessage name="country" className="error" component="div" />


                            <label htmlFor="streetAddress">Street address*</label>
                            <StyledInput id="streetAddress" name="streetAddress" />
                            <ErrorMessage name="streetAddress" className="error" component="div" />

                            <label htmlFor="city">Town / City*</label>
                            <StyledInput id="city" name="city" />
                            <ErrorMessage name="city" className="error" component="div"/>

                            {/* province */}
                            <label htmlFor="province">Province</label>
                            <Select options={provinceOptions}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            padding: '1rem',
                                            borderRadius: '0.6rem',
                                            borderColor: '#9F9F9F',
                                        }),
                                    }}
                                    onChange={selectedOption =>
                                                props.setFieldValue("province", selectedOption?.value)
                                             }
                                    name="province"
                            />
                            <ErrorMessage name="province" className="error" component="div"/>

                            <label htmlFor="zipCode">ZIP code*</label>
                            <StyledInput type="number" id="zipCode" name="zipCode" />
                            <ErrorMessage name="zipCode" className="error" component="div"/>

                            <label htmlFor="Phone">Phone*</label>
                            <StyledInput id="Phone" name="phone" />
                            <ErrorMessage name="phone" className="error" component="div"/>

                            <label htmlFor="email">Email address*</label>
                            <StyledInput type="email" id="email" name="email" />
                            <ErrorMessage name="email" className="error" component="div"/>

                            <StyledInput as="textarea"
                                         name="additionalInfo"
                                         onChange={props.handleChange}
                                         className="additionalInformation"
                                         placeholder="Additional information"/>
                            <ErrorMessage name="additionalInfo" className="error" component="div"/>
                        </div>
                        <div className="checkout__info">
                            <table>
                                <thead>
                                    <tr className="table__header">
                                        <th>Product</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map(product => (
                                            <tr key={product.id} className="product">
                                                <td className="product__name">{product.title}</td>
                                                <td className="product__price">{product.price}Eu</td>
                                            </tr>
                                        ))
                                    }
                                    <tr className="subtotal">
                                        <td className="subtitle">Subtotal</td>
                                        <td className="subtotal__price">{totalPrice}Eu</td>
                                    </tr>
                                    <tr className="total">
                                        <td className="subtitle">Total</td>
                                        <td className="total__price">{totalPrice}Eu</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="transfer-options">
                                <label className={`transfer-option`}>
                                    <Field type="radio" name="transferOption" value="1" />
                                    Direct Bank Transfer
                                </label>

                                <label className={`transfer-option`}>
                                    <Field type="radio" name="transferOption" value="2"/>
                                    Cash On Delivery
                                </label>
                            </div>

                            <p className="privacy-notice">
                                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-bold">privacy policy.</span>
                            </p>
                            <button type="submit"
                                    disabled={!props.isValid}
                                    className="place-order btn-line-black btn-md">Place order</button>
                        </div>
                    </Form>
                    )}
            </Formik>
        </div>
    )
}


export default CheckoutForm
