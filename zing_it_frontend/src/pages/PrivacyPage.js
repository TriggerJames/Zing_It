// src/components/PrivacyPage.js
import React from 'react';
import '../assets/css/PrivacyPage.css';

function PrivacyPage() {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-content">
        <section>
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create or modify your account, 
            request customer support, or communicate with us. This information may include your name, email 
            address, and any other information you choose to provide.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our Services, to develop new ones, 
            and to protect Zing_it and our users. We also use this information to offer you tailored content and 
            to improve the overall user experience.
          </p>
        </section>

        <section>
          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. 
            We may share information in the following circumstances:
          </p>
          <ul>
            <li>With your consent</li>
            <li>For legal reasons</li>
            <li>To protect the rights and safety of our users and third parties, as well as our own</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>
            We use reasonable security measures to protect against unauthorized access, alteration, disclosure, 
            or destruction of your personal information. However, no method of transmission over the Internet or 
            electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>5. Your Choices</h2>
          <p>
            You may update, correct, or delete your account information at any time by logging into your account 
            or contacting us. You may also opt out of receiving promotional communications from us by following 
            the instructions in those communications.
          </p>
        </section>

        <section>
          <h2>6. Changes to This Policy</h2>
          <p>
            We may change this privacy policy from time to time. If we make changes, we will notify you by revising 
            the date at the top of the policy and, in some cases, we may provide you with additional notice.
          </p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at:
            <br />
            <a href="mailto:privacy@zingit.com">privacy@zingit.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;