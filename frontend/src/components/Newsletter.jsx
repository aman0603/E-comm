import React, { useState } from 'react';
import { Mail, Gift } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-green-300" />
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products, exclusive offers, and style tips delivered straight to your inbox.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Gift className="h-5 w-5 text-green-300" />
              <span>Exclusive Discounts</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <span className="text-green-300">⚡</span>
              <span>Early Access</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <span className="text-green-300">🎁</span>
              <span>Special Offers</span>
            </div>
          </div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/20 border border-white/30 rounded-full px-6 py-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-300 text-gray-900 px-8 py-4 rounded-full font-semibold transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-sm text-white/60 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-green-400/20 border border-green-300/30 rounded-full px-6 py-4 text-green-300 font-semibold">
                ✓ Successfully subscribed! Check your email for confirmation.
              </div>
            </div>
          )}

          {/* Social Proof */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/70 mb-4">Join 50,000+ subscribers and get:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <span>• Weekly style guides</span>
              <span>• Product recommendations</span>
              <span>• Exclusive member pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;