import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";

export default function Page() {
  return (
    <>
    <HeroSection/>
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms & Conditions – JobJunction4u
        </h1>

        <p className="text-lg leading-relaxed mb-4">
          Welcome to <strong>JobJunction4u</strong>, an online platform created to connect job seekers with genuine employment opportunities in the simplest and most affordable way. By accessing or using our website, you agree to be bound by these Terms and Conditions, along with our Privacy Policy and Refund Policy. We encourage every user to read these terms carefully before using the platform.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          To access our services, users are required to register on the website using accurate and valid information. During registration, a small one-time fee of <strong>₹29</strong> is charged to activate your account. This fee is valid for one year and is strictly non-refundable. The amount helps us maintain platform quality, verify users, and ensure only genuine candidates participate. Once payment is completed, it cannot be canceled, refunded, or adjusted under any circumstances.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          JobJunction4u is built to provide a safe space where both job seekers and employers can interact transparently. Users are expected to use the platform responsibly and avoid sharing false, misleading, or inappropriate information. Any misuse of the website, including spam or fraudulent activity, may lead to immediate suspension or termination of the account without prior notice.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          While we take every possible measure to ensure that all job listings and employer details are authentic, JobJunction4u does not guarantee employment or take responsibility for third-party job listings. We recommend that users verify all job offers independently before sharing personal or financial information with recruiters. Our role is limited to providing a medium that connects candidates and employers.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          The information shared by users during registration and profile creation is handled according to our Privacy Policy. We collect only necessary details such as name, email, phone number, and other relevant information to improve user experience and provide better opportunities. All user data is kept confidential and is not shared with unauthorized parties.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          JobJunction4u is not liable for any damages, losses, or misunderstandings arising from communication between users and employers. We are also not responsible for any technical errors, downtime, or interruptions that may occur on the platform. By using the site, you acknowledge that you do so at your own discretion and risk.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          We reserve the right to modify, update, or change these Terms and Conditions at any time without prior notice. Any updates will be reflected on this page, and continued use of the platform after changes signifies acceptance of the revised terms.
        </p>

        <p className="text-lg leading-relaxed mt-6">
          For any concerns, queries, or feedback related to these Terms and Conditions, users can contact our support team at:
          <br />
          <strong>info@jobjunction4u.com</strong>
        </p>
      </div>
    </div>

    <Footer/>
    </>
  );
}