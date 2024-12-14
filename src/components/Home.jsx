/*

//React is NOT the DOM, but a library that efficiently manages DOM updates
//Nodes are objects in the DOM tree
//React uses a Virtual DOM to optimize rendering performance


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

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [isRegionClicked, setIsRegionClicked] = useState(false);

  const [isActiveDropdown, setIsActiveDropdown] = useState(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isEditingMinPrice, setIsEditingMinPrice] = useState(false);
  const [isEditingMaxPrice, setIsEditingMaxPrice] = useState(false);

  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [isEditingMinArea, setIsEditingMinArea] = useState(false);
  const [isEditingMaxArea, setIsEditingMaxArea] = useState(false);

  const [RealEstatesCpy2, setRealEstatesCpy2] = useState([]);
  const [RealEstatesCpy, setRealEstatesCpy] = useState([]); //state to hold the filtered result
  const priceRanges = [50000, 100000, 150000, 200000, 300000, 500000];
  const areaRanges = [50, 100, 150, 200, 300, 500];
  const bedrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const [filteredEstates, setfilteredEstates] = useState([]);
  const [filteredRegionEstates, setfilteredRegionEstates] = useState([]);
  const [isRegionChooseButtonClicked, setIsRegionChooseButtonClicked] =
    useState(false);
  const [isPriceChooseButtonClicked, setIsPriceChooseButtonClicked] =
    useState(false);
  const [isBedroomChooseButtonClicked, setIsBedroomChooseButtonClicked] =
    useState(false);
  const [isAreaChooseButtonClicked, setIsAreaChooseButtonClicked] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [invalidPrice, setInvalidPrice] = useState(false);

  const [bedroomClickedIndex, setBedroomClickedIndex] = useState(null);
  const [invalidArea, setInvalidArea] = useState(false);

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
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok, real Estates");
        }

        const data = await response.json();
        setRealEstates(data);
        setRealEstatesCpy(data);
        setRealEstatesCpy2(data);

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

  //----------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
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
      console.log("Regions fetched: ", data);
    } catch (error) {
      setErrorRegions(error);
      console.error("Error fetching regions:", error);
    } finally {
      setLoadingRegions(false); // End loading for regions
    }
  };

  const handleRegionCheckboxChange = (regionId) => {
    setRealEstatesCpy(RealEstatesCpy2);
    setSelectedRegions((prevSelected) => {
      const newSelected = prevSelected.includes(regionId)
        ? prevSelected.filter((id) => id !== regionId) // Remove if already selected
        : [...prevSelected, regionId]; // Add if not selected

      // Log the currently selected region IDs
      console.log("Selected Region IDs:", newSelected);
      return newSelected;
    });
  };

  //-----------------------------------------------------------------------------------
  const applyFilters = () => {
    if (parseInt(minPrice, 10) > parseInt(maxPrice, 10)) {
      setInvalidPrice(true);
      return;
    } else {
      setInvalidPrice(false);
    }

    if (parseInt(minArea, 10) > parseInt(maxArea, 10)) {
      setInvalidArea(true);
      return;
    } else {
      setInvalidArea(false);
    }
    let baseEstates = RealEstatesCpy2;

    // Filter by region if selected
    if (selectedRegions.length > 0) {
      baseEstates = baseEstates.filter((estate) => {
        const regionId = estate.city.region_id;
        return selectedRegions.includes(regionId);
      });
    }

    // Filter by price
    const minPriceNum = parseInt(minPrice, 10);
    const maxPriceNum = parseInt(maxPrice, 10);
    if (!isNaN(minPriceNum) || !isNaN(maxPriceNum)) {
      baseEstates = baseEstates.filter((estate) => {
        const estatePrice = estate.price;
        const isAboveMin = !isNaN(minPriceNum)
          ? estatePrice >= minPriceNum
          : true;
        const isBelowMax = !isNaN(maxPriceNum)
          ? estatePrice <= maxPriceNum
          : true;
        return isAboveMin && isBelowMax;
      });
    }

    // Filter by area
    const minAreaNum = parseInt(minArea, 10);
    const maxAreaNum = parseInt(maxArea, 10);
    if (!isNaN(minAreaNum) || !isNaN(maxAreaNum)) {
      baseEstates = baseEstates.filter((estate) => {
        const estateArea = estate.area;
        const isAboveMinArea = !isNaN(minAreaNum)
          ? estateArea >= minAreaNum
          : true;
        const isBelowMaxArea = !isNaN(maxAreaNum)
          ? estateArea <= maxAreaNum
          : true;
        return isAboveMinArea && isBelowMaxArea;
      });
    }

    // Filter by bedrooms
    if (bedroomClickedIndex !== null) {
      baseEstates = baseEstates.filter((estate) => {
        return estate.bedrooms === bedroomClickedIndex + 1;
      });
    }

    // Update the state with the filtered results
    setRealEstates(baseEstates);
  };
  //------------------------------------------------------------------------------------------------------
  // Refactored Region Filter
  const handleFilterByRegion = () => {
    setIsRegionChooseButtonClicked(true);
    applyFilters();
    setIsRegionChooseButtonClicked(false);
  };

  // Refactored Price Filter
  const handlePriceCategoryChooseClick = () => {
    setIsPriceChooseButtonClicked(true);
    applyFilters();
    setIsPriceChooseButtonClicked(false);
  };

  // Refactored Area Filter
  const handleAreaChooseClick = () => {
    setIsAreaChooseButtonClicked(true);
    applyFilters();
    setIsAreaChooseButtonClicked(false);
  };

  // Refactored Bedroom Filter
  const handleBedroomChooseButtonClick = () => {
    setIsBedroomChooseButtonClicked(true);
    applyFilters();
    setIsBedroomChooseButtonClicked(false);
  };

  //----------------------------------------------------------------------------------------------------------------------------
  if (loadingRealEstates)
    return <p className="loading">Loading real estates...</p>;
  if (errorRealEstates)
    return <p className="error">Error: {errorRealEstates.message}</p>;

  const handleRegionClick = () => {
    if (isActiveDropdown !== "region") {
      setIsActiveDropdown("region");
    } else {
      setIsActiveDropdown("null");
    }

    // Fetch regions if they haven't been fetched yet
    if (regions.length === 0) {
      fetchRegions();
      console.log("Fetching regions...");
    }
  };

  /*----es aris imistvis, rom mxolod erti filtris fanjara gaixsnas--------*/
  const handleDropdownClick = (dropdown) => {
    if (isActiveDropdown === dropdown) {
      setIsActiveDropdown(null);
    } else {
      setIsActiveDropdown(dropdown);
    }
  };
  /*----------------------------------------------------------------------*/

  /*----------------------------------------------------------------------*/
  const handleMinPriceClick = () => {
    console.log("handle min price click");
    setIsEditingMinPrice(true);
  };

  const handleMaxPriceClick = () => {
    console.log("handle max price click");
    setIsEditingMaxPrice(true);
  };

  const handleMinAreaClick = () => {
    setIsEditingMinArea(true);
  };

  const handleMaxAreaClick = () => {
    setIsEditingMaxArea(true);
  };

  //------------------------------------------------------------------------------------

  // Your handler function should look like this
  const handleMinPriceChange = (event) => {
    const valueMinPrice = event.target.value; // Get the value from the event target
    setMinPrice(valueMinPrice); // Update the state with the new value
    setInvalidPrice(false);
  };

  const handleMaxPriceChange = (event) => {
    const valueMaxPrice = event.target.value; // Get the value from the event target
    setMaxPrice(valueMaxPrice); // Update the state with the new value
    setInvalidPrice(false);
  };

  const handleMinPriceListClick = (index) => {
    console.log("minPrice is " + priceRanges[index]);
    setMinPrice(priceRanges[index]);
    setInvalidPrice(false);
  };

  const handleMaxPriceListClick = (index) => {
    console.log("maxPrice is " + priceRanges[index]);
    setMaxPrice(priceRanges[index]);
    setInvalidPrice(false);
  };

  const handleMinAreaChange = (event) => {
    const valueMinArea = event.target.value; // Get the value from the event target
    setMinArea(valueMinArea); // Update the state with the new value
    setInvalidArea(false);
  };

  const handleMaxAreaChange = (event) => {
    const valueMaxArea = event.target.value; // Get the value from the event target
    setMaxArea(valueMaxArea); // Update the state with the new value
    setInvalidArea(false);
  };

  const handleMinAreaListClick = (index) => {
    console.log("minArea is " + areaRanges[index]);
    setMinArea(areaRanges[index]);
    setInvalidArea(false);
  };

  const handleMaxAreaListClick = (index) => {
    console.log("maxArea is " + areaRanges[index]);
    setMaxArea(areaRanges[index]);
    setInvalidArea(false);
  };

  function handleBedroomListClick(bedroom, index) {
    setBedroomClickedIndex(index);
    let bedroomInt = parseInt(bedroom, 10);
    console.log("   bedroom  " + bedroom + "  index  " + index);
  }

  /*----------------------------------------------------------------------*/
  return (
    <>
      <div className="filter-container">
        <div
          className={`filter-Region ${
            isActiveDropdown === "region" ? "clicked" : ""
          }`}
          onClick={handleRegionClick}
        >
          <p className="paragraph-Region">რეგიონი</p>
          <img
            src={Filter_Icon}
            alt="Filter Icon"
            className={`filter_Icon ${
              isRegionClicked ? "reverse-when-clicked" : ""
            }`}
          />
        </div>

        {isActiveDropdown === "region" && (
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
                <button
                  className="choose-button"
                  onClick={handleFilterByRegion}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`filter-price-category ${
            isActiveDropdown === "price" ? "clicked" : ""
          }`}
          onClick={() => handleDropdownClick("price")}
        >
          <p className="paragraph-Price-Category">საფასო კატეგორია</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>

        {isActiveDropdown === "price" && (
          <div className="main-container-price-category-filter">
            <div className="price-category-dropdown-inside-content">
              <div className="first-inner-container">
                <h3 className="price-category-header">ფასის მიხედვით</h3>

                <div className="price-placement-container">
                  <div
                    className={`price-placement ${invalidPrice ? "error" : ""}`}
                    onClick={handleMinPriceClick}
                  >
                    <div className="inner-price-placement">
                      {isEditingMinPrice ? (
                        <input
                          type="number"
                          value={minPrice}
                          onChange={handleMinPriceChange}
                          className="min-price-input"
                          autoFocus
                          //       onBlur={handleBlurMin}
                        />
                      ) : (
                        <>
                          <p className="price-paragraph">
                            {minPrice ? minPrice : "დან"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className={`price-placement ${invalidPrice ? "error" : ""}`}
                  >
                    <div
                      className="inner-price-placement"
                      onClick={handleMaxPriceClick}
                    >
                      {isEditingMaxPrice ? (
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={handleMaxPriceChange}
                          className="min-price-input"
                          autoFocus
                          //     onBlur={handleBlurMax}
                        />
                      ) : (
                        <>
                          <p className="price-paragraph">
                            {maxPrice ? maxPrice : "მდე"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {invalidPrice && (
                  <div className="alert">
                    <p>ჩაწერეთ ვალიდური მონაცემები</p>
                  </div>
                )}

                <div className="price-range-container">
                  <div className="price-range-inner-container">
                    <h4 className="header-price-range">მინ. ფასი</h4>
                    <ul className="price-range-list">
                      {priceRanges.map((price, index) => (
                        <li
                          key={index}
                          className="price-range-item"
                          onClick={() => handleMinPriceListClick(index)}
                        >
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
                    <ul className="price-range-list">
                      {priceRanges.map((price, index) => (
                        <li
                          key={index}
                          className="price-range-item"
                          onClick={() => handleMaxPriceListClick(index)}
                        >
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
                <button
                  id="2"
                  className="choose-button"
                  onClick={handlePriceCategoryChooseClick}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`filter-area ${
            isActiveDropdown === "area" ? "clicked" : ""
          }`}
          onClick={() => handleDropdownClick("area")}
        >
          <p className="paragraph-area">ფართობი</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>
        {isActiveDropdown === "area" && (
          <div className="main-container-Area-category-filter">
            <div className="area-category-dropdown-inside-content">
              <div className="area-first-inner-container">
                <h3 className="area-header">ფართობის მიხედვით</h3>
                <div className="area-placement-container">
                  <div
                    className={`area-placement ${invalidArea ? "error" : ""}`}
                    onClick={handleMinAreaClick}
                  >
                    <div className="inner-area-placement">
                      {isEditingMinArea ? (
                        <input
                          type="number"
                          value={minArea}
                          onChange={handleMinAreaChange}
                          className="min-area-input"
                          autoFocus
                        />
                      ) : (
                        <>
                          <p className="area-paragraph">
                            {minArea ? minArea : "დან"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className={`area-placement ${invalidArea ? "error" : ""}`}
                    onClick={handleMaxAreaClick}
                  >
                    <div className="inner-area-placement">
                      {isEditingMaxArea ? (
                        <input
                          type="number"
                          value={maxArea}
                          onChange={handleMaxAreaChange}
                          className="max-area-input"
                          autoFocus
                        />
                      ) : (
                        <>
                          <p className="area-paragraph">
                            {maxArea ? maxArea : "მდე"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {invalidArea && (
                  <div className="alert">
                    <p>ჩაწერეთ ვალიდური მონაცემები</p>
                  </div>
                )}

                <div className="area-range-container">
                  <div className="area-range-inner-container">
                    <h4 className="header-area-range">მინ. ფართობი</h4>
                    <ul className="area-range-list">
                      {areaRanges.map((area, index) => (
                        <div
                          key={index}
                          className="area-range-list-item-container"
                          onClick={() => handleMinAreaListClick(index)} //იქმნება ანონიმური ფუნქცია, რომელიც გამოიძახება მაშინ როდესაც დავაკლიკებთ
                        >
                          <li className="area-range-item">
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
                  <div className="area-range-inner-container">
                    <h4 className="header-area-range">მაქს. ფართობი</h4>
                    <ul className="area-range-list">
                      {areaRanges.map((area, index) => (
                        <div
                          key={index}
                          className="area-range-list-item-container"
                          onClick={() => handleMaxAreaListClick(index)}
                        >
                          <li className="area-range-item">
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
                <button
                  className="choose-button-area"
                  onClick={handleAreaChooseClick}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`filter-bedroom ${
            isActiveDropdown === "bedroom" ? "clicked" : ""
          }`}
          onClick={() => handleDropdownClick("bedroom")}
        >
          <p className="paragraph-bedroom">საძინებლების რაოდენობა</p>
          <img src={Filter_Icon} alt="Filter Icon" className="filter_Icon" />
        </div>

        {isActiveDropdown === "bedroom" && (
          <div className="bedroom-filter-main-container">
            <div className="bedroom-filter-inner-container">
              <h3 className="bedroom-filter-header">საძინებლების რაოდენობა</h3>
              <div className="bedroom-container">
                {bedrooms.map((bedroom, index) => (
                  <div
                    key={index}
                    className={`bedrooms ${
                      bedroomClickedIndex === index ? "clicked" : ""
                    }`}
                    onClick={() => handleBedroomListClick(bedroom, index)}
                  >
                    <p className="bedroom-paragraph">
                      {bedroom.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bedroom-choose-button-container">
              <button
                className="choose-button"
                onClick={handleBedroomChooseButtonClick}
              >
                არჩევა
              </button>
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
