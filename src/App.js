import "./App.css";
import { useState } from "react";
import Modal from "./Components/Modal.jsx";
import { FormControl,Form,Button } from "react-bootstrap";

function App() {
  //states to access the modal and phone number
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState('');

  //function to check if the phone number is valid or not
  function submit(e) {
    e.preventDefault();
    let flag=true;
    for(let i=0;i<phone.length;i++){
      if(phone[i]<'0' || phone[i]>'9'){
        flag=false;
        break;
      }
    }
    if(flag===false){
      document.getElementById('message1').innerHTML="Phone number should contain only digits";
      return;
    }
    if(phone.length!==10){
      document.getElementById('message1').innerHTML="Phone number should be of 10 digits";
      return;
    }
    setShow(true);
  }

  return (
    <div className="App d-flex flex-column gap-3">
        <label className="mx-2">Phone Number</label>

        <FormControl
          type="text"
          maxLength={10}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          required
        />

        <p id='message1' className="h6"></p>

        <Button
          className="btn btn-primary fs-1"
          onClick={(e) => {
            submit(e);
          }}
        >
          Send OTP
        </Button>
        {/* Passing the modal with all the necessay values */}
      <Modal show={show} setShow={setShow} phone={phone} />
    </div>
  );
}

export default App;
