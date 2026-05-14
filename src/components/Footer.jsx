import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Send, Share2, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-3xl font-black text-primary tracking-tighter mb-6 block">
              Flavor<span className="text-dark dark:text-white">Forge</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Your ultimate destination for discovering delicious recipes from around the globe. Join our community of food lovers and start your culinary journey today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-2xl bg-slate-900 text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm"><Camera className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-2xl bg-slate-900 text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm"><Send className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-2xl bg-slate-900 text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/favorites" className="text-slate-400 hover:text-primary transition-colors">Favorites</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Our Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg text-white">Helpful Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Cooking Tips</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Nutrition Guide</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg text-white">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6">
              Subscribe to get the latest recipes and cooking tips straight to your inbox.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full px-6 py-4 rounded-2xl bg-slate-900 border-none outline-none focus:ring-2 ring-primary/20 text-sm text-white placeholder-slate-500"
              />
              <button className="absolute right-2 top-2 p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-900 gap-6">
          <p className="text-slate-500 text-xs">
            © 2026 FlavorForge. All rights reserved. Built with ❤️ for Food Lovers.
          </p>
          <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
