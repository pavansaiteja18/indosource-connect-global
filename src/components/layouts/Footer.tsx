
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-marketplace-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">IndoSource</h3>
            <p className="opacity-80">
              Connecting international buyers with verified Indian sourcing agents
              for seamless procurement and manufacturing.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="opacity-80 hover:opacity-100">Home</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100">About Us</Link></li>
              <li><Link to="/how-it-works" className="opacity-80 hover:opacity-100">How It Works</Link></li>
              <li><Link to="/register" className="opacity-80 hover:opacity-100">Join Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold mb-4">For Users</h4>
            <ul className="space-y-2">
              <li><Link to="/buyer" className="opacity-80 hover:opacity-100">For Buyers</Link></li>
              <li><Link to="/seller" className="opacity-80 hover:opacity-100">For Sellers</Link></li>
              <li><Link to="/agent" className="opacity-80 hover:opacity-100">For Agents</Link></li>
              <li><Link to="/faq" className="opacity-80 hover:opacity-100">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="opacity-80">info@indosource.com</li>
              <li className="opacity-80">+91 123 456 7890</li>
              <li className="opacity-80">Mumbai, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-marketplace-blue-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-80 text-sm">© 2025 IndoSource. All rights reserved.</p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100">Privacy Policy</Link>
            <Link to="/terms" className="text-sm opacity-80 hover:opacity-100">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
