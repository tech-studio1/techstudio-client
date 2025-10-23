export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 text-gray-700">
      <div className="my-10 space-y-8">
        <div className="mb-6">
          <p className="text-base leading-relaxed">
            At TechStudio (techstudio.com.bd), your satisfaction is our top
            priority. We work hard to ensure every product you receive is 100%
            authentic and in perfect condition. However, if your experience
            falls short of expectations, our Refund Policy ensures a smooth and
            transparent process.
          </p>
        </div>

        <section>
          <h3 className="mb-4 text-xl font-bold">1. Eligibility for Refund</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              The product received is damaged, defective, or not as described.
            </li>
            <li>
              The product you ordered is out of stock and we are unable to
              deliver it.
            </li>
            <li>
              The product was incorrectly delivered (e.g., wrong model, color,
              or item).
            </li>
            <li>You canceled the order before it was shipped.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">2. Refund Conditions</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              You must notify us within 48 hours of receiving the product.
            </li>
            <li>
              The item must be unused, unopened, and in its original packaging.
            </li>
            <li>
              You must provide valid proof of purchase (order number or
              receipt).
            </li>
            <li>
              The item must be returned to us in the same condition as received.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">
            3. Non-Refundable Situations
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Products returned without original packaging or accessories.
            </li>
            <li>
              Physical damage due to misuse or mishandling after delivery.
            </li>
            <li>Products with broken security seals or signs of use.</li>
            <li>Custom orders or items marked as final sale.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">4. Refund Process</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              We will notify you of the approval or rejection of your refund
              after inspection.
            </li>
            <li>
              If approved, the refund will be processed within 7–10 working
              days.
            </li>
            <li>
              Refunds will be issued to the original method of payment (e.g.,
              bKash, Nagad, bank transfer).
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">5. Return Shipping</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              If the refund is due to an error on our part, we will cover return
              shipping costs.
            </li>
            <li>
              In all other cases, the customer is responsible for return
              shipping.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">6. Order Cancellations</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Orders can be canceled before shipment by contacting our customer
              service.
            </li>
            <li>
              If already shipped, our standard return/refund policy will apply.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">7. Contact Information</h3>
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
