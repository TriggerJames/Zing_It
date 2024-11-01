// src/pages/About.js
import React from 'react';
import '../assets/css/About.css';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Zing_it</h1>
      
      <section className="about-section">
        <h2>Welcome to Zing_it - Your Modern Chat Solution</h2>
        <p>
          Zing_it is a cutting-edge chat application designed to bring people together in a seamless, 
          intuitive, and secure environment. Whether you're looking to connect with friends, collaborate 
          with colleagues, or join communities of like-minded individuals, Zing_it provides the perfect 
          platform for real-time communication.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Zing_it, our mission is to break down communication barriers and foster meaningful 
          connections in the digital age. We believe that effective communication is the cornerstone 
          of strong relationships, productive teamwork, and thriving communities.
        </p>
      </section>

      <section className="about-section">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Real-time Messaging:</strong> Instantly send and receive messages with zero delay.</li>
          <li><strong>Multiple Chat Rooms:</strong> Join different rooms based on your interests or create your own.</li>
          <li><strong>User-friendly Interface:</strong> Navigate with ease thanks to our intuitive design.</li>
          <li><strong>Dark Mode:</strong> Reduce eye strain with our sleek dark mode option.</li>
          <li><strong>Secure & Private:</strong> Your conversations are encrypted and your privacy is our priority.</li>
          <li><strong>Cross-platform:</strong> Access Zing_it from any device, anytime, anywhere.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Zing_it?</h2>
        <p>
          In a world full of chat applications, Zing_it stands out with its focus on simplicity, 
          performance, and user experience. We've crafted every aspect of our app to ensure that 
          you can connect with others without any hassle or technical barriers.
        </p>
        <p>
          Whether you're a tech enthusiast or new to online chat, Zing_it provides a platform that's 
          both powerful and accessible. Join us today and experience the future of digital communication!
        </p>
      </section>

      <section className="about-section">
        <h2>Get Started</h2>
        <p>
          Ready to dive in? Click on the 'Start Chatting' button on our home page, choose a username, 
          select a room, and you're all set! No lengthy sign-up processes, no complicated setups. 
          Just instant connection at your fingertips.
        </p>
      </section>

      <footer className="about-footer">
        <p>Join the conversation today and see why people are raving about Zing_it!</p>
      </footer>
    </div>
  );
}

export default About;