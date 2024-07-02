const orders = [
  {
    id: 1,
    image: "https://example.com/product1.jpg",
    address: "123 Main Street, Anytown USA",
    date: "2023-06-08",
    price: 49.99,
  },
  {
    id: 2,
    image: "https://example.com/product2.jpg",
    address: "456 Elm Road, Othertown USA",
    date: "2023-06-10",
    price: 79.99,
  },
];

const AllOrders = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={order.image}
              alt="Product"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="mb-2">
              <h2 className="text-lg font-bold">Delivery Address</h2>
              <p>{order.address}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg font-bold">Order Date</h2>
              <p>{order.date}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold">Total Price</h2>
              <p>${order.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
