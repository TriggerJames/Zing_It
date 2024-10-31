// src/pages/PrivacyPage.js
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
            and to protect Zing_it and our users.
          </p>
        </section>

        <section>
          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We  may share your information with third-party service providers, such as payment processors, 
            data analytics providers, and marketing partners.
          </p>
        </section>

        <section>
          <h2>4. Security</h2>
          <p>
            We take reasonable measures to protect the information we collect from loss, theft, misuse, 
            unauthorized access, disclosure, alteration, and destruction.
          </p>
        </section>

        <section>
          <h2>5. Changes to This Policy</h2>
          <p>
            We may modify this Policy at any time, and we will notify you of any changes by posting the 
            revised Policy on this page.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;