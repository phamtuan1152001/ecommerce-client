"use client"

import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

interface OtpFieldInput {
  value: string,
  onChange: any,
}

const OptFieldInput = ({ value, onChange, ...rest }: OtpFieldInput) => {
  const [otp, setOtp] = useState('');

  React.useEffect(() => {
    if (!!otp) {
      onChange(otp)
    }
  }, [otp])

  return (
    <OtpInput
      value={otp}
      onChange={(v) => setOtp(v)}
      numInputs={6}
      shouldAutoFocus={true}
      renderInput={(props) => <input {...props} />}
      containerStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        width: "100%"
      }}
      inputStyle={{
        background: "#F5F5F5",
        width: 45,
        height: 45,
        borderRadius: 8,
        fontSize: 22,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: 24,
      }}
      {...rest}
    />
  );
}

export default OptFieldInput