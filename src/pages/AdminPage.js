// AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AdminPage.css';

const AdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [message, setm] = useState('');

  useEffect(() => {
    // Mengambil data order dari server saat komponen di-mount
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Mengambil data order dari server
      const response = await axios.get('http://localhost:8080/admin/order');     setm(response.data.messages);
      // Menyimpan data order ke dalam state
      setOrders(response.data.data);
    } catch (error) {
      console.error('Gagal mengambil data order:', error);
    }
  };

  const handleMarkAsDone = async (orderId) => {
    try {
      // Mengirim permintaan ke server untuk menandai order sebagai "selesai"
      await axios.put(`http://localhost:8080/admin/update/order/${orderId}`);

      // Mengupdate data order setelah menandai sebagai "selesai"
      fetchOrders();
    } catch (error) {
      console.error('Gagal menandai order sebagai selesai:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      // Mengirim permintaan ke server untuk menghapus order
      await axios.delete(`http://localhost:8080/admin/delete/order/${orderId}`);

      // Mengupdate data order setelah menghapus order
      fetchOrders();
    } catch (error) {
      console.error('Gagal menghapus order:', error);
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'addOrderFromUser') {
        // Panggil fungsi addOrderFromUser dengan data order yang diterima
        addOrderFromUser(event.data.order);
      }
    };

    // Menambahkan event listener untuk mendengarkan pesan
    window.addEventListener('message', handleMessage);

    // Membersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []); // Hapus addOrderFromUser dari dependencies karena tidak perlu di sini

  // Fungsi untuk menambahkan order baru dari pesan OrderPage.js ke daftar orders
  const addOrderFromUser = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <h2>Daftar Order</h2>
        <h5>{message}</h5>
        <table>
          <thead>
            <tr>
              <th>ID Order</th>
              <th>ID Player</th>
              <th>ID Server</th>
              <th>Total Pembayaran</th>
              <th>Metode Pembayaran</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.id_player}</td>
                  <td>{order.id_server}</td>
                  <td>{order.total_pembayaran}</td>
                  <td>{order.metode_pembayaran}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status !== 'Selesai' && (
                      <button onClick={() => handleMarkAsDone(order.id)}>Selesai</button>
                    )}
                    <button onClick={() => handleDeleteOrder(order.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
