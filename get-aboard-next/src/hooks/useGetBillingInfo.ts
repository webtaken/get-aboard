import { HasAccess, OneTimePaymentProduct, Order } from "@/client";
import {
  getOneTimePaymentProduct,
  getUserHasAccess,
  getUserOrder,
} from "@/lib/billing-actions";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const useGetBillingInfo = () => {
  const { status, data: session } = useSession();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [access, setAccess] = useState<HasAccess | undefined>(undefined);
  const [oneTimePaymentProduct, setOneTimePaymentProduct] = useState<
    OneTimePaymentProduct | undefined
  >(undefined);

  useEffect(() => {
    if (session) {
      const getOrder = async () => {
        const [order, access] = await Promise.allSettled([
          getUserOrder(),
          getUserHasAccess(),
        ]);
        if (order.status === "fulfilled" && order.value) {
          setOrder(order.value);
          const product = await getOneTimePaymentProduct(
            order.value.one_time_payment_product!
          );
          setOneTimePaymentProduct(product);
        }
        if (access.status === "fulfilled" && access.value) {
          setAccess(access.value);
        }
      };
      getOrder();
    }
  }, [session]);

  return {
    status,
    session,
    access,
    order,
    oneTimePaymentProduct,
  };
};

export default useGetBillingInfo;
