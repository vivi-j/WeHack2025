# Soul Signal
#### Keeping you connected, one tower at a time.

## Project Overview

We believe connection is everything—between people, devices, and networks. During our talks with Verizon teams, three pain points kept surfacing: safety, speed, and cost. That sparked our mission: to build a solution that doesn’t force trade-offs between them.

But we also wanted to align with our ethos of smart reuse. We noticed that we had lots of old and used hardware cables(?) that we wanted to reuse. Why scrap old hardware when it can be repurposed to strengthen networks? By bridging the gap between sustainability and performance, we’re not just solving problems, we’re rethinking how tech evolves.

## What we used to build it

Soul Signal was developed as a full-stack solution using React for our interactive dashboard frontend, Axios for efficient API communication, and Express for our backend server infrastructure. For computer vision capabilities, we used Roboflow to classify and segment drone images, enabling precise detection of towers and birds' nests. Our AI assistant, Lil' Raccoon, is powered by Gemini 1.5 Pro, which we carefully prompt-engineered to provide accurate, contextual responses about infrastructure insights. The VR component was built in Unity to create immersive 360° tower inspections with thermal imaging overlays. On the hardware side, we integrated Raspberry Pi with vibrotactile actuators to develop our wearable alert system, translating thermal data into real-time haptic feedback for technicians in the field. This multidisciplinary approach allowed us to create a pipeline from drone capture to actionable insights.

## Prerequisites
- Ensure that you have the following installed:
  - NPM package manager
  - Node.js
  - An IDE (optional)

## Steps to Use
- Clone this repository using the ```git clone``` command
- Open two instances of the shell/terminal in this project
- Terminal 1
  - run ```cd client```
  - run ```npm install```
  - run ```npm start```
  - The website should be opening up after a few seconds on your local machine at port 3000
- Terminal 2
  - run ```cd server```
  - run ```node server.js```





