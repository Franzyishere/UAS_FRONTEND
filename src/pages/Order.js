// OrderPage.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ML from '../components/asset/chart-ml.jpeg';
import axios from 'axios';
import './OrderPage.css'; // Import CSS untuk styling

const OrderPage = () => {
  const navigate = useNavigate();
  const [idPlayer, setIdPlayer] = useState('');
  const [idServer, setIdServer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleSubmit = async () => {
    try {
      if (selectedBox) {
        // Split nilai dari selectedBox untuk mendapatkan nilai Diamonds dan Harga
        const [diamonds] = selectedBox.split(' - ');

        // Kirim data ke server untuk order admin
        const response = await axios.post('http://localhost:8080/admin/create/order', {
          id_player: idPlayer,
          id_server: idServer,
          total_pembayaran: diamonds,
          metode_pembayaran: paymentMethod,
        });

        // Mendapatkan data order yang baru saja ditambahkan
        const newOrder = response.data.data;

        // Tambahkan order ke halaman Admin
        // Pastikan bahwa respons dari server sesuai dengan struktur data order yang diharapkan
        addOrderToAdminPage(newOrder);

        // Tambahkan logika lain jika diperlukan setelah berhasil submit
        console.log('Order berhasil disimpan ke database');

        // Tampilkan alert kesuksesan
        alert('Order berhasil disimpan ke database');

        // Navigate ke halaman "/dashboard"
        navigate('/dashboard');
      } else {
        console.error('Tidak ada info-box yang dipilih');

        // Tampilkan alert kegagalan
        alert('Tidak ada info-box yang dipilih');
      }
    } catch (error) {
      console.error('Gagal menyimpan order ke database', error);

      // Tampilkan alert kegagalan
      alert('Gagal menyimpan order ke database');
    }
  };

  const addOrderToAdminPage = (newOrder) => {
    // Meneruskan data order ke fungsi addOrderFromUser di AdminPage
    window.parent.postMessage({ type: 'addOrderFromUser', order: newOrder }, '*');
  };

  const handleInfoBoxClick = (boxNumber) => {
    // Tambahkan logika atau perubahan state lainnya jika diperlukan
    setSelectedBox(getInfoBoxText(boxNumber));
  };

  const handlePaymentMethodChange = (method) => {
    let selectedPaymentMethod;
    switch (method) {
      case 'BRI':
        selectedPaymentMethod = 'BRI';
        break;
      case 'BCA':
        selectedPaymentMethod = 'BCA';
        break;
      default:
        selectedPaymentMethod = '';
    }
    setPaymentMethod(method);
    // Perbarui state selectedPaymentMethod
    setSelectedPaymentMethod(selectedPaymentMethod);
  };

  const getInfoBoxText = (boxNumber) => {
    // Fungsi ini akan mengembalikan teks dari info-box berdasarkan nomor box
    // Anda bisa menyesuaikannya dengan struktur HTML atau data yang sebenarnya
    switch (boxNumber) {
      case 1:
        return '5 Diamonds - Rp 1.450,-';
      case 2:
        return '12 Diamonds - Rp 3.450,-';
      case 3:
        return '19 Diamonds - Rp 5.440,-';
      case 4:
        return '28 Diamonds - Rp 7.900,-';
      case 5:
        return '44 Diamonds - Rp 11.700,-';
      case 6:
        return '59 Diamonds - Rp 15.700,-';
      case 7:
        return '85 Diamonds - Rp 22.700,-';
      case 8:
        return '86 Diamonds - Rp 22.600,-';
      case 9:
        return '170 Diamonds - Rp 45.500,-';
      case 10:
        return '172 Diamonds - Rp 45.300,-';
      case 11:
        return '240 Diamonds - Rp 64.300,-';
      case 12:
        return '257 Diamonds - Rp 67.250,-';
      // Tambahkan case lainnya sesuai kebutuhan
      default:
        return '';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="image-container">
          <img src={ML} alt="Large Image" />
          <div className="image-description">
            <h2>Mobile Legends</h2>
            <p>Top Up Diamond Mobile Legends</p>
            <p>1. Masukkan ID (Server)</p>
            <p>2. Pilih Nominal Diamond</p>
            <p>3. Pilih Metode Pembayaran</p>
            <p>4. Masukkan Nomor WhatsApp</p>
            <p>5. Klik Order Now & Lakukan Pembayaran</p>
            <p>6. Tunggu dan Diamond Akan Masuk Secara Otomatis</p>
          </div>
        </div>

        {/* Container untuk Form Inputan */}
        <div className="form-container">
          <h2>Data Akun</h2>
          <form>
            <input
              type="text"
              placeholder="Masukkan ID Player"
              value={idPlayer}
              onChange={(e) => setIdPlayer(e.target.value)}
            />
            <input
              type="text"
              placeholder="Masukkan ID Server"
              value={idServer}
              onChange={(e) => setIdServer(e.target.value)}
            />
          </form>
          <h2>Pilih Nominal</h2>
          <div className="info-box-container">
            {/* Box 1 */}
            <div className={`info-box ${selectedBox === getInfoBoxText(1) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(1)}>
              <p>5 Diamonds</p>
              <p>Rp 1.450,-</p>
            </div>
            {/* Box 2 */}
            <div className={`info-box ${selectedBox === getInfoBoxText(2) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(2)}>
              <p>12 Diamonds</p>
              <p>Rp 3.450,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(3) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(3)}>
              <p>19 Diamonds</p>
              <p>Rp 5.440,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(4) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(4)}>
              <p>28 Diamonds</p>
              <p>Rp 7.900,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(5) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(5)}>
              <p>44 Diamonds</p>
              <p>Rp 11.700,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(6) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(6)}>
              <p>59 Diamonds</p>
              <p>Rp 15.700,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(7) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(7)}>
              <p>85 Diamonds</p>
              <p>Rp 22.700,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(8) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(8)}>
              <p>86 Diamonds</p>
              <p>Rp 22.600,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(9) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(9)}>
              <p>170 Diamonds</p>
              <p>Rp 45.500,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(10) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(10)}>
              <p>172 Diamonds</p>
              <p>Rp 45.300,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(11) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(11)}>
              <p>240 Diamonds</p>
              <p>Rp 64.300,-</p>
            </div>
            <div className={`info-box ${selectedBox === getInfoBoxText(12) ? 'selected' : ''}`}
              onClick={() => handleInfoBoxClick(12)}>
              <p>257 Diamonds</p>
              <p>Rp 67.250,-</p>
            </div>
            
            {/* ... Tambahkan box lainnya sesuai kebutuhan */}
          </div>
           {/* Pilihan Metode Pembayaran */}
           <div className="payment-method-container">
            <h2>Pilih Metode Pembayaran</h2>
            <label>
              <input
                type="radio"
                value="BRI"
                checked={paymentMethod === 'BRI'}
                onChange={() => handlePaymentMethodChange('BRI')}
              />
              BRI
            </label>
            <label className={selectedPaymentMethod === 'BCA' ? 'selected' : ''}>
              <input
                type="radio"
                value="BCA"
                checked={paymentMethod === 'BCA'}
                onChange={() => handlePaymentMethodChange('BCA')}
              />
              BCA
            </label>
          </div>
          <button className='top-up-button' type="submit" onClick={handleSubmit}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
