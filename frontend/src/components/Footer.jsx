const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mock-Ecom-Cart Pvt. Ltd. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="/about" className="text-gray-400 hover:text-white mx-4">About</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-4">Contact</a>
          <a href="/privacy" className="text-gray-400 hover:text-white mx-4">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-4">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
