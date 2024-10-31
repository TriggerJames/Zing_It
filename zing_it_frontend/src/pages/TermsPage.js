// src/components/TermsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/TermsPage.css';

function TermsPage() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms of Service</h1>
      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Zing_it ("the Service"), you accept and agree to be bound by the terms
            and conditions of this agreement. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Description of Service</h2>
          <p>
            Zing_it provides a real-time chat platform that allows users to communicate with others through
            text messages, media sharing, and other interactive features. The Service may be accessed through
            our website or mobile applications.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. User Registration and Account Security</h2>
          <ul>
            <li>You must be at least 13 years old to use this Service.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to provide accurate and complete information during registration.</li>
            <li>You are solely responsible for all activities that occur under your account.</li>
            <li>You must notify us immediately of any unauthorized use of your account.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Post or transmit any content that is offensive, harmful, or inappropriate</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Collect or store personal data about other users without permission</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Content Guidelines</h2>
          <p>
            Users are responsible for all content they post or share through the Service. Content must not:
          </p>
          <ul>
            <li>Infringe on intellectual property rights</li>
            <li>Contain malicious code or harmful components</li>
            <li>Violate any person's privacy rights</li>
            <li>Include spam, unauthorized advertising, or promotional materials</li>
            <li>Contain false or misleading information</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Privacy and Data Protection</h2>
          <p>
            Our collection and use of personal information is governed by our{' '}
            <Link to="/privacy" className="terms-link">Privacy Policy</Link>. By using the Service,
            you consent to our data practices as described in the Privacy Policy.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Intellectual Property Rights</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Zing_it
            and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to the Service
            immediately, without prior notice, for any violation of these Terms or for any other
            reason we deem appropriate.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without any warranties of any kind,
            either express or implied, including but not limited to warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Zing_it shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages resulting from your use or
            inability to use the Service.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any
            material changes through the Service or via email. Your continued use of the Service
            after such modifications constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:{' '}
            <a href="mailto:legal@zingit.com" className="terms-link">legal@zingit.com</a>
          </p>
        </section>

        <div className="terms-footer">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            By using Zing_it, you acknowledge that you have read, understood, and agree to be bound
            by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;