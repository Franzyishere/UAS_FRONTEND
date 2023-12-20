// Dashboard.js

import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import ImageSlider from '../components/ImageSLider';

import Chart1Image from '../components/asset/chart-valo.jpeg';
import Chart2Image from '../components/asset/chart-ml.jpeg';
import Chart3Image from '../components/asset/chart-coc.webp';
import Chart4Image from '../components/asset/chart-pubg.jpeg';

import slider1 from '../components/asset/banner-clash-royal-s.png';
import slider2 from '../components/asset/banner-coc.png';
import slider3 from '../components/asset/banner-cs2-s.png';
import slider4 from '../components/asset/banner-ff-s.jpg';
import slider5 from '../components/asset/banner-gusion-s.jpg';
import slider6 from '../components/asset/banner-pubg-s.jpg';
import slider7 from '../components/asset/banner-valo-s.jpg';

const sliderImages = [
  slider1,
  slider2,
  slider3,
  slider4,
  slider5,
  slider6,
  slider7,
  // Tambahkan gambar lain sesuai kebutuhan
];


class ChartSection extends React.Component {
  render() {
    const { chartNumber, content, imageUrl } = this.props;
    return (
      <div className="chart">
        <img src={imageUrl} alt={`Chart ${chartNumber}`} />
        <p>{content}</p>
        <Link to="/order">
        <button className="top-up-button">Top Up</button>
        </Link>
      </div>
    );
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        {/* Navbar Header */}
        <Navbar />
        {/* Banner Slider */}
        <ImageSlider images={sliderImages} />
        

        {/* Charts with Top Up Buttons */}
        <div className="chart-section">
          <ChartSection chartNumber={1} content="Valorant" imageUrl={Chart1Image} />
          <ChartSection chartNumber={2} content="Mobile Legends Bang Bang" imageUrl={Chart2Image} />
          <ChartSection chartNumber={3} content="Clash of Clans" imageUrl={Chart3Image} />
          <ChartSection chartNumber={4} content="PUBG Mobile" imageUrl={Chart4Image} />
          <ChartSection chartNumber={1} content="Valorant" imageUrl={Chart1Image} />
          <ChartSection chartNumber={2} content="Mobile Legends Bang Bang" imageUrl={Chart2Image} />
          <ChartSection chartNumber={3} content="Clash of Clans" imageUrl={Chart3Image} />
          <ChartSection chartNumber={4} content="PUBG Mobile" imageUrl={Chart4Image} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
