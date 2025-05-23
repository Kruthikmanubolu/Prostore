import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodForm from "./payment-method-form";
import CheckoutStepsPage from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = getUserById(userId);
  return (
    <>
      <CheckoutStepsPage current={2} />
      <PaymentMethodForm preferredPaymentMethod={(await user).paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
