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
import "../CSS/fonts.css";
import "../CSS/index.css"; // Adjust the path if needed
import Icon from "../Icons/location-marker.svg";
import Bed from "../Icons/bed.png";
import Vector from "../Icons/Vector.png";
import Vector2 from "../Icons/Vector2.png";
import Filter_Icon from "../Icons/arrow_for_filter.png";
import GEL_Icon from "../Icons/GEL1.png";

const Home = () => {
  const [realEstates, setRealEstates] = useState([]);
  const [loadingRealEstates, setLoadingRealEstates] = useState(true);
  const [errorRealEstates, setErrorRealEstates] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(false); // Initially set to false
  const [errorRegions, setErrorRegions] = useState(null);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [isPriceCategoryDropdownOpen, setIspriceCategoryDropdownOpen] =
    useState(false);
  const [isAreaDropdownOpen, setIsAreaDrowpdownOpen] = useState(false);
  const [isBedroomDropdownOpen, setIsBedroomDropdownOpen] = useState(false);
  const priceRanges = [50000, 100000, 150000, 200000, 300000, 500000];
  const areaRanges = [50, 100, 150, 200, 300, 500];

  //const [stateVariable, setStateVariable] = useState([initialValue])
  //stateVariable aris exlandeli value.
  //setStateVariable aris funqcia romlitac vaupdatebt states
  //initialValue aris tu riti daviwyot state, chven shemtxvevashi aris carieli masivi []
  //selectedRegions aris cvladi, romelic sheinaxavs regionis Id ebs
  //selectedRegions gvaqvs carieli masivi, rac nishnavs, rom arcerti regioni ar aris archeuli
  //roca checkboxebs movnishnavt, am masivshi chaiwereba id ebi selectedRegionshi
  //setSelectedRegions, aris funqcia romelic unda gamoviyenot selectedeRegions dasaapdeiteblad.
  //am funqcias davudzaxebt tu ramis shecvla gvinda selectedRegions masivshi
  // [] carieli masivi useStates argumentad nishnavs, rom rodesac komponenti pirvelad darenderdeba, araferi ar aris archeuli

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
          throw new Error("Network response was not ok, real Estates");
        }

        const data = await response.json();
        setRealEstates(data);
        console.log(data);
      } catch (error) {
        setErrorRealEstates(error);
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoadingRealEstates(false);
      }
    };

    fetchRealEstates();
  }, []);

  const fetchRegions = async () => {
    setLoadingRegions(true); // Start loading for regions
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer 9cffe165-16cb-4f9b-b1ea-58179f807b77",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not okay, Regions");
      }

      const data = await response.json();
      setRegions(data);
      console.log(data);
    } catch (error) {
      setErrorRegions(error);
      console.error("Error fetching regions:", error);
    } finally {
      setLoadingRegions(false); // End loading for regions
    }
  };

  //-------------------function_to_save_region_ids_that_are_checked-------------------------------------------
  const handleRegionCheckboxChange = (regionId) => {
    //function parametre is regionId
    setSelectedRegions((prevSelected) => {
      //prevSelected is a parameter of setSelectedRegion function to accsess the previous state
      const newSelected = prevSelected.includes(regionId)
        ? prevSelected.filter((id) => id !== regionId) // Remove if already selected
        : [...prevSelected, regionId]; // Add if not selected

      // Log the currently selected region IDs
      console.log("Selected Region IDs:", newSelected);
      return newSelected;
    });
  };
  //-----------------------------------------------------------------------------------------------------------

  if (loadingRealEstates)
    return <p className="loading">Loading real estates...</p>;
  if (errorRealEstates)
    return <p className="error">Error: {errorRealEstates.message}</p>;

  //if (loadingRegions) return <p className="loading">Loading regions...</p>;
  //if (errorRegions) return <p className="error">Error: {errorRegions.message}</p>

  const handleRegionClick = () => {
    if (!isRegionDropdownOpen) {
      fetchRegions();
      console.log("clicked on region");
    }
    setIsRegionDropdownOpen((prev) => !prev);
  };

  const handlePriceCategoryClick = () => {
    if (!isPriceCategoryDropdownOpen) {
      console.log("clicked on price category");
    }
    setIspriceCategoryDropdownOpen((prev) => !prev);
  };

  const handleAreaClick = () => {
    if (!isAreaDropdownOpen) {
      //if true, because we gave it  value of false in useState
      console.log("clicked on Area");
    }
    setIsAreaDrowpdownOpen((prev) => !prev);
  };

  const handleBedroomClick = () => {
    if (!isBedroomDropdownOpen) {
      console.log("clicked on Bedroom");
    }
    setIsBedroomDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div className="filter-container">
        <div className="filter-Region" onClick={handleRegionClick}>
          <p className="paragraph-Region">რეგიონი</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>

        {isRegionDropdownOpen && (
          <div className="region-dropdown">
            <div className="region-dropdown-inside-content">
              <div className="region-header-container">
                <h3 className="region-header">რეგიონის მიხედვით</h3>
              </div>

              {loadingRegions ? (
                <p className="loading-message">Loading regions...</p>
              ) : errorRegions ? (
                <p className="error-message">Error: {errorRegions.message}</p>
              ) : (
                <div className="checkbox-container">
                  {regions.map((region) => (
                    <div
                      key={region.id}
                      className="region-item"
                      role="option"
                      tabIndex="0"
                    >
                      <label className="region-label">
                        <input
                          type="checkbox"
                          value={region.id}
                          className="region-checkbox"
                          checked={selectedRegions.includes(region.id)}
                          onChange={() => handleRegionCheckboxChange(region.id)}
                        />
                        <span className="region-name">{region.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div className="choose-button-container">
                <button className="choose-button">არჩევა</button>
              </div>
            </div>
          </div>
        )}

        <div
          className="filter-price-category"
          onClick={handlePriceCategoryClick}
        >
          <p className="paragraph-Price-Category">საფასო კატეგორია</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>

        {isPriceCategoryDropdownOpen && (
          <div className="main-container-price-category-filter">
            <div className="price-category-dropdown-inside-content">
              <div className="first-inner-container">
                <h3 className="price-category-header">ფასის მიხედვით</h3>
                <div className="price-placement-container">
                  <div className="price-placement">
                    <div className="inner-price-placement">
                      <p className="price-paragraph">დან</p>
                      <img
                        src={GEL_Icon}
                        alt="price-icon"
                        className="GEL_Icon"
                      ></img>
                    </div>
                  </div>
                  <div className="price-placement">
                    <div className="inner-price-placement">
                      <p className="price-paragraph">დან</p>
                      <img
                        src={GEL_Icon}
                        alt="price-icon"
                        className="GEL_Icon"
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="price-range-container">
                  <div className="price-range-inner-container">
                    <h4 className="header-price-range">მინ. ფასი</h4>
                    <ul class="price-range-list">
                      {priceRanges.map((price, index) => (
                        <li key={index} className="price-range-item">
                          {price.toLocaleString()}
                          <img
                            src={GEL_Icon}
                            alt="price-icon"
                            className="GEL_Icon2"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="price-range-inner-container">
                    <h4 className="header-price-range">მაქს. ფასი</h4>
                    <ul class="price-range-list">
                      {priceRanges.map((price, index) => (
                        <li key={index} className="price-range-item">
                          {price.toLocaleString()}
                          <img
                            src={GEL_Icon}
                            alt="price-icon"
                            className="GEL_Icon2"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="choose-button-container">
                <button className="choose-button">არჩევა</button>
              </div>
            </div>
          </div>
        )}

        <div className="filter-area" onClick={handleAreaClick}>
          <p className="paragraph-area">ფართობი</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>
        {isAreaDropdownOpen && (
          <div className="main-container-Area-category-filter">
            <div className="price-category-dropdown-inside-content">
              <div className="first-inner-container">
                <h3 className="price-category-header">ფართობის მიხედვით</h3>
                <div className="price-placement-container">
                  <div className="price-placement">
                    <div className="inner-price-placement">
                      <p className="price-paragraph">დან</p>
                      <div className="square-meters-container">
                        <p>მ</p>
                        <sup className="square-meters">2</sup>
                      </div>
                    </div>
                  </div>
                  <div className="price-placement">
                    <div className="inner-price-placement">
                      <p className="price-paragraph">დან</p>
                      <div className="square-meters-container">
                        <p>მ</p>
                        <sup className="square-meters">2</sup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="price-range-container">
                  <div className="price-range-inner-container">
                    <h4 className="header-price-range">მინ. ფართობი</h4>
                    <ul class="area-range-list">
                      {areaRanges.map((area, index) => (
                        <div className="price-range-list-item-container">
                          <li key={index} className="price-range-item">
                            {area.toLocaleString()}
                            <div className="square-meters-container">
                              <p>მ</p>
                              <sup className="square-meters">2</sup>
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className="price-range-inner-container">
                    <h4 className="header-price-range">მაქს. ფართობი</h4>
                    <ul class="area-range-list">
                      {areaRanges.map((area, index) => (
                        <div className="price-range-list-item-container">
                          <li key={index} className="price-range-item">
                            {area.toLocaleString()}
                            <div className="square-meters-container">
                              <p>მ</p>
                              <sup className="square-meters">2</sup>
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="choose-button-container">
                <button className="choose-button">არჩევა</button>
              </div>
            </div>
          </div>
        )}

        <div className="filter-bedroom" onClick={handleBedroomClick}>
          <p className="paragraph-bedroom">საძინებლების რაოდენობა</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>

        {isBedroomDropdownOpen && (
          <div className="bedroom-filter-main-container">
            <div className="bedroom-filter-inner-container">
              <h3 className="bedroom-filter-header">საძინებლების რაოდენობა</h3>
              <div className="bedrooms">
                <p>1</p>
                <p>2</p>
              </div>
            </div>

            <div className="bedroom-choose-button-container">
              <button className="choose-button">არჩევა</button>
            </div>
          </div>
        )}
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
