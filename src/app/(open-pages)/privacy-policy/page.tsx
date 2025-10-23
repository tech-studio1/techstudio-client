export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 text-gray-700">
      <div className="my-10 space-y-8">
        <div className="mb-6">
          <p className="text-base leading-relaxed">
            This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information
            when you use the service and tells you about your privacy rights and how the law protects you. We use your personal
            data to provide and improve the service. By using the service, you agree to the collection and use of information
            in accordance with this Privacy Policy.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Interpretation and Definitions</h2>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Interpretation</h3>
          <p className="mb-4 pl-4">
            Words with initial capital letters have meanings defined under the following conditions. These definitions apply
            whether the terms appear in singular or plural.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Definitions</h3>
          <p className="mb-3 pl-4">For the purposes of this Privacy Policy:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Account – a unique account created for you to access our Service.</li>
            <li>Affiliate – an entity related through control or ownership.</li>
            <li>Address – Shop no 22, Moon Tower (Shundorban Courier office), Munshiganj Sadar, Munshiganj, Bangladesh</li>
            <li>Cookies – small files stored on your device by a website.</li>
            <li>Country – Bangladesh</li>
            <li>Device – any device like a computer, mobile, or tablet.</li>
            <li>Personal Data – any information related to an identifiable person.</li>
            <li>Service – refers to our website.</li>
            <li>Service Provider – third parties processing data on behalf of the Company.</li>
            <li>Third-party Social Media Service – social networks for login/registration.</li>
            <li>Usage Data – data collected automatically from service usage.</li>
            <li>Website – TechStudio, https://techstudio.com.bd</li>
            <li>You – the user accessing or using the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Collecting and Using Your Personal Data</h2>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Types of Data Collected</h3>

          <div className="space-y-4 pl-4">
            <div>
              <h4 className="mb-2 font-semibold">Personal Data:</h4>
              <p>Email, Name, Phone, Address, Profile Photos (optional)</p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Image Information:</h4>
              <p>Photos submitted by users may be stored securely for better experience and never shared with third parties.</p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Facebook App Events:</h4>
              <p>
                We use Facebook SDK to collect anonymous analytics including app interaction, device info, crash data,
                and ad tracking. You may opt out via Facebook or device settings, or email request.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Usage Data:</h4>
              <p>IP, browser type, visited pages, timestamps, mobile OS and model.</p>
            </div>
          </div>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Information from Third-Party Social Media Services</h3>
          <p className="pl-4">
            If you register/login through Google, Facebook, Twitter, or LinkedIn, we may access your name, email, and profile
            information. Additional data may be optionally shared.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">Tracking Technologies and Cookies</h3>
          <p className="pl-4">
            We use cookies and web beacons to authenticate users, store preferences, and analyze usage. You can disable
            cookies via browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Use of Your Personal Data</h2>
          <p className="mb-3 pl-4">We may use your personal data to:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Provide and maintain the service</li>
            <li>Manage your account and purchases</li>
            <li>Send service communications and offers</li>
            <li>Analyze usage and improve experience</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Sharing of Your Personal Data</h2>
          <p className="pl-4">
            Your data may be shared with service providers, affiliates, business partners, or during legal/business transfers,
            and only with your consent.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Retention & Transfer</h2>
          <p className="pl-4">
            Your data is retained only as long as needed for legal and service purposes. It may be transferred internationally
            with proper security measures.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Delete Your Data</h2>
          <p className="mb-3 pl-4">You may delete your data anytime by:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Using your account settings</li>
            <li>Emailing us at support@techstudio.com.bd</li>
            <li>Visiting our Delete Account Data page</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Disclosure & Security</h2>
          <p className="pl-4">
            Data may be disclosed for legal reasons or in mergers. While we secure your data, no method is 100% secure
            online—please use caution.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Children&apos;s Privacy</h2>
          <p className="pl-4">
            We do not knowingly collect data from users under 13. Parents may contact us to delete such data.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Links to Other Sites</h2>
          <p className="pl-4">
            We are not responsible for third-party site privacy. Please check their policies separately.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Changes to This Policy</h2>
          <p className="pl-4">
            We may update this policy. Users will be notified by email or notices on our website.
          </p>
        </section>
      </div>
    </main>
  );
}
