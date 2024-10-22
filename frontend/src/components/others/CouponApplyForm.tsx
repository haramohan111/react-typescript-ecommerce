import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import renderFormField from "../../helpers/renderFormField";
import { required } from "../../helpers/validation";
import { coupon } from "../../actions/cartAction";

interface CouponFormValues {
  coupon: string;
}

const CouponApplyForm: React.FC<InjectedFormProps<CouponFormValues>> = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <Field
        name="coupon"
        type="text"
        label="Have coupon?"
        component={renderFormField}
        placeholder="Coupon code"
        validate={[required]}
        required={true}
      />
      <button
        type="submit"
        className="btn btn-sm btn-primary mt-3 float-end"
        disabled={submitting}
      >
        Apply
      </button>
    </form>
  );
};

export default compose(
  reduxForm<CouponFormValues>({
    form: "couponapplyform",
    onSubmit: async (values: { coupon: string; }, dispatch: (arg0: any) => void) => {
      localStorage.removeItem("cpcode");
      localStorage.setItem("cpcode", values.coupon);
      dispatch(coupon(values.coupon));
    }
  })
)(CouponApplyForm);
