export default function ReturnPolicyPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 text-gray-700">
      <div className="my-10 space-y-8">
        <div className="mb-6">
          <p className="text-base leading-relaxed">
            At TechStudio, we want you to be completely satisfied with your
            purchase. If you need to return a product, please review the
            following policy carefully.
          </p>
        </div>

        <section>
          <h3 className="mb-4 text-xl font-bold">1. Eligibility for Returns</h3>
          <p className="mb-3 pl-4">
            You can return products under these conditions:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>The product is damaged or defective.</li>
            <li>
              The wrong product was delivered (wrong model, color, or item).
            </li>
            <li>
              You ordered a product that is later found to be out of stock.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">2. Return Conditions</h3>
          <p className="mb-3 pl-4">To be eligible for a return:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Notify us within 48 hours of receiving the product.</li>
            <li>
              Return the item unused, unopened, and in its original packaging.
            </li>
            <li>Provide valid proof of purchase (order number or receipt).</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">3. Non-Returnable Items</h3>
          <p className="mb-3 pl-4">Returns will not be accepted if:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              The product is returned without original packaging or accessories.
            </li>
            <li>Physical damage or signs of misuse after delivery.</li>
            <li>Broken security seals or used products.</li>
            <li>Custom orders or final sale items.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">4. Return Shipping</h3>
          <p className="pl-4">
            If the return is due to our error (wrong or defective item), we will
            cover the return shipping cost. Otherwise, the customer is
            responsible for return shipping.
          </p>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">5. Refund Processing</h3>
          <p className="pl-4">
            After we receive and inspect your returned item, we will notify you
            about the approval status. Approved returns will be refunded using
            the original payment method within 7–14 working days.
          </p>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">6. Contact Information</h3>
          <p className="mb-3 pl-4">
            For return requests or questions, please contact us at:
          </p>
          <ul className="list-inside space-y-2 pl-4">
            <li>📧 Email: support@techstudio.com.bd</li>
            <li>📞 Phone: 01670957108</li>
            <li>
              💬 Facebook:{' '}
              <a
                href="https://www.facebook.com/techstudio.com.bd"
                className="text-blue-600 hover:underline"
              >
                facebook.com/techstudio.com.bd
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
