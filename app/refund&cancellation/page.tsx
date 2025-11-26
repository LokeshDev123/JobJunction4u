import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Refund Policy – JobJunction4U
          </h1>

          <p className="text-lg leading-relaxed mb-4">
            At <strong>JobJunction4U</strong>, we value transparency, trust, and simplicity in everything we do. Our platform has been designed to help job seekers connect with verified employers in the most affordable way possible.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            To maintain fairness and operational efficiency, JobJunction4U charges only <strong>₹29</strong> as a one-time registration fee for accessing our job services. This minimal fee covers verification, maintenance, and continuous improvement of the platform — ensuring genuine job opportunities for every registered user.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            🔸 Non-Refundable Registration Fee
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Please note that the <strong>₹29</strong> payment made during registration is strictly <strong>non-refundable</strong> under any circumstances. Once your account is created and activated, the amount cannot be refunded, reversed, or adjusted — even if:
          </p>
          <ul className="list-disc pl-6 text-lg mb-4">
            <li>You decide not to use your account</li>
            <li>You do not find a suitable job</li>
            <li>You mistakenly make multiple registrations</li>
          </ul>
          <p className="text-lg leading-relaxed mb-4">
            This policy is in place because the registration fee is nominal and immediately goes toward platform services, maintenance, and verification processes.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            🔸 Why We Do Not Offer Refunds
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Our goal is to keep JobJunction4U accessible to everyone while maintaining platform quality. The ₹29 fee is intentionally small to:
          </p>
          <ul className="list-disc pl-6 text-lg mb-4">
            <li>Prevent fake or spam registrations</li>
            <li>Keep the system clean and reliable for genuine users</li>
            <li>Support technical operations and customer support</li>
          </ul>
          <p className="text-lg leading-relaxed mb-4">
            Since this amount is symbolic and not a profit-based charge, refunds are not feasible after registration.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            🔸 Exceptions
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Currently, JobJunction4U does not provide any exceptions to this refund policy. We strongly advise all users to review our Terms & Conditions and About Page carefully before completing registration.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            🔸 Need Help?
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            If you face any technical issue during payment or account activation, please contact our support team within <strong>24 hours</strong> at:
          </p>
          <p className="text-lg font-semibold mb-6">📧 info@jobjunction4u.com</p>
          <p className="text-lg leading-relaxed mb-4">
            Our team will assist you in resolving the issue — but please remember, refunds are not applicable once payment is processed successfully.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            🧭 Our Promise
          </h2>
          <p className="text-lg leading-relaxed mb-2">
            We are committed to providing value far beyond the ₹29 registration fee.
          </p>
          <p className="text-lg leading-relaxed">
            With verified jobs, genuine employers, and an easy-to-use platform, JobJunction4U aims to create real opportunities for every job seeker — fairly and transparently.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
