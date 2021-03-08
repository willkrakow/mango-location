import React, { useState } from "react";
import "./styles.css";
import Styled from "styled-components";
import LocationOn from "@material-ui/icons/LocationOn";
import Add from "@material-ui/icons/Add";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { Image } from "cloudinary-react";

const BigHeader = Styled.h1`
color: rgba(253,187,45,0.8);
font-weight: 200;
font-size: 4rem;
letter-spacing: 0.9;
`;

const Button = Styled.button`
padding: 12px 16px;
border: none;
display: block;
margin: auto;
margin-bottom: 1em;
background: transparent;
color: #edf1f7;
background: rgba(34,193,195, 0.8);
background: linear-gradient(70deg, rgba(34,193,195,0.8) 0%, rgba(253,187,45,0.8) 100%);
font-weight: 600;
cursor: pointer;
font-size: 18px;
border-radius: 8px;
transition: all 0.3s ease;
&:hover {
  transform: scale(1.1);
  background: linear-gradient(70deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
}
`;

const PlainText = Styled.p`
font-size: 18px;
color: rgba(10, 15, 30, 0.8);
font-weight: 600;
`;

const SmallText = Styled(PlainText)`
font-size: 18px;
color: #22c1c3;
font-weight: 300;
`;

const LocationIcon = Styled(LocationOn)`
color: rgba(34, 193, 195, 0.8);
font-size: 4rem;
vertical-align: bottom;
`;

const TextArea = Styled.textarea.attrs((props) => ({
  cols: 100,
  rows: 5
}))`
border: none;
background: rgba(255, 255, 255, 0.8);
font-size: 18px;
width: 400px;
border-radius: 16px;
font-family: 'Arial', sans-serif;
padding: 16px;

`;

const FlexWrapper = Styled.div`
display: flex;
justify-content: center;
min-width: 50%;
`;

const FlexChild = Styled.div`
flex-basis: 400px;
`;

export default function App() {
  const [location, setLocation] = useState([0, 0]);
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }

  function success(position) {
    setLocation([position.coords.latitude, position.coords.longitude]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    const res = await fetch("/", {
      method: "POST",
      body: {
        "form-name": "location-submissions",
        "data-netlify": "true",
        "data-netlify-honeypot": "true",
        location: location.toLocaleString() || "",
        link:
          `https://www.google.com/maps/search/?api=1&query=${location.toLocaleString()}` ||
          "",
        message: messageText || ""
      }
    });
    res.ok ? console.log("okay form") : console.log("nope form");
  }

  const handleMessage = () => setMessage(true);
  const handleMessageText = (e) => setMessageText(e.target.value);

  return (
    <div className="App">
      <BigHeader>Mango</BigHeader>
      <Image
        cloudName="djmk8xgrk"
        publicId="mango_fz0jtf.jpg"
        width="400"
        crop="scale"
      />
      <FlexWrapper>
        <FlexChild>
          <h2 style={{ textAlign: "left" }}>Hi hooman.</h2>
          <p style={{ textAlign: "left" }}>Hope you're doing alright today.</p>
          <p style={{ textAlign: "left" }}>
            My name's Mango, and I live in Hillsborough, NC on Margaret Lane. I
            live to hunt bugs and bully my brother (he's a doggo) and play
            frogger in the street.
          </p>
          <p style={{ textAlign: "left" }}>
            If you're reading this, you probably found me doing one of the
            things above.
          </p>
          <h3 style={{ textAlign: "left" }}>What to do with me</h3>
          <ul style={{ textAlign: "left" }}>
            <li>
              Give me snuggles. (Don't worry, I got shot with rabbies. No...
              wait.. okay it was something like that.
            </li>
            <li>
              Let my parents know where I am. Their names are Will and Laura and
              they are LAME but nice enough.
            </li>
            <li>More snuggles pls.</li>
          </ul>
          <h3 style={{ textAlign: "left" }}>Why the frick am I out here</h3>
          <p style={{ textAlign: "left" }}>
            Because I like being outside, duh. Sunshine is good for doggos and
            ferocious Mangos and hoomans alike.
          </p>
        </FlexChild>
      </FlexWrapper>
      <form
        action=""
        method="POST"
        data-netlify-form="true"
        data-netlify-honeypot="true"
        form-name="location-data"
      >
        <input type="hidden" name="location" value={location} />
        <SmallText>Your location</SmallText>
        <PlainText>
          {" "}
          <LocationIcon />
          {location.toLocaleString()}
        </PlainText>
        {!message && (
          <Button type="button" onClick={handleMessage}>
            <Add style={{ verticalAlign: "bottom" }} /> Add message
          </Button>
        )}
        {message && (
          <TextArea
            type="textarea"
            value={messageText}
            onChange={handleMessageText}
            placeholder="How's the Mango?"
          />
        )}
        <Button type="submit" onClick={handleSubmit}>
          Send location to Will and Laura
        </Button>
      </form>
    </div>
  );
}
