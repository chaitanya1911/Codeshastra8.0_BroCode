import React from "react";
import $ from "jquery";

function CaptureImg() {
  function drawImge() {
    var video = document.querySelector("#webCamera");
    var canvas = document.querySelector("#videoCanvas");
    var ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    var faceArea = 300;
    var pX = canvas.width / 2 - faceArea / 2;
    var pY = canvas.height / 2 - faceArea / 2;

    ctx.rect(pX, pY, faceArea, faceArea);
    ctx.lineWidth = "6";
    ctx.strokeStyle = "green";
    ctx.stroke();

    setTimeout(drawImge, 100);
  }
  $(document).ready(function () {
    startVideo();
  });

  async function startVideo() {
    let video = document.querySelector("#webCamera");
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  }

  function clickPic() {
    let canvas = document.querySelector("#canvas");
    let video = document.querySelector("#webCamera");
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL("image/jpeg");

    // data url of the image
    console.log(image_data_url);
  }
  return (
    <>
      <button id="start-camera" onClick={(e) => {}}>
        Start Camera
      </button>
      <video
        autoPlay={true}
        id="webCamera"
        onPlay={(e) => {
          // const video = document.getElementById('video')
          setTimeout(drawImge, 300);
        }}
        style={{ display: "none" }}
      >
        {" "}
      </video>

      <canvas id="videoCanvas"></canvas>
      <button
        id="click-photo"
        onClick={(e) => {
          clickPic();
        }}
      >
        Click Photo
      </button>
      <canvas id="canvas" width="320" height="240"></canvas>
    </>
  );
}

export default CaptureImg;
