import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { msRegister } from "../actions/msTracker";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const msName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The msName must be between 1 to 3 words separated by dash.
      </div>
    );
  }
};


const MsRegister = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [msName, setMsName] = useState("");
  const [isProfReq, setIsProfReq] = useState("Yes");
  const [isPtRequired, setIsPtRequired] = useState("Yes");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeMsName = (e) => {
    const msName = e.target.value;
    setMsName(msName);
  };

  const onChangeIsProfReq = (e) => {
    const isProfReq = e.target.value;
    setIsProfReq(isProfReq);
  };

  const onChangeIsPtRequired = (e) => {
    const isPtRequired = e.target.value;
    console.log("isPtRequired "+isPtRequired);
    setIsPtRequired(isPtRequired);
  };

 
  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(msRegister(msName, isProfReq, isPtRequired))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="msName">Microservice Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="msName"
                  value={msName}
                  onChange={onChangeMsName}
                  
                />
              </div>

              <div className="form-group">
                <label htmlFor="Is Profiling Required?">Is Profiling Required?</label>
                <input type="radio" value="Yes" onChange={onChangeIsProfReq} name="isProfReq" checked={true} /> Yes
                <input type="radio" value="No" onChange={onChangeIsProfReq} name="isProfReq"/> No
              </div>

              <div className="form-group">
                <label htmlFor="Is PT Required?">Is PT Required?</label>
                <input type="radio" value="Yes" onChange={onChangeIsPtRequired} name="isPtRequired" checked={true} /> Yes
                <input type="radio" value="No" onChange={onChangeIsPtRequired} name="isPtRequired"/> No
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Register</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default MsRegister;
