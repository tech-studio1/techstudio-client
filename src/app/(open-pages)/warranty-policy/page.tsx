export default function WarrantyPolicyPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 text-gray-700">
      <div className="my-10 space-y-8">
        <section>
          <h3 className="mb-4 text-xl font-bold">1. Warranty Claim Requirements</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Warranty durations may include 7 days, 3 months, 6 months, 12 months, 18 months, or 24 months.</li>
            <li>Original product box and purchase cash memo are mandatory for any warranty claim.</li>
            <li>Claims without the original box and cash memo will not be accepted under any circumstances.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">2. Expired Warranty</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>No warranty service will be provided once the warranty period has expired.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">3. Applicable Warranty Conditions</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Warranty covers only factory defects or manufacturing issues.</li>
            <li>Damages caused by misuse—such as breakage, burning, water damage, or external physical damage—are not covered under warranty.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">4. Product Submission for Warranty</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Customers may submit products directly to our warehouse or send them via courier at their own expense.</li>
            <li>✅ If the warranty claim is accepted, return courier cost will be borne by TechStudio.</li>
            <li>❌ If no issue is found, the customer will bear the full courier charges (both ways).</li>
            <li>TechStudio will not be responsible for any costs in such cases.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">5. Repair or Replacement Process</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>If repair is possible under warranty, the product will be repaired and returned.</li>
            <li>If repair is not possible, a one-time replacement will be provided.</li>
            <li>After replacement, the warranty will be considered fully concluded for that product.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">6. 7-Day Replacement Warranty</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>To be eligible, the product must be in brand-new condition.</li>
            <li>Products with signs of use—such as scratches, dents, or marks—will not qualify for replacement.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">7. Note</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Products once sold are not returnable unless a valid warranty issue exists.</li>
            <li>We strongly encourage customers to research and understand the product thoroughly before placing an order.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
