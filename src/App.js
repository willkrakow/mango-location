import { useState } from "react";
import "./styles.css";
import Styled from "styled-components";
import LocationOn from "@material-ui/icons/LocationOn";
import Add from "@material-ui/icons/Add";
const Button = Styled.button`
padding: 12px 16px;
border: none;
display: block;
margin: auto;
margin-bottom: 1em;
background: transparent;
color: rgba(240, 250, 255, 0.6);
font-weight: 600;
cursor: pointer;
font-size: 18px;
border-radius: 8px;
transition: all 0.3s ease;
&:hover {
  background: rgba(240, 250, 255, 0.6);
  color: #343c46;
}
`;

const PlainText = Styled.p`
font-size: 18px;
color: rgba(0, 15, 30, 0.8);
font-weight: 200;
`;

const SmallText = Styled(PlainText)`
font-size: 14px;
color: rgba(0, 15, 30, 0.6);
font-weight: 400;
`;

const LocationIcon = Styled(LocationOn)`
display: block;
width: 100%;
margin: auto;
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
      <h1>Mango</h1>
      <form
        action=""
        method="POST"
        data-netlify-form="true"
        data-netlify-honeypot="true"
        form-name="location-data"
      >
        <input type="hidden" name="location" value={location} />
        <LocationIcon
          style={{ color: "rgba(240, 250, 255, 0.6)", fontSize: "2rem" }}
        />
        <SmallText>Your location</SmallText>
        <PlainText>{location.toLocaleString()}</PlainText>
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
