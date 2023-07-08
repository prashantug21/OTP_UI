import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './modal.css'

export default function Popup({ show, setShow, phone }) {
  // Array to hold the OTP values
  const [otp, setOtp] = useState(new Array(6).fill(""));

  //Function to handle input
  function handleInput(e, { index }) {
    const inputs = document.querySelectorAll(".otp");
    if (e.key >= 0 && e.key <= 9) {
      if (index < 5) {
        // Move to the next input field if a digit is entered
        inputs[index].value = ""
        setTimeout(() => inputs[index + 1].focus(), 10)
      }
    }
    else if (e.key === 'Backspace'||e.key === 'ArrowLeft') {
      if (index > 0) {
        // Move to the previous input field if the Backspace or Left Arrow keys are pressed
        setTimeout(() => inputs[index - 1].focus(), 10)
      }
    } else if (e.key === 'ArrowRight') {
      if (index < 5) {
        // Move to the next input field if the Right Arrow key is pressed
        setTimeout(() => inputs[index + 1].focus(), 10)
      }
    } else {
      // Prevent any other key from being entered
      e.preventDefault();
    }
  }

  //Function to handle paste
  function handlePaste(e, { index }) {
    const inputs = document.querySelectorAll(".otp");
    const data = e.clipboardData.getData("text");
    if (data.length > 6) {
      // Prevent pasting if the length of the data is greater than 6
      e.preventDefault();
      document.getElementById('message').innerHTML = "Invalid OTP Length"
    }
    else {
      for (let i = 0; i < data.length; i++) {
        inputs[i].value = data[i]
        inputs[i].focus()
      }
    }
  }

  //Function to submit OTP
  function submitOTP(e) {
    e.preventDefault()
    const inputs = document.querySelectorAll(".otp");
    let otp = ''
    for (let i = 0; i < inputs.length; i++) {
      otp += inputs[i].value
    }
    if (otp.length < 6) {
      document.getElementById('message').innerHTML = "Invalid OTP Length"
    }
    else {
      document.getElementById('message').innerHTML = ""
      alert(otp)
      window.location.reload();
    }
  }

  return (
    <div>
      <Modal show={show} onHide={() => { setShow(false); const inputs = document.querySelectorAll(".otp")[0].focus() }}>

        <Modal.Header closeButton>
          <Modal.Title>Phone Verification</Modal.Title>
        </Modal.Header>

        <Modal.Body className='d-flex flex-column align-item-center fs-3' >
          <p className='h4'>Your OTP has been sent to {phone.substring(0, 5)}-{phone.substring(5, 6)}XXXX</p>

          <div className="d-flex otp-box justify-content-center">
            <div>
              {otp.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <input
                      type="text"
                      className="otp"
                      maxLength={1}
                      onKeyDown={(e) => { handleInput(e, { index }) }}
                      onPaste={(e) => { handlePaste(e, { index }) }}
                      required
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className='d-flex justify-content-between'>
            <button id='change' onClick={() => { setShow(!show) }}> Change Number</button>
            <button id='resend' onClick={() => { document.getElementById('message').innerHTML = "OTP Resend" }}> Re-send OTP</button>
          </div>

          <div id='message'></div>
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="primary" type='submit' className='w-50 fs-3' onClick={(e) => { submitOTP(e) }}>
            Submit
          </Button>
        </Modal.Footer>

      </Modal>

    </div>
  )
}
