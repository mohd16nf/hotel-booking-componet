import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaUserFriends, FaPlus, FaMinus } from 'react-icons/fa';
import '../App.css'; // Import the CSS file

const Booking = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pricePerNight = 10000; // Updated price per night
  const maxGuests = 8;
  const extraGuestCharge = 1000;

  const handleGuestChange = (type, operation) => {
    if (type === 'adults') {
      setAdults(prev => Math.max(0, prev + (operation === 'increment' ? 1 : -1)));
    } else if (type === 'children') {
      setChildren(prev => Math.max(0, prev + (operation === 'increment' ? 1 : -1)));
    } else if (type === 'pets') {
      setPets(prev => Math.max(0, prev + (operation === 'increment' ? 1 : -1)));
    }
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalGuests = adults + children + pets;
    const extraGuests = totalGuests > maxGuests ? totalGuests - maxGuests : 0;
    const extraCharge = extraGuests * extraGuestCharge * diffDays;
    return (pricePerNight * diffDays) + extraCharge;
  };

  const calculateNightlyCharge = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return pricePerNight * diffDays;
  };

  const calculateExtraGuestCharge = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalGuests = adults + children + pets;
    const extraGuests = totalGuests > maxGuests ? totalGuests - maxGuests : 0;
    return extraGuests * extraGuestCharge * diffDays;
  };

  return (
    <div className="booking-container">
      <div className="price-info">
        <p className="price">₹10000 / night</p> {/* Updated price display */}
        <p className="guest-info">Max 8 guests, extra guest will cost ₹1000 per head per night</p>
      </div>
      <div className="input-group">
        <div className="input-wrapper">
          <FaCalendarAlt className="icon" />
          <DatePicker
            selected={checkInDate}
            onChange={date => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={new Date()}
            placeholderText="Check-in Date"
            className="input input3"
          />
          <DatePicker
            selected={checkOutDate}
            onChange={date => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate}
            placeholderText="Check-out Date"
            className="input input4"
          />
        </div>
        <div className="input-wrapper">
          <FaUserFriends className="icon" />
          <div className="input2 input" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {adults} Adults, {children} Children, {pets} Pets
          </div>
          {isDropdownOpen && (
            <div className="dropdown">
              <div className="guest-type">
                <span>Adults:</span>
                <FaMinus onClick={() => handleGuestChange('adults', 'decrement')} />
                <span>{adults}</span>
                <FaPlus onClick={() => handleGuestChange('adults', 'increment')} />
              </div>
              <div className="guest-type">
                <span>Children:</span>
                <FaMinus onClick={() => handleGuestChange('children', 'decrement')} />
                <span>{children}</span>
                <FaPlus onClick={() => handleGuestChange('children', 'increment')} />
              </div>
              <div className="guest-type">
                <span>Pets:</span>
                <FaMinus onClick={() => handleGuestChange('pets', 'decrement')} />
                <span>{pets}</span>
                <FaPlus onClick={() => handleGuestChange('pets', 'increment')} />
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => alert(`Total Price: ₹${calculateTotalPrice()}`)}
        className="submit-button"
      >
        Submit
      </button>
      <div className="booking-details">
        <p>Nightly Charges: ₹{calculateNightlyCharge()}</p>
        <p>Extra Guest Charges: ₹{calculateExtraGuestCharge()}</p>
        <h4 className='total-amount'>Total Price: ₹{calculateTotalPrice()}</h4>
      </div>
    </div>
  );
};

export default Booking;
