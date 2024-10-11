/*
import React, { useEffect, useState } from 'react';


const Home = () => {

//    useState realEstates, setRealEstates პირველი არის სტეიტი რომელიც არის მხოლოდ წაკითხვადი, მეორე set ფუქნცით ვწერთ მასში ან ვააფდეითებთ 
    const [realEstates, setRealEstates] = useState([]);   //  წამოღებული დატას შესანახად
    const [loading, setLoading] = useState(true);   // სანამ რაიმეს დაგვიბრუნებს რექუესთი მანამდე ლოადინგისთვის
    const [error, setError] = useState(null); // ერრორის შემთხვევაში 
  

    // useEffect არის ფუნქცია რომელიც ეშვება კომპონტეტის ჩატვირთვისას (ანუ როცა ფეიჯს გახნის მომხარებელი, და შიგნით რა ფუნქციონალიც არის ის გაეშვება მაგ დროს )
    useEffect(() => {
        const fetchRealEstates = async () => {
            //  თრაი ქეჩ ბლოკი
            try {
//  ვცდლიობთ წამოვიღოთ ინფომრაცია 
                const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
                    method: 'GET',  // მეთოდის სახელი 
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer 9cffe165-16cb-4f9b-b1ea-58179f807b77' // ვატანთ გასაღებს რაც სვაგერშიც გვჭირდება
                    }
                });
                // თუ დაერორდა 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // ვანიჭებთ დეტას 
                setRealEstates(data);
                // ვლოგავთ დეტას
                console.log(data);  
            } catch (error) {
                setError(error);
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false);
            }
        };
//  ვუშვებთ ფუქნცია ჩატვირთვის თანავე
        fetchRealEstates();
    }, []);  
//  დეპენდეცი არრაი აქვს, აუცილებლად ყოველ უსეფექტს მეორე პარამეტრად უნდა ქონეს ცარიელი [] ან შიგნით რაიმე დეფენდენცი 

//  ლოადინგის დროს გამოვა ეს 
    if (loading) return <p>Loading...</p>;
    //ერრორის დროს გამოვა ეს 
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Real Estates</h1>
            <ul>
                {realEstates.map((estate) => (
                    <li key={estate.id}>{estate.address}</li>
                    
                ))}
            </ul>
        </div>
    );
};

export default Home;

*/

import React, { useEffect, useState } from "react";
import "../CSS/index.css"; // Adjust the path if needed
import Icon from "../Icons/location-marker.svg";
import Bed from "../Icons/bed.png";
import Vector from "../Icons/Vector.png";
import Vector2 from "../Icons/Vector2.png";




const Home = () => {
  const [realEstates, setRealEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer 9cffe165-16cb-4f9b-b1ea-58179f807b77",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRealEstates(data);
        console.log(data);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealEstates();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <>
      <div className="filter-container">
        <div className="filter-Region">
          <p>რეგიონი</p>
        </div>
        <div className="filter-price">
          <p>საფასო კატეგორია</p>
        </div>
        <div className="filter-area">
          <p>ფართობი</p>
        </div>
        <div className="filter-bedroom">
          <p>საძინებლების რაოდენობა</p>
        </div>
      </div>
      <div className="container">
        {realEstates.length === 0 ? (
          <p className="no-estates">No real estates found.</p>
        ) : (
          <div className="estate-list">
            {realEstates.map((estate) => (
              <div key={estate.id} className="estate-card">
                <img
                  src={estate.image}
                  alt={estate.address}
                  className="estate-image"
                />
                <div className="overlay">
                  <p className="status">
                    {estate.is_rental === 0 ? "იყიდება" : "ქირავდება"}
                  </p>
                </div>
                <div className="estate-details">
                  <div className="price-address-location">
                    <h2 className="price-tag">
                      {estate.price.toLocaleString().replace(/,/g, " ")} ლ
                    </h2>

                    <p className="address">
                      <img src={Icon} alt="address Icon" className="icon" />
                      {estate.city.name}, {estate.address}
                    </p>
                  </div>

                  <div className="property-info">
                    <div className="bed-container">
                      <p className="bedroom">
                        <img src={Bed} alt="Bedroom Icon" className="icon" />
                        {estate.bedrooms}
                      </p>
                    </div>
                    <div className="area-container">
                      <p className="area">
                        <img src={Vector} alt="Area Icon" className="icon" />
                        {estate.area} მ²
                      </p>
                    </div>
                    <div className="zip-container">
                      <p className="zipcode">
                        <img
                          src={Vector2}
                          alt="Zipcode Icon"
                          className="icon"
                        />
                        {estate.zip_code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  ); 
};

export default Home;
