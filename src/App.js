import React, { useState, useRef } from 'react';

// --- Constants ---
// Centralized navigation links
const NAV_LINKS = [
    { id: 'home', name: 'Home' },
    { id: 'services', name: 'Services' },
    { id: 'why-us', name: 'Why Us' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'blog', name: 'Blog' },
    { id: 'contact', name: 'Contact' },
];

// Centralized WhatsApp contact details
const WHATSAPP_PHONE_NUMBER = '97474464994';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello Noor Digital Solution, I would like to inquire about your services.');

// Formspree endpoint for Contact Us form
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORMSPREE_FORM_ID"; // IMPORTANT: Replace 'YOUR_FORMSPREE_FORM_ID' with your actual Formspree form ID

// Testimonials Data
const TESTIMONIALS_DATA = [
    {
        quote: "Noor Digital Solution transformed our inventory management. Their ERP system is intuitive, and their support team is outstanding and always available.",
        author: "Ahmed Al-Kuwari",
        title: "CEO of a leading retail group",
        avatarBg: "bg-accent"
    },
    {
        quote: "The POS system we got is fast, reliable, and fully compliant. It has made a huge difference in our daily operations and customer satisfaction.",
        author: "Fatima Al-Mansoori",
        title: "Owner of a popular restaurant chain",
        avatarBg: "bg-accentMedium"
    }
];

// Blog Articles Data
const BLOG_ARTICLES = [
    {
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=60",
        alt: "Team discussing ERP strategy on a whiteboard",
        title: "Choosing the Right ERP for Your Business in Qatar",
        description: "A guide to selecting an ERP that fits your needs and complies with local regulations.",
        link: "#" // Placeholder link
    },
    {
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
        alt: "Modern restaurant counter with a POS system",
        title: "The Future of POS in the Hospitality Sector",
        description: "How modern POS technology is revolutionizing customer service and efficiency.",
        link: "#" // Placeholder link
    },
    {
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=60",
        alt: "Person working on a laptop with security icons overlay",
        title: "Cybersecurity for Small Businesses in Doha",
        description: "Protect your business from digital threats with these essential security practices.",
        link: "#" // Placeholder link
    }
];


// --- Header Component ---
const Header = ({ navigateTo, isMobileMenuOpen, setIsMobileMenuOpen, currentPage }) => {
    return (
        <header id="header" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <a href="#home" onClick={() => navigateTo('home')} className="flex items-center">
                        {/* New SVG Logo based on Brand Kit */}
                        <svg className="h-10" viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#0A6E77">
                                <rect x="0" y="0" width="8" height="8"></rect><rect x="0" y="9" width="8" height="8"></rect><rect x="0" y="18" width="8" height="8"></rect><rect x="0" y="27" width="8" height="8"></rect>
                                <rect x="9" y="9" width="8" height="8"></rect><rect x="18" y="18" width="8" height="8"></rect>
                                <rect x="27" y="0" width="8" height="8"></rect><rect x="27" y="9" width="8" height="8"></rect><rect x="27" y="18" width="8" height="8"></rect><rect x="27" y="27" width="8" height="8"></rect>
                                <rect x="36" y="0" width="8" height="8"></rect><rect x="45" y="0" width="8" height="8"></rect>
                            </g>
                            <text x="65" y="18" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" fill="#3D3B3C">NOOR</text>
                            <text x="65" y="32" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="500" fill="#3D3B3C">Digital Solutions</text>
                        </svg>
                    </a>

                    <nav className="hidden md:flex items-center space-x-6">
                        {NAV_LINKS.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => navigateTo(link.id)}
                                className={`font-medium hover:text-accent transition-colors ${currentPage === link.id ? 'text-accent' : ''}`}
                                aria-current={currentPage === link.id ? 'page' : undefined}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                            aria-label="WhatsApp Us"
                        >
                            <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                        <a
                            href="#contact"
                            onClick={() => navigateTo('contact')}
                            className="bg-accent text-white px-5 py-2 rounded-lg font-medium hover:bg-accentDark transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started
                        </a>
                    </nav>

                    <button
                        id="mobile-menu-button"
                        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`md:hidden bg-white shadow-lg ${isMobileMenuOpen ? '' : 'hidden'}`}>
                <div className="container px-4 py-3 space-y-2">
                    {NAV_LINKS.map(link => (
                        <a
                            key={`mobile-${link.id}`}
                            href={`#${link.id}`}
                            onClick={() => navigateTo(link.id)}
                            className="block py-2 hover:text-accent rounded-md px-2"
                            aria-current={currentPage === link.id ? 'page' : undefined}
                        >
                            {link.name}
                        </a>
                    ))}
                     <a
                        href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-green-500 text-white text-center py-2 rounded-md mt-2 flex items-center justify-center gap-2"
                        aria-label="WhatsApp Us"
                    >
                        <i className="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    <a
                        href="#contact"
                        onClick={() => navigateTo('contact')}
                        className="block bg-accent text-white text-center py-2 rounded-md mt-2"
                        aria-label="Get Started"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </header>
    );
};

// --- Home Section Component ---
const HomeSection = ({ sectionRef, navigateTo }) => (
    <section ref={sectionRef} id="home" className="hero-bg min-h-screen flex items-center text-white pt-20">
        <div className="container mx-auto px-4 py-20 fade-in">
            <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                    Future-Proof Your Business in Qatar
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                    We deliver intelligent ERP & POS solutions, fully compliant with Qatar's regulations, to streamline your operations and drive growth.
                </p>
                <div className="flex flex-wrap gap-4">
                    <a href="tel:+97474464994" className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg" aria-label="Call Noor Digital Solution">
                        <i className="fas fa-phone-alt mr-2"></i> Call Now: 7446 4994
                    </a>
                    <a href="#services" onClick={() => navigateTo('services')} className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors" aria-label="Explore Our Services">
                        Explore Our Services
                    </a>
                </div>
            </div>
        </div>
    </section>
);

// --- Why Us Section Component ---
const WhyUsSection = ({ sectionRef }) => (
    <section ref={sectionRef} id="why-us" className="py-20 bg-lightGray"> {/* Adjusted padding */}
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner with Noor Digital Solution?</h2>
                <p className="text-gray-600 text-lg">
                    We are dedicated to providing technology that empowers your business and ensures compliance and efficiency.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <i className="fas fa-check-circle text-accent text-4xl mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">100% Qatar Compliant</h3>
                    <p className="text-gray-600">Our solutions meet all local financial and regulatory standards, giving you peace of mind.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <i className="fas fa-headset text-accent text-4xl mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">24/7 Expert Support</h3>
                    <p className="text-gray-600">Dedicated assistance is just a call away at <a href="tel:+97474464994" className="phone-number hover:underline">7446 4994</a>.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <i className="fas fa-star text-accent text-4xl mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">Proven Expertise</h3>
                    <p className="text-gray-600">With 10+ years of experience, we have a deep understanding of the local market challenges and opportunities.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <i className="fas fa-users text-accent text-4xl mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">50+ Satisfied Clients</h3>
                    <p className="text-gray-600">A growing portfolio of successful partnerships and implementations across various industries.</p>
                </div>
            </div>
        </div>
    </section>
);

// --- Services Section Component ---
const ServicesSection = ({ sectionRef }) => {
    const [businessChallenge, setBusinessChallenge] = useState('');
    const [solutions, setSolutions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateSolutions = async () => {
        setSolutions([]);
        setError('');

        if (!businessChallenge.trim()) {
            setError("Please enter a business challenge to generate solutions.");
            return;
        }

        setIsLoading(true);

        const prompt = `Given the following business challenge for a company operating in Qatar, suggest potential digital and AI-powered solutions that a company like Noor Digital Solution (an IT solutions provider) could provide. Focus on practical applications and potential benefits. Provide 3-5 distinct solution ideas, each with a concise title and a brief description. Respond only with a JSON array of objects, where each object has "title" and "description" properties.

        Business Challenge: ${businessChallenge}
        `;

        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                "title": { "type": "STRING" },
                                "description": { "type": "STRING" }
                            },
                            "propertyOrdering": ["title", "description"]
                        }
                    }
                }
            };
            const apiKey = ""; // Canvas will automatically provide this in runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const jsonString = result.candidates[0].content.parts[0].text;
                try {
                    const parsedSolutions = JSON.parse(jsonString);
                    if (Array.isArray(parsedSolutions) && parsedSolutions.every(item => typeof item === 'object' && item !== null && 'title' in item && 'description' in item)) {
                        if (parsedSolutions.length > 0) {
                            setSolutions(parsedSolutions);
                        } else {
                            setError("AI generated no specific solutions. Please try rephrasing your challenge.");
                        }
                    } else {
                        setError("AI generated an unexpected response format. Please try again.");
                        console.error("Malformed AI response:", parsedSolutions);
                    }
                } catch (parseError) {
                    setError("Failed to parse AI response. Please try again.");
                    console.error("JSON parse error:", parseError, "Raw response:", jsonString);
                }
            } else {
                setError("No solutions could be generated. The AI might not have understood the request or encountered an internal issue. Please try a different challenge.");
                console.error("No candidates or content in AI response:", result);
            }
        } catch (err) {
            setError("Failed to connect to AI service. Please check your network or try again later.");
            console.error("AI API Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section ref={sectionRef} id="services" className="py-20 bg-primary"> {/* Adjusted padding */}
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Digital Solutions</h2>
                    <p className="text-gray-600 text-lg">
                        Tailored technology services designed for Qatar's unique business landscape.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* ERP Solutions - Prominent */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-5 text-accent">
                            <i className="fas fa-cogs text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">ERP Systems</h3>
                        <p className="text-gray-600 mb-4">
                            Integrate all core business processes for enhanced efficiency and real-time insights.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-accent mr-3"></i><span>Financial Management</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accent mr-3"></i><span>Inventory & Supply Chain</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accent mr-3"></i><span>Human Resources & Payroll</span></li>
                        </ul>
                    </div>
                    {/* POS Solutions - Prominent */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-accentMedium/10 rounded-full flex items-center justify-center mb-5 text-accentMedium">
                            <i className="fas fa-cash-register text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">POS Systems</h3>
                        <p className="text-gray-600 mb-4">
                            User-friendly and powerful Point of Sale solutions for retail and hospitality.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-accentMedium mr-3"></i><span>Retail & Restaurant Ready</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentMedium mr-3"></i><span>Seamless Inventory Sync</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentMedium mr-3"></i><span>Customer Relationship Tools</span></li>
                        </ul>
                    </div>
                    {/* IT Consultancy */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-5 text-secondary">
                                <i className="fas fa-laptop-code text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">IT Consultancy</h3>
                            <p className="text-gray-600 mb-4">
                                Strategic guidance to navigate the digital landscape and achieve your business goals.
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center"><i className="fas fa-check text-secondary mr-3"></i><span>Digital Transformation</span></li>
                                <li className="flex items-center"><i className="fas fa-check text-secondary mr-3"></i><span>Cloud & Cybersecurity</span></li>
                                <li className="flex items-center"><i className="fas fa-check text-secondary mr-3"></i><span>Compliance & Strategy</span></li>
                            </ul>
                        </div>
                    {/* Accounting Software */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-5 text-accent">
                            <i className="fas fa-calculator text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Accounting Software</h3>
                        <p className="text-gray-600 mb-4">
                            Robust and compliant accounting solutions for precise financial management.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-accent mr-3"></i><span>Automated Bookkeeping</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accent mr-3"></i><span>Financial Reporting</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accent mr-3"></i><span>Tax Compliance</span></li>
                        </ul>
                    </div>
                    {/* Restaurant Management */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-accentMedium/10 rounded-full flex items-center justify-center mb-5 text-accentMedium">
                            <i className="fas fa-utensils text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Restaurant Solutions</h3>
                        <p className="text-gray-600 mb-4">
                            Comprehensive software for restaurant operations, from order management to delivery.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-accentMedium mr-3"></i><span>Table & Order Management</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentMedium mr-3"></i><span>Kitchen Display Systems</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentMedium mr-3"></i><span>Online Ordering Integration</span></li>
                        </ul>
                    </div>
                    {/* Laundry Management */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-5 text-secondary">
                            <i className="fas fa-laundry-machine text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Laundry Management</h3>
                        <p className="text-gray-600 mb-4">
                            Streamline your laundry business with smart order tracking, billing, and customer management.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-secondary mr-3"></i><span>Order Tracking & Status</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-secondary mr-3"></i><span>Automated Billing</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-secondary mr-3"></i><span>Customer Database</span></li>
                        </ul>
                    </div>
                    {/* Salon Management */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-accentLight/10 rounded-full flex items-center justify-center mb-5 text-accentLight">
                            <i className="fas fa-cut text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Salon & Spa Solutions</h3>
                        <p className="text-gray-600 mb-4">
                            Efficient salon operations with appointment scheduling, staff management, and client history.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-accentLight mr-3"></i><span>Appointment Booking</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentLight mr-3"></i><span>Staff & Commission Management</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentLight mr-3"></i><span>Client Records</span></li>
                        </ul>
                    </div>
                    {/* Supermarket Solutions */}
                    <div className="bg-lightGray p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-accentDark/10 rounded-full flex items-center justify-center mb-5 text-accentDark">
                            <i className="fas fa-store text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Supermarket Software</h3>
                        <p className="text-gray-600 mb-4">
                            Integrated solutions for supermarkets, including inventory, sales, and loyalty programs.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center"><i className="fas fa-check text-accentDark mr-3"></i><span>Real-time Inventory</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentDark mr-3"></i><span>Pricing & Promotions</span></li>
                            <li className="flex items-center"><i className="fas fa-check text-accentDark mr-3"></i><span>Loyalty Programs</span></li>
                        </ul>
                    </div>
                </div>

                {/* AI Solution Ideator Section */}
                <div className="mt-20 p-8 rounded-xl bg-accentLight/10 shadow-lg border border-accentLight">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-accent mb-4">
                            ✨ AI Solution Ideator ✨
                        </h3>
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                            Describe a business challenge you're facing, and our AI will suggest potential digital and AI-powered solutions tailored for businesses in Qatar.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <textarea
                            id="business-challenge-input"
                            placeholder="E.g., 'Automating customer support queries' or 'Improving data analysis for sales forecasts'..."
                            rows="4"
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition resize-y text-gray-800 bg-white"
                            aria-label="Business Challenge Input"
                            value={businessChallenge}
                            onChange={(e) => setBusinessChallenge(e.target.value)}
                        ></textarea>
                        <button
                            id="generate-solutions-button"
                            className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accentDark transition-all duration-300 transform hover:scale-105 flex-shrink-0 flex items-center justify-center gap-2"
                            aria-label="Generate AI Solutions"
                            onClick={generateSolutions}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <span>Generate Solutions</span>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}

                    <div id="solutions-output" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {solutions.map((sol, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-accentLight/30">
                                <h4 className="text-xl font-bold text-accent mb-2">{sol.title}</h4>
                                <p className="text-gray-700">{sol.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );

// --- Testimonials Section Component ---
const TestimonialsSection = ({ sectionRef }) => (
    <section ref={sectionRef} id="testimonials" className="py-20 bg-lightGray"> {/* Adjusted padding */}
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {TESTIMONIALS_DATA.map((testimonial, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                        <p className="text-gray-600 text-lg mb-6 italic">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                           <div className={`w-12 h-12 rounded-full ${testimonial.avatarBg} text-white flex items-center justify-center font-bold text-xl mr-4`}>
                               {testimonial.author.charAt(0)}
                           </div>
                           <div>
                                <p className="font-bold text-lg">- {testimonial.author}</p>
                                <p className="text-sm text-gray-500">{testimonial.title}</p>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// --- Blog Section Component ---
const BlogSection = ({ sectionRef }) => (
    <section ref={sectionRef} id="blog" className="py-20 bg-primary"> {/* Adjusted padding */}
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights from Our Experts</h2>
                <p className="text-gray-600 text-lg">Stay informed with our latest articles on digital transformation, compliance, and industry trends in Qatar.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_ARTICLES.map((article, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                        <img src={article.image} alt={article.alt} className="w-full h-56 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                            <p className="text-gray-600 mb-4">{article.description}</p>
                            <a href={article.link} className="font-semibold text-accent hover:underline">Read More &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// --- Contact Section Component ---
const ContactSection = ({ sectionRef }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastTimeoutId, setToastTimeoutId] = useState(null); // State to store timeout ID
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear any existing toast timeout before showing a new one
        if (toastTimeoutId) {
            clearTimeout(toastTimeoutId);
        }
        setShowToast(false); // Hide any previous toast immediately

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setToastMessage('Your message has been sent successfully!');
                setShowToast(true);
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form fields
            } else {
                const data = await response.json();
                if (data.errors) {
                    setToastMessage(`Submission failed: ${data.errors.map(error => error.message).join(', ')}`);
                } else {
                    setToastMessage('Form submission failed. Please try again.');
                }
                setShowToast(true);
            }
        } catch (error) {
            console.error('Network or submission error:', error);
            setToastMessage('Network error. Please try again later.');
            setShowToast(true);
        } finally {
            // Set a new timeout and store its ID
            const id = setTimeout(() => setShowToast(false), 3000);
            setToastTimeoutId(id);
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="py-20 bg-lightGray"> {/* Adjusted padding */}
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-600 text-lg">Ready to transform your business? Contact us today for a free consultation.</p>
                </div>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Your Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Your Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">Subject</label>
                            <input type="text" id="subject" name="_subject" placeholder="What is this regarding?" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition" value={formData.subject} onChange={handleChange} required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Your Message</label>
                            <textarea id="message" name="message" placeholder="Tell us how we can help..." rows="5" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-accent text-white px-10 py-3 rounded-lg font-semibold hover:bg-accentDark transition-all duration-300 transform hover:scale-105 shadow-lg">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
            {showToast && (
                <div id="toast" className="fixed bottom-5 right-5 bg-accent text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50" role="status" aria-live="polite">
                    <i className="fas fa-check-circle mr-3"></i>
                    <span>{toastMessage}</span>
                </div>
            )}
        </section>
    );
};

// --- Footer Component ---
const Footer = ({ navigateTo }) => (
    <footer className="bg-secondary text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
                {/* About */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <a href="#home" onClick={() => navigateTo('home')} className="flex items-center mb-4">
                        <svg className="h-10" viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#43B7C4">
                                <rect x="0" y="0" width="8" height="8"></rect><rect x="0" y="9" width="8" height="8"></rect><rect x="0" y="18" width="8" height="8"></rect><rect x="0" y="27" width="8" height="8"></rect>
                                <rect x="9" y="9" width="8" height="8"></rect><rect x="18" y="18" width="8" height="8"></rect>
                                <rect x="27" y="0" width="8" height="8"></rect><rect x="27" y="9" width="8" height="8"></rect><rect x="27" y="18" width="8" height="8"></rect><rect x="27" y="27" width="8" height="8"></rect>
                                <rect x="36" y="0" width="8" height="8"></rect><rect x="45" y="0" width="8" height="8"></rect>
                            </g>
                            <text x="65" y="18" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" fill="white">NOOR</text>
                            <text x="65" y="32" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="500" fill="white">Digital Solutions</text>
                        </svg>
                    </a>
                    <p className="text-gray-400">
                        Your trusted partner for premier digital solutions in Qatar's dynamic business landscape.
                    </p>
                </div>
                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-2">
                        {NAV_LINKS.map(link => (
                             <li key={`footer-${link.id}`}><a href={`#${link.id}`} onClick={() => navigateTo(link.id)} className="text-gray-400 hover:text-white transition-colors">{link.name}</a></li>
                        ))}
                    </ul>
                </div>
                {/* Services */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
                    <ul className="space-y-2">
                        <li><a href="#services" onClick={() => navigateTo('services')} className="text-gray-400 hover:text-white transition-colors">ERP Systems</a></li>
                        <li><a href="#services" onClick={() => navigateTo('services')} className="text-gray-400 hover:text-white transition-colors">POS Solutions</a></li>
                        <li><a href="#services" onClick={() => navigateTo('services')} className="text-gray-400 hover:text-white transition-colors">IT Consultancy</a></li>
                    </ul>
                </div>
                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                    <div className="space-y-3 text-gray-400">
                        <div className="flex items-start">
                            <i className="fas fa-map-marker-alt mt-1 mr-3 text-accentLight"></i>
                            <span>Doha, Qatar</span>
                        </div>
                        <div className="flex items-start">
                            <i className="fas fa-phone-alt mt-1 mr-3 text-accentLight"></i>
                            <a href="tel:+97474464994" className="hover:text-white transition-colors">7446 4994</a>
                        </div>
                        <div className="flex items-start">
                            <i className="fas fa-envelope mt-1 mr-3 text-accentLight"></i>
                            <a href="mailto:info@noordigital.com" className="hover:text-white transition-colors">info@noordigital.com</a>
                        </div>
                         <div className="flex items-start">
                            <i className="fab fa-whatsapp mt-1 mr-3 text-accentLight"></i>
                            <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Us</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">&copy; 2025 Noor Digital Solution W.L.L. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://linkedin.com/company/noor-digital-solution" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://twitter.com/noordigitalqa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><i className="fab fa-twitter"></i></a>
                    <a href="https://instagram.com/noordigitalqa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </footer>
);


// --- Main App Component ---
function App() {
    const [currentPage, setCurrentPage] = useState('home'); // State for client-side navigation
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    // Create refs for each section
    const sectionRefs = {
        home: useRef(null),
        services: useRef(null),
        'why-us': useRef(null), // Corrected to match ID
        testimonials: useRef(null),
        blog: useRef(null),
        contact: useRef(null),
    };

    // Function to handle navigation using refs
    const navigateTo = (pageId) => {
        setCurrentPage(pageId);
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
        const sectionRef = sectionRefs[pageId];
        if (sectionRef && sectionRef.current) {
            const headerHeight = document.getElementById('header').offsetHeight; // Get header height dynamically
            window.scrollTo({
                top: sectionRef.current.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="App">
            {/* Top Contact Bar */}
            <div className="bg-secondary text-white py-2 px-4 text-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <a href="tel:+97474464994" className="hover:text-accentLight transition-colors flex items-center" aria-label="Call Noor Digital Solution">
                            <i className="fas fa-phone-alt mr-2"></i>
                            <span className="phone-number" style={{color: '#43B7C4'}}>7446 4994</span>
                        </a>
                        <a href="mailto:info@noordigital.com" className="hover:text-accentLight transition-colors flex items-center" aria-label="Email info@noordigital.com">
                            <i className="fas fa-envelope mr-2"></i>
                            <span className="hidden md:inline">info@noordigital.com</span>
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="https://linkedin.com/company/noor-digital-solution" target="_blank" rel="noopener noreferrer" className="hover:text-accentLight transition-colors" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://twitter.com/noordigitalqa" target="_blank" rel="noopener noreferrer" className="hover:text-accentLight transition-colors" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com/noordigitalqa" target="_blank" rel="noopener noreferrer" className="hover:text-accentLight transition-colors" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            <Header 
                navigateTo={navigateTo} 
                isMobileMenuOpen={isMobileMenuOpen} 
                setIsMobileMenuOpen={setIsMobileMenuOpen} 
                currentPage={currentPage} // Pass currentPage for active link highlighting
            />

            <main>
                {/* Render sections, passing their refs */}
                <HomeSection sectionRef={sectionRefs.home} navigateTo={navigateTo} />
                <ServicesSection sectionRef={sectionRefs.services} />
                <WhyUsSection sectionRef={sectionRefs['why-us']} /> {/* Corrected ref usage */}
                <TestimonialsSection sectionRef={sectionRefs.testimonials} />
                <BlogSection sectionRef={sectionRefs.blog} />
                <ContactSection sectionRef={sectionRefs.contact} />
            </main>

            <Footer navigateTo={navigateTo} /> {/* Pass navigateTo to Footer */}
        </div>
    );
}

export default App;
