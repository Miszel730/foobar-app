import React, { useEffect, useState } from "react";
import "../../styles/pages/launch-order.scss";
import { useHistory } from "react-router";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const LaunchScreen = (props) => {
  useEffect(() => {
    startAnimation();
  }, []);

  const history = useHistory();
  const [orderResponse, setOrderResponse] = useState(
    props.location?.state?.orderResponse || []
  );
  console.log(orderResponse);

  function startAnimation() {
    let textTimeline = gsap.timeline({ repeat: 0 });
    textTimeline.to(".order-text", {
      duration: 2,
      text: {
        value: `Heya, your order has been successfuly sent into orbit.`,
        speed: 1,
      },
      ease: "none",
      delay: 4,
    });

    textTimeline.to(".order-number", {
      duration: 2,
      text: {
        value: `Your order number is:`,
        speed: 1,
      },
      ease: "none",
      delay: 2,
    });

    textTimeline.to(".number", {
      duration: 2,
      text: {
        value:
          props.location?.state?.orderResponse.status == "200"
            ? props.location?.state?.orderResponse.id
            : "We couldn't get your order number",

        speed: 1,
      },
      ease: "none",
      delay: 1,
    });

    setTimeout(() => {
      history.push({ pathname: "/order" });
    }, 18000);

    // document.querySelector(".moon").classList.add("moonAnimation");
    // document.querySelector(".rocket").classList.add("rocketAnimation");
    // document.querySelector(".cloud-one").classList.add("cloudOneAnimation");
    // document.querySelector(".cloud-two").classList.add("cloudTwoAnimation");
  }

  return (
    <div>
      <div className="launch-container ">
        <img src="img/moon.svg" className="moon moonAnimation" />
        <img src="img/cloud1.svg" className="cloud-one cloudOneAnimation" />
        <img src="img/rocket.svg" className="rocket rocketAnimation" />
        <img src="img/cloud2.svg" className="cloud-two cloudTwoAnimation" />
        <h1 className="order-text"></h1>
        <p className="order-number"></p>
        <p className="number"></p>
      </div>

      {/* <button 
            className="checkout" 
            onClick={() =>
              history.push({ pathname: "/order"})
              }
            >
            .
          </button> */}
    </div>
  );
};

export default LaunchScreen;
