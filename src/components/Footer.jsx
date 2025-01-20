const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TechHive</h3>
              <p className="text-gray-300">
                Your one-stop destination for innovative technology solutions.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-blue-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-blue-400">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
              <p>Email: info@techhive.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Tech Street, Digital City</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-4 border-t border-gray-700">
            <p>
              &copy; {new Date().getFullYear()} TechHive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
