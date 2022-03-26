import React, { useEffect } from "react";
import axiosInstance from "../axios";

function AttendanceOCR() {
  useEffect(() => {
    axiosInstance.get("/api/ocr").then((res) => {
      console.log(res.data);
    });

    return () => {};
  }, []);

  return <div>AttendanceOCR</div>;
}

export default AttendanceOCR;
