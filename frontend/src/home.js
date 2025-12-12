import { useEffect, useState } from 'react';

const AllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const fetchContacts = async () => {
        try {
            const res = await fetch('https://ecom-2-dmmb.onrender.com/api/contactall');
            const data = await res.json();
            if (data.success) {
                setContacts(data.contacts);
            } else {
                alert('Failed to fetch contacts.');
            }
        } catch (err) {
            console.error('Error fetching contacts:', err);
            alert('Server error while fetching contacts.');
        } finally {
            setLoadingContacts(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch('https://ecom-2-dmmb.onrender.com/api/allorders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                alert('Failed to fetch orders.');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            alert('Server error while fetching orders.');
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        fetchContacts();
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            {/* Contact Section */}
            <h2>All Contact Submissions</h2>
            {loadingContacts ? (
                <p>Loading contacts...</p>
            ) : contacts.length === 0 ? (
                <p>No contact submissions found.</p>
            ) : (
                <table className="table table-bordered table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Submitted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.mobile}</td>
                                <td>{c.subject}</td>
                                <td>{c.message}</td>
                                <td>{new Date(c.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Order Section */}
            <h2 className="mt-5">All Orders</h2>
            {loadingOrders ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="table table-bordered table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Items</th>
                            <th>Placed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o, index) => (
                            <tr key={index}>
                                <td>{o.name}</td>
                                <td>{o.address}</td>
                                <td>{o.orderid}</td>
                                <td>₹{o.totalPrice}</td>
                                <td>
                                    <select className="form-control" multiple>
                                        {o.items.map((item, idx) => (
                                            <option key={idx} value={item.pname}>
                                                Name: {item.pname} | Price: ₹{item.tprice} | Qty: {item.pq}
                                            </option>
                                        ))}
                                    </select>

                                </td>
                                <td>{new Date(o.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllContacts;
