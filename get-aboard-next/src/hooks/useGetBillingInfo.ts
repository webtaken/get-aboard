import { OneTimePaymentProduct, Order } from "@/client";
import { getOneTimePaymentProduct, getUserOrder } from "@/lib/billing-actions";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const useGetBillingInfo = () => {
  const { status, data: session } = useSession();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [oneTimePaymentProduct, setOneTimePaymentProduct] = useState<
    OneTimePaymentProduct | undefined
  >(undefined);
  const [isFreePlan, setIsFreePlan] = useState(false);

  useEffect(() => {
    if (session) {
      const getOrder = async () => {
        const order = await getUserOrder();
        setOrder(order);
        if (order) {
          const product = await getOneTimePaymentProduct(
            order.one_time_payment_product!
          );
          setOneTimePaymentProduct(product);
        } else {
          // Free plan
          setIsFreePlan(true);
        }
      };
      getOrder();
    }
  }, [session]);

  return {
    status,
    session,
    order,
    oneTimePaymentProduct,
    isFreePlan,
  };
};

export default useGetBillingInfo;
