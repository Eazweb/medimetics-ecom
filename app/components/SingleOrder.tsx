"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Order {
  id: string;
  quantity: number;
  Product: {
    name: string;
    price: number;
    mainImage: string;
  };
  address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt: string;
  status: string;
}

const SingleOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const orderId = params.orderId;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="w-full h-56 flex justify-center items-center mb-4">
          <Image
            width={200}
            height={200}
            src={order.Product?.mainImage || '/placeholder-image.jpg'}
            alt={order.Product?.name || 'Product'}
            className="object-contain rounded-md"
          />
        </div>
        {/* Rest of the order details similar to AllOrders component */}
        {/* ... */}
      </div>
    </div>
  );
};

export default SingleOrder;
