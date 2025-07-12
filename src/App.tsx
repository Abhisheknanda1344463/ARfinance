import React, { useState } from 'react';
import favicon from '/assets/ARlogo.png';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Home, 
  Building, 
  Globe, 
  IndianRupee, 
  Car, 
  CreditCard, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Users, 
  Award,
  Menu,
  X
} from 'lucide-react';
import Logo from './components/Logo';
import EMICalculator from './components/EMICalculator';
import emailjs from 'emailjs-com';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loanAmount: '',
    message: ''
  });

  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = favicon;
    document.head.appendChild(link);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // EmailJS config
    const serviceID = 'service_sic5nxq';
    const admin_templateID = 'template_5f4hhzd';
    const client_templateID = 'template_h7sl6wz';
    const userID = 'hn7wfbbzlMFM3ptCn';

    const templateParams = {
      to_email: 'abhisheknanda94@gmail.com',
      from_name: formData.name,
      phone: formData.phone,
      email: formData.email,
      loanAmount: formData.loanAmount,
      message: formData.message,
      details: `Hey Bharat,\n\nName: ${formData.name}\nMobile: ${formData.phone}\nEmail: ${formData.email}\nAmount Inquiry: ${formData.loanAmount}\nMessage: ${formData.message}\n\nPlease call this person.`,
    };

    const userParams = {
      from_name: formData.name,
      to_email: formData.email,
      // message: `Hi ${formData.name},\n\nThank you for reaching out to AR Finance. We’ve received your loan inquiry and our team will get in touch with you shortly.\n\nRegards,\nTeam AR Finance`,
    };

    try {
      await emailjs.send(serviceID, admin_templateID, templateParams, userID);
      await emailjs.send(serviceID, client_templateID, userParams, userID);
      alert('Thank you for your inquiry! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', loanAmount: '', message: '' });
    } catch (error) {
      console.error(error) 
      alert('There was an error sending your inquiry. Please try again later.');
    }
  };

  const services = [
    { icon: Home, title: 'Home Loans', description: 'Flexible home financing solutions for your dream property' },
    { icon: MapPin, title: 'Residential Plot Loan', description: 'Secure funding for residential land purchases' },
    { icon: Globe, title: 'NRI Home Loans', description: 'Special loan programs for Non-Resident Indians' },
    { icon: Building, title: 'Loan Against Property', description: 'Unlock the value of your existing property' },
    { icon: Building, title: 'Commercial Property Purchase Loan', description: 'Finance your commercial real estate investments' },
    { icon: MapPin, title: 'Commercial Plot Purchase Loan', description: 'Funding for commercial land acquisition' },
    { icon: Car, title: 'Used Car Loan', description: 'Affordable financing for pre-owned vehicles' },
    { icon: Car, title: 'New Car Loan', description: 'Drive home your dream car with easy EMIs' },
    { icon: CreditCard, title: 'Overdraft Limit Facility', description: 'Flexible credit line for your financial needs' },
    { icon: TrendingUp, title: 'Working Capital Loans', description: 'Boost your business operations and cash flow' }
  ];

  const whyChooseUs = [
    { icon: Clock, title: 'Fast and Easy Approval Process', description: 'Get approved quickly with minimal documentation' },
    { icon: CheckCircle, title: 'Tailored Loan Solutions', description: 'Customized financial products to meet your unique needs' },
    { icon: Award, title: 'Expert Financial Guidance', description: 'Professional advice from experienced financial consultants' },
    { icon: Users, title: 'Trusted by Hundreds of Clients', description: 'Proven track record of satisfied customers' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#why-choose" className="text-gray-700 hover:text-blue-600 transition-colors">Why Choose Us</a>
              <a href="#emi-calculator" className="text-gray-700 hover:text-blue-600 transition-colors">EMI Calculator</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4">
              <a href="#home" className="block py-2 text-gray-700 hover:text-blue-600">Home</a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
              <a href="#why-choose" className="block py-2 text-gray-700 hover:text-blue-600">Why Choose Us</a>
              <a href="#emi-calculator" className="block py-2 text-gray-700 hover:text-blue-600">EMI Calculator</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Partner in <span className="text-blue-300">Financial Growth</span>
              </h2>
              <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                Empowering your dreams with flexible loan solutions. From home loans to business funding, we make financial goals achievable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105"
                >
                  Get in Touch
                </a>
                <a 
                  href="#services" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions tailored to meet your personal and business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <service.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AR Finance?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our customer-centric approach and proven expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <EMICalculator />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to take the next step? Contact us today for a free consultation
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount Required
                  </label>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount (e.g., 1000000)"
                    min="50000"
                    step="50000"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your loan requirements and any specific needs"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="bg-blue-900 text-white rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-300 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-blue-100">+91 9501535114</p>
                    <p className="text-blue-100">+91 9878535114</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-300 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-blue-100">bharat@arfinance.info</p>
                    <p className="text-blue-100">support@arfinance.info</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-300 mr-4 mt-1" />
                  <div className="flex flex-col w-full">
                    <h4 className="font-semibold mb-1">Address</h4>
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                      <div>
                        <p className="text-blue-100">157 Industrial Area, Sector 62<br />Sahibzada Ajit Singh Nagar <br />Punjab</p>160055 India
                        <p className="text-blue-100 mt-2 font-semibold">GST: 03BZEPS9368H1ZW</p>
                      </div>
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=157+Industrial+Area,+Sector+62,+Sahibzada+Ajit+Singh+Nagar,+Punjab+160055,+India&output=embed"
                        width="220"
                        height="120"
                        style={{ border: 0, borderRadius: '0.5rem', marginTop: '0.5rem' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="mt-2 md:mt-0"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-blue-500 relative" style={{ minHeight: '90px' }}>
                <div>
                  <h4 className="font-semibold mb-4">Business Hours</h4>
                  <div className="space-y-2 text-blue-100">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed (You can connect us - 24*7 on email and Mobile)</p>
                  </div>
                </div>
                {/* <div className="absolute right-0 bottom-2 text-blue-100 text-sm whitespace-nowrap">
                  You can connect us - 24*7 on email and Mobile
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Logo textColor="text-blue-400" className="mb-4" />
              <p className="text-gray-400 mb-4">
                Your trusted partner in financial growth. We provide comprehensive loan solutions 
                to help you achieve your personal and business goals.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#why-choose" className="hover:text-white transition-colors">Why Choose Us</a></li>
                <li><a href="#emi-calculator" className="hover:text-white transition-colors">EMI Calculator</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Home Loans</li>
                <li>Car Loans</li>
                <li>Business Loans</li>
                <li>Personal Loans</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AR Finance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;