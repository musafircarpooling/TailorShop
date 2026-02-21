
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-matteBlack text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold luxury-heading mb-6">
              ZARDOZI <span className="text-elegantGold italic">Royale</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Pioneering Pakistani luxury fashion since 1995. We combine ancestral embroidery techniques with contemporary tailoring to create masterpieces that tell a story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-elegantGold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-elegantGold transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-elegantGold transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-elegantGold font-bold uppercase tracking-widest mb-8 text-sm">Our World</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Heritage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Atelier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artisans & Crafts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bridal Couture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-elegantGold font-bold uppercase tracking-widest mb-8 text-sm">Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Bespoke Tailoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Virtual Consultations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alterations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fabric Sourcing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-elegantGold font-bold uppercase tracking-widest mb-8 text-sm">Contact</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex gap-4">
                <MapPin className="text-elegantGold shrink-0" size={20} />
                <span>MM Alam Road, Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-elegantGold shrink-0" size={20} />
                <span>+92 42 3XXXXXXX</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-elegantGold shrink-0" size={20} />
                <span>concierge@zardoziroyale.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2024 Zardozi Royale. All rights reserved.
          </p>
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
