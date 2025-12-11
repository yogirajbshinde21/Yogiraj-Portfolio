import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, MapPin, Send, ArrowRight } from 'lucide-react';
import Toast from './ui/Toast';

const Contact = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2, margin: "-50px" });
  
  // Premium easing - smooth and subtle
  const premiumEase = [0.16, 1, 0.3, 1];
  const bounceEase = [0.34, 1.56, 0.64, 1];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0a7bca81-7725-491d-b622-28fc02e835b0',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setShowToast(true);
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setShowToast(true);
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:jobsforyogiraj21@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/yogirajshinde",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/yogirajbshinde21",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/yogirajshinde21",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  // Sequential form field animation - simple opacity and y
  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.35, 
        delay: i * 0.06,
        ease: premiumEase 
      },
    }),
  };

  // Input focus state for micro-interactions
  const [focusedField, setFocusedField] = useState(null);

  return (
    <>
      {/* Toast Notification */}
      {showToast && submitStatus && (
        <Toast
          message={submitStatus === 'success' ? 'Message sent successfully! I\'ll get back to you soon.' : 'Failed to send message. Please try again.'}
          type={submitStatus}
          onClose={() => {
            setShowToast(false);
            setSubmitStatus(null);
          }}
          duration={5000}
        />
      )}

      <section ref={ref} id="contact" className="relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 bg-neutral-950">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950" />
      
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "-20px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-10 text-center md:mb-16">
          <span className="block mb-3 text-xs font-medium tracking-wider text-teal-400 uppercase md:text-sm md:mb-4">
            Let's Connect
          </span>
          <h2 className="text-3xl tracking-tight text-white font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl">
            Get In Touch
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base md:mt-6 md:text-lg text-neutral-500">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="p-8 transition-all duration-500 border rounded-2xl border-neutral-800 bg-neutral-900/30 hover:border-neutral-700"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: premiumEase }}
            >
              <h3 className="mb-6 text-2xl text-white font-editorial-regular">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <motion.div
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative"
                >
                  <motion.label 
                    htmlFor="name" 
                    className={`block mb-2 text-sm transition-all duration-300 ${
                      focusedField === 'name' ? 'text-teal-400' : 'text-neutral-400'
                    }`}
                    animate={{ x: focusedField === 'name' ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Name
                  </motion.label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 text-white transition-all duration-300 border bg-neutral-800/50 border-neutral-700 rounded-xl placeholder-neutral-500 focus:outline-none input-focus-glow"
                    placeholder="Your name"
                    animate={{ 
                      borderColor: focusedField === 'name' ? 'rgb(45, 212, 191)' : 'rgb(64, 64, 64)',
                      boxShadow: focusedField === 'name' ? '0 0 20px rgba(45, 212, 191, 0.15)' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative"
                >
                  <motion.label 
                    htmlFor="email" 
                    className={`block mb-2 text-sm transition-all duration-300 ${
                      focusedField === 'email' ? 'text-teal-400' : 'text-neutral-400'
                    }`}
                    animate={{ x: focusedField === 'email' ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Email
                  </motion.label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 text-white transition-all duration-300 border bg-neutral-800/50 border-neutral-700 rounded-xl placeholder-neutral-500 focus:outline-none input-focus-glow"
                    placeholder="your.email@example.com"
                    animate={{ 
                      borderColor: focusedField === 'email' ? 'rgb(45, 212, 191)' : 'rgb(64, 64, 64)',
                      boxShadow: focusedField === 'email' ? '0 0 20px rgba(45, 212, 191, 0.15)' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  custom={2}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative"
                >
                  <motion.label 
                    htmlFor="message" 
                    className={`block mb-2 text-sm transition-all duration-300 ${
                      focusedField === 'message' ? 'text-teal-400' : 'text-neutral-400'
                    }`}
                    animate={{ x: focusedField === 'message' ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Message
                  </motion.label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 text-white transition-all duration-300 border resize-none bg-neutral-800/50 border-neutral-700 rounded-xl placeholder-neutral-500 focus:outline-none input-focus-glow"
                    placeholder="Tell me about your project..."
                    animate={{ 
                      borderColor: focusedField === 'message' ? 'rgb(45, 212, 191)' : 'rgb(64, 64, 64)',
                      boxShadow: focusedField === 'message' ? '0 0 20px rgba(45, 212, 191, 0.15)' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 bg-white rounded-full text-neutral-900 hover:bg-teal-400 disabled:opacity-50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-4 h-4 border-2 rounded-full border-neutral-900 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: bounceEase }}
                    >
                      ✓ Sent Successfully!
                    </motion.span>
                  ) : submitStatus === 'error' ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: bounceEase }}
                      className="text-red-500"
                    >
                      ✗ Failed. Try again!
                    </motion.span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Location */}
            <div className="p-6 border rounded-2xl border-neutral-800 bg-neutral-900/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-neutral-800 text-teal-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl text-white font-editorial-regular">Location</h3>
              </div>
              <p className="ml-12 text-neutral-400">Mumbai, Maharashtra, India</p>
            </div>

            {/* Social Links */}
            <div className="p-6 border rounded-2xl border-neutral-800 bg-neutral-900/30">
              <h3 className="mb-6 text-xl text-white font-editorial-regular">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-xl border-neutral-800 bg-neutral-800/30 hover:border-teal-500/30 hover:bg-neutral-800/50 group"
                  >
                    <span className="transition-colors duration-300 text-neutral-400 group-hover:text-teal-400">
                      {link.icon}
                    </span>
                    <span className="text-sm text-neutral-300">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 border rounded-2xl border-neutral-800 bg-neutral-900/30">
              <h3 className="mb-4 text-xl text-white font-editorial-regular">Quick Info</h3>
              <div className="space-y-3 text-sm text-neutral-400">
                <p className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-500" />
                  Open to full‑time & freelance
                </p>
                <p className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-500" />
                  Prefer email or LinkedIn for opportunities
                </p>
                <p className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-500" />
                  Typically replies within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
    </>
  );
};

export default Contact;
