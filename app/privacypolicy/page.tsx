import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";

export default function Page() {
  return (

    <>
    <HeroSection/>
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Privacy Policy – JobJunction4U
        </h1>

        <p className="text-lg leading-relaxed mb-4">
          At <strong>JobJunction4U</strong>, your privacy is our top priority. We are committed to protecting your personal information and ensuring complete transparency about how your data is collected, used, and secured on our platform.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          By using our website and services, you consent to the practices outlined in this Privacy Policy. We strongly recommend reviewing this document carefully to understand how your information is handled.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Information We Collect</h2>
        <p className="text-lg leading-relaxed mb-4">We collect only the necessary information required to create and maintain your account, including:</p>
        <ul className="list-disc pl-6 text-lg mb-4">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Mobile Number</li>
          <li>Basic profile and job preference details</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Additional non-personal data such as IP address, device information, and pages visited may be collected automatically to enhance user experience and improve our services.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 How We Use Your Information</h2>
        <p className="text-lg leading-relaxed mb-4">Your information is used strictly for:</p>
        <ul className="list-disc pl-6 text-lg mb-4">
          <li>Creating and managing your JobJunction4U account</li>
          <li>Providing access to job postings and employer interactions</li>
          <li>Improving website performance and user experience</li>
          <li>Sending important notifications and updates related to your account</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          We <strong>do not</strong> sell, rent, or trade your personal information with any unauthorized third parties.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Data Security</h2>
        <p className="text-lg leading-relaxed mb-4">
          We implement industry-standard security measures to protect your data from unauthorized access, misuse, or disclosure. Although no online platform is completely secure, we continuously work to safeguard user information.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Cookies & Tracking</h2>
        <p className="text-lg leading-relaxed mb-4">
          JobJunction4U uses cookies to provide a smoother and more personalized browsing experience. Cookies help us analyze traffic, remember user preferences, and improve website performance.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Sharing of Information</h2>
        <p className="text-lg leading-relaxed mb-4">
          We may share limited information only with trusted service providers who assist in operating our platform. These parties are obligated to maintain confidentiality and are not permitted to misuse your data in any way.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Your information may also be shared if required by law or to protect the rights, safety, and integrity of JobJunction4U and its users.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Your Rights</h2>
        <p className="text-lg leading-relaxed mb-4">
          As a user, you have the right to:
        </p>
        <ul className="list-disc pl-6 text-lg mb-4">
          <li>Access the information you have shared with us</li>
          <li>Request corrections to inaccurate or incomplete data</li>
          <li>Request deletion of your account from our platform</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          To exercise these rights, contact us anytime at <strong>info@jobjunction4u.com</strong>.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Policy Updates</h2>
        <p className="text-lg leading-relaxed mb-4">
          We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. All updates will be posted on this page, and continued use of JobJunction4U constitutes acceptance of the revised policy.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">🔹 Contact Us</h2>
        <p className="text-lg leading-relaxed">
          For questions, concerns, or feedback regarding this Privacy Policy, please reach out to us at:
          <br />
          <strong>📧 info@jobjunction4u.com</strong>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}