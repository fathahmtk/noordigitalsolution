import React, { useState, useEffect, useRef } from 'react';
// Styles are now inline within this component for self-containment and simplified deployment.

// Main App Component
function App() {
    const [currentPage, setCurrentPage] = useState('home'); // State for client-side navigation
    const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false); // State for mobile menu

    // Function to handle navigation
    const navigateTo = (pageId) => {
        setCurrentPage(pageId);
        // Scroll to the top of the section, if it's not 'home'
        // For actual scrolling, React refs or a smooth scroll library would be used with page transitions.
        const section = document.getElementById(pageId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMobileMenuMenuOpen(false); // Close mobile menu on navigation
    };

    // Header Component
    const Header = ({ navigateTo, isMobileMenuOpen, setIsMobileMenuMenuOpen }) => {
        const navLinks = [
            { id: 'home', name: 'Home' },
            { id: 'about', name: 'About Us' },
            { id: 'solutions-services', name: 'Solutions/Services' },
            { id: 'blog', name: 'Blog' },
            { id: 'contact', name: 'Contact Us' },
        ];

        return (
            <header id="header" className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-md shadow-lg py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Logo Mark - CSS styled */}
                        <div className="logo-mark mr-4" role="img" aria-label="Noor Digital Solution Logo: Gradient Circle with Diamond"></div>
                        <h1 className="text-3xl font-black text-white">Noor <span className="primary-gradient-text">Digital</span> Solution</h1>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
                        {navLinks.map(link => (
                            <a 
                                key={link.id}
                                href={`#${link.id}`} 
                                className={`nav-link text-gray-400 hover:text-white transition-colors duration-300 ${currentPage === link.id ? 'active' : ''}`}
                                onClick={() => navigateTo(link.id)}
                                aria-label={`Go to ${link.name} section`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    
                    {/* Mobile Menu Toggle Button */}
                    <button 
                        className="md:hidden mobile-toggle cursor-pointer" 
                        id="mobile-menu-button" 
                        aria-label="Open mobile navigation menu"
                        onClick={() => setIsMobileMenuMenuOpen(true)}
                    >
                        ☰
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div id="mobile-menu-overlay" className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} aria-hidden={!isMobileMenuOpen} onClick={() => setIsMobileMenuMenuOpen(false)}></div>
                    
                    {/* Mobile Navigation Menu */}
                    <nav id="mobile-nav-menu" className={`mobile-nav-menu ${isMobileMenuOpen ? 'active' : ''}`} aria-label="Mobile Navigation">
                        <button 
                            className="mobile-close-btn" 
                            id="mobile-close-button" 
                            aria-label="Close mobile navigation menu"
                            onClick={() => setIsMobileMenuMenuOpen(false)}
                        >
                            ✖
                        </button>
                        <ul>
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <a 
                                        href={`#${link.id}`} 
                                        className="nav-link" 
                                        onClick={() => navigateTo(link.id)}
                                        aria-label={`Go to ${link.name} section`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    };

    // Hero Section Component
    const HeroSection = ({ navigateTo }) => {
        const canvasRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let particles = [];
            
            // Define helper functions inside useEffect or before their usage
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 1.5 + 0.5;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                    this.color = `rgba(169, 169, 169, ${Math.random() * 0.5 + 0.2})`; // Light particles for dark background
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.size > 0.2) this.size -= 0.01;
                    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                }

                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            const initParticles = () => {
                particles = [];
                const numberOfParticles = (canvas.width * canvas.height) / 9000; // Density
                for (let i = 0; i < numberOfParticles; i++) {
                    particles.push(new Particle());
                }
            };
            
            const connectParticles = () => {
                for (let a = 0; a < particles.length; a++) {
                    for (let b = a; b < particles.length; b++) {
                        const dx = particles[a].x - particles[b].x;
                        const dy = particles[a].y - particles[b].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            const opacity = 1 - distance / 100;
                            ctx.strokeStyle = `rgba(169, 169, 169, ${opacity * 0.5})`; // Light lines for dark background
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            };

            const animateParticles = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                connectParticles();
                requestAnimationFrame(animateParticles);
            };

            const setCanvasSize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initParticles(); // Re-initialize particles on resize
            };
            
            window.addEventListener('resize', setCanvasSize);
            setCanvasSize(); // Initial call

            animateParticles(); // Start animation loop

            // Cleanup function for unmounting
            return () => {
                window.removeEventListener('resize', setCanvasSize);
            };
        }, []); // Empty dependency array ensures this runs once on mount

        return (
            <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20" aria-labelledby="hero-heading">
                <canvas ref={canvasRef} id="hero-canvas"></canvas>
                <div className="relative z-10 px-6 py-12 fade-in container mx-auto">
                    <div className="
                        flex flex-col items-center text-center /* Default (Mobile) */
                        md:flex-col md:items-center md:text-center /* Tablet: Stacked, Centered */
                        lg:grid lg:grid-cols-3 lg:gap-12 lg:items-center lg:text-left /* Desktop: 3-column */
                    ">
                        {/* Graphical Human Head (Left on Desktop, Top on Tablet/Mobile) */}
                        <div className="
                            mb-10 /* Mobile */
                            md:mb-10 /* Tablet */
                            lg:mb-0 lg:order-1 lg:flex lg:justify-center /* Desktop: Order 1, Centered within its col */
                        ">
                            <span className="hero-graphic-head" aria-hidden="true" title="Artificial Intelligence Symbol">🧠</span>
                        </div>

                        {/* Headline & Subtext (Center on Desktop, Middle on Tablet/Mobile) */}
                        <div className="
                            mb-10 /* Mobile */
                            md:mb-10 /* Tablet */
                            lg:mb-0 lg:order-2 lg:col-span-1 /* Desktop: Order 2, spans 1 col */
                            hero-content-mobile-centered md:hero-content-tablet-centered lg:hero-content-desktop-center
                        ">
                            <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4">
                                Empowering Intelligence. <br/><span className="primary-gradient-text">Transforming Tomorrow.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300">
                                We fuse cutting-edge AI with strategic digital solutions to unlock unparalleled growth and efficiency for your enterprise.
                            </p>
                        </div>

                        {/* Call-to-Action Buttons (Right on Desktop, Bottom on Tablet/Mobile) */}
                        <div className="
                            flex flex-col sm:flex-row gap-4 /* Mobile: Stacked, then row on sm */
                            justify-center /* Mobile: Centered */
                            md:justify-center /* Tablet: Centered */
                            lg:justify-end lg:order-3 lg:col-span-1 /* Desktop: Order 3, right-aligned */
                            hero-buttons-mobile-centered md:hero-buttons-tablet-centered lg:hero-buttons-desktop-centered
                        ">
                            <button 
                                onClick={() => navigateTo('solutions-services')}
                                className="px-8 py-4 primary-gradient-bg text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105" 
                                aria-label="Explore Our Solutions"
                            >
                                Explore Our Solutions
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // About Us Section Component
    const AboutSection = () => {
        return (
            <section id="about" className="py-20 md:py-32 bg-[#0a0a1a]/80" aria-labelledby="about-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="about-heading" className="text-4xl md:text-5xl font-black text-white mb-4">About Us</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Noor Digital Solution is a pioneering tech company based in Qatar, dedicated to empowering businesses with cutting-edge AI and digital transformation expertise.</p>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
                        <div className="lg:w-1/2 mb-10 lg:mb-0">
                            {/* Placeholder for image or animation */}
                            <div className="bg-gray-900/60 rounded-xl p-8 h-80 flex items-center justify-center glow-border">
                                <span className="text-6xl primary-gradient-text">💡 Innovation Hub 💡</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h3 className="text-3xl font-bold text-white mb-6">Our Mission & Values</h3>
                            <p className="text-gray-300 mb-4">At Noor Digital Solution, we believe in a future where technology amplifies human potential. Our mission is to deliver innovative, robust, and secure digital solutions that drive efficiency, foster growth, and provide a competitive edge for our clients.</p>
                            <p className="text-gray-300">We are committed to excellence, integrity, and client-centric collaboration. Our team of experts works tirelessly to understand your unique challenges and craft tailored solutions that exceed expectations and align with Qatar's vision for a digital economy.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // Solutions / Services Section Component
    const SolutionsServicesSection = ({ navigateTo }) => {
        const [businessChallenge, setBusinessChallenge] = useState('');
        const [solutions, setSolutions] = useState([]);
        const [isLoadingSolutions, setIsLoadingSolutions] = useState(false);
        const [solutionError, setSolutionError] = useState('');

        const generateSolutions = async () => {
            if (!businessChallenge.trim()) {
                setSolutionError("Please enter a business challenge to generate solutions.");
                return;
            }
            setIsLoadingSolutions(true);
            setSolutionError('');
            setSolutions([]); // Clear previous solutions

            const prompt = `Given the following business challenge for a company operating in Qatar, suggest potential digital and AI-powered solutions that a company like Noor Digital Solution (an IT solutions provider) could provide. Focus on practical applications and potential benefits. Provide 3-5 distinct solution ideas.

            Business Challenge: ${businessChallenge}
            `;

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
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
                            setSolutions(parsedSolutions);
                        } else {
                            setSolutionError("Received malformed response from AI. Please try again.");
                            console.error("Malformed AI response:", parsedSolutions);
                        }
                    } catch (parseError) {
                        setSolutionError("Failed to parse AI response. Please try again.");
                        console.error("JSON parse error:", parseError, "Raw response:", jsonString);
                    }
                } else {
                    setSolutionError("No solutions generated. Please try a different challenge.");
                }
            } catch (error) {
                setSolutionError("Failed to connect to AI service. Please check your network or try again later.");
                console.error("AI API Error:", error);
            } finally {
                setIsLoadingSolutions(false);
            }
        };

        return (
            <section id="solutions-services" className="py-20 md:py-32 bg-black/50" aria-labelledby="solutions-services-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="solutions-services-heading" className="text-4xl md:text-5xl font-black text-white mb-4">Our Solutions & Services</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Comprehensive digital solutions designed to transform your business and drive growth in the digital age.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <div className="text-5xl mb-4 primary-gradient-text font-black" aria-hidden="true">💻</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Custom Software Development</h3>
                            <p className="text-gray-300 mb-4">Tailored software solutions designed to meet your unique business requirements, from enterprise applications to specialized tools.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Custom Software Development">Learn More</button>
                        </div>
                        
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <div className="text-5xl mb-4 primary-gradient-text font-black" aria-hidden="true">🌐</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Web Development & Design</h3>
                            <p className="text-gray-300 mb-4">Stunning, responsive websites and web applications that deliver exceptional user experiences and drive conversions.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Web Development & Design">Learn More</button>
                        </div>
                        
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <div className="text-5xl mb-4 primary-gradient-text font-black" aria-hidden="true">📱</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Mobile App Development</h3>
                            <p className="text-gray-300 mb-4">Native and cross-platform mobile applications for iOS and Android that engage users and enhance your brand presence.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Mobile App Development">Learn More</button>
                        </div>
                        
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <div className="text-5xl mb-4 primary-gradient-text font-black" aria-hidden="true">🔒</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Cybersecurity Solutions</h3>
                            <p className="text-gray-300 mb-4">Comprehensive security services to protect your digital assets from evolving threats and vulnerabilities.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Cybersecurity Solutions">Learn More</button>
                        </div>
                        
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <div className="text-5xl mb-4 primary-gradient-text font-black" aria-hidden="true">☁️</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Cloud Computing Services</h3>
                            <p className="text-gray-300 mb-4">Scalable cloud solutions for enhanced flexibility, collaboration, and cost-effective data storage and management.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Cloud Computing Services">Learn More</button>
                        </div>
                        
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <div className="text-5xl mb-4 primary-gradient-text font-black" aria-hidden="true">📊</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Digital Marketing & SEO</h3>
                            <p className="text-gray-300 mb-4">Data-driven strategies to boost your online visibility, generate leads, and increase conversions.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Digital Marketing & SEO">Learn More</button>
                        </div>

                        {/* New Services Added Here */}
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <img src="https://placehold.co/100x100/1a1a2e/A9A9A9?text=ERP" alt="ERP System Icon" className="w-20 h-20 mb-4 rounded-full" />
                            <h3 className="text-2xl font-bold text-white mb-2">Enterprise Resource Planning (ERP)</h3>
                            <p className="text-gray-300 mb-4">Integrated management of core business processes, often in real-time, facilitated by technology and custom solutions.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about ERP Systems">Learn More</button>
                        </div>

                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <img src="https://placehold.co/100x100/1a1a2e/A9A9A9?text=POS" alt="POS System Icon" className="w-20 h-20 mb-4 rounded-full" />
                            <h3 className="text-2xl font-bold text-white mb-2">Point of Sale (POS) Systems</h3>
                            <p className="text-gray-300 mb-4">Advanced POS solutions for efficient transaction processing, inventory management, and customer relations in retail.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about POS Systems">Learn More</button>
                        </div>

                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <img src="https://placehold.co/100x100/1a1a2e/A9A9A9?text=Retail" alt="Retail & Supermarket Icon" className="w-20 h-20 mb-4 rounded-full" />
                            <h3 className="text-2xl font-bold text-white mb-2">Retail & Supermarket Solutions</h3>
                            <p className="text-gray-300 mb-4">Specialized software for inventory, sales, supply chain, and customer loyalty programs for retail businesses.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Retail & Supermarket Solutions">Learn More</button>
                        </div>

                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl text-center flex flex-col items-center">
                            <img src="https://placehold.co/100x100/1a1a2e/A9A9A9?text=Hospitality" alt="Hospitality Software Icon" className="w-20 h-20 mb-4 rounded-full" />
                            <h3 className="text-2xl font-bold text-white mb-2">Hospitality & Service Industry Software</h3>
                            <p className="text-gray-300 mb-4">Tailored solutions for restaurants, laundries, salons, and other service businesses, improving operations and customer experience.</p>
                            <button onClick={() => navigateTo('contact')} className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Learn more about Hospitality Software">Learn More</button>
                        </div>
                    </div>

                    {/* AI Solution Ideator Section */}
                    <div className="mt-20 p-8 rounded-xl bg-gray-800/60 glow-border">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 text-center">
                            ✨ AI Solution Ideator ✨
                        </h3>
                        <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                            Describe a business challenge you're facing, and our AI will suggest potential digital and AI-powered solutions.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <textarea
                                value={businessChallenge}
                                onChange={(e) => setBusinessChallenge(e.target.value)}
                                placeholder="E.g., 'Automating customer support queries' or 'Improving data analysis for sales forecasts'..."
                                rows="4"
                                className="w-full bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-y"
                                aria-label="Business Challenge Input"
                            ></textarea>
                            <button
                                onClick={generateSolutions}
                                disabled={isLoadingSolutions}
                                className="px-8 py-4 primary-gradient-bg text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 flex-shrink-0"
                                aria-label="Generate AI Solutions"
                            >
                                {isLoadingSolutions ? 'Generating...' : 'Generate Solutions'}
                            </button>
                        </div>

                        {solutionError && (
                            <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6">
                                {solutionError}
                            </div>
                        )}

                        {solutions.length > 0 && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {solutions.map((sol, index) => (
                                    <div key={index} className="bg-gray-900/50 p-6 rounded-lg glow-border">
                                        <h4 className="text-xl font-bold primary-gradient-text mb-2">{sol.title}</h4>
                                        <p className="text-gray-300">{sol.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    };

    // Case Studies Section Component
    const CaseStudiesSection = () => {
        return (
            <section id="case-studies" className="py-20 md:py-32 bg-[#0a0a1a]/80" aria-labelledby="case-studies-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="case-studies-heading" className="text-4xl md:text-5xl font-black text-white mb-4">Our Success Stories</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Explore how our AI-powered solutions have transformed businesses and delivered measurable outcomes.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl flex flex-col">
                            <div className="flex items-center mb-4">
                                <span className="text-5xl mr-4 primary-gradient-text">🏢</span>
                                <h3 className="text-2xl font-bold text-white">Enterprise AI Automation</h3>
                            </div>
                            <p className="text-gray-300 mb-4 flex-grow">Automated critical workflows for a large logistics company in Qatar, reducing manual errors and improving delivery times.</p>
                            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                                <li>Outcome: 30% reduction in operational costs</li>
                                <li>Outcome: 25% increase in processing speed</li>
                            </ul>
                            <blockquote className="text-gray-400 italic border-l-4 border-[#00BFFF] pl-4 mb-4">"Noor Digital's solution redefined our efficiency. A true game-changer!"</blockquote>
                            <div className="text-white text-md font-bold mt-auto">Client: Global Logistics Solutions</div>
                        </div>

                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl flex flex-col">
                            <div className="flex items-center mb-4">
                                <span className="text-5xl mr-4 primary-gradient-text">🛍️</span>
                                <h3 className="text-2xl font-bold text-white">Intelligent Retail Personalization</h3>
                            </div>
                            <p className="text-gray-300 mb-4 flex-grow">Developed an AI-driven recommendation engine for a major e-commerce platform, enhancing customer experience and sales.</p>
                            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                                <li>Outcome: 15% uplift in conversion rates</li>
                                <li>Outcome: 20% increase in average order value</li>
                            </ul>
                            <blockquote className="text-gray-400 italic border-l-4 border-[#00BFFF] pl-4 mb-4">"Their AI insights helped us connect with customers like never before."</blockquote>
                            <div className="text-white text-md font-bold mt-auto">Client: Elite Online Boutique</div>
                        </div>

                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl flex flex-col">
                            <div className="flex items-center mb-4">
                                <span className="text-5xl mr-4 primary-gradient-text">🏥</span>
                                <h3 className="text-2xl font-bold text-white">Healthcare Data Analytics Platform</h3>
                            </div>
                            <p className="text-gray-300 mb-4 flex-grow">Implemented a secure, AI-powered platform for a healthcare provider to analyze patient data for better diagnostic support.</p>
                            <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                                <li>Outcome: Improved diagnostic accuracy by 10%</li>
                                <li>Outcome: Faster patient data processing</li>
                            </ul>
                            <blockquote className="text-gray-400 italic border-l-4 border-[#00BFFF] pl-4 mb-4">"Critical insights delivered with precision and security. Invaluable."</blockquote>
                            <div className="text-white text-md font-bold mt-auto">Client: Qatar Medical Center</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // Blog Section Component
    const BlogSection = () => {
        return (
            <section id="blog" className="py-20 md:py-32 bg-black/50" aria-labelledby="blog-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="blog-heading" className="text-4xl md:text-5xl font-black text-white mb-4">Blog & Qatar Insights</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Stay informed with our latest articles on AI, digital transformation, and local news and trends in Qatar.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl flex flex-col">
                            <h3 className="text-2xl font-bold primary-gradient-text mb-4">Qatar's Digital Future: Smart City Initiatives</h3>
                            <p className="text-gray-300 mb-4 flex-grow">An in-depth look at how Qatar is embracing smart city technologies and what it means for businesses.</p>
                            <a href="#" className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Read article: Qatar's Digital Future: Smart City Initiatives">Read Article</a>
                        </div>
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl flex flex-col">
                            <h3 className="text-2xl font-bold primary-gradient-text mb-4">AI's Impact on Qatar's SME Growth</h3>
                            <p className="text-gray-300 mb-4 flex-grow">Discover how Artificial Intelligence is providing new opportunities and growth avenues for small and medium enterprises across Qatar.</p>
                            <a href="#" className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Read article: AI's Impact on Qatar's SME Growth">Read Article</a>
                        </div>
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl flex flex-col">
                            <h3 className="text-2xl font-bold primary-gradient-text mb-4">Navigating Cybersecurity in Qatar's Evolving Digital Landscape</h3>
                            <p className="text-gray-300 mb-4 flex-grow">Insights into the specific cybersecurity challenges and solutions relevant to businesses operating in Qatar today.</p>
                            <a href="#" className="px-5 py-2 border-2 border-[#00BFFF] text-[#00BFFF] font-bold rounded-lg hover:bg-[#00BFFF] hover:text-white transition-colors duration-300 mt-auto" aria-label="Read article: Navigating Cybersecurity in Qatar">Read Article</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // Testimonials Section Component
    const TestimonialsSection = () => {
        return (
            <section id="testimonials" className="py-20 md:py-32 bg-[#0a0a1a]/80" aria-labelledby="testimonials-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-black text-white mb-4">Client Testimonials</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">What our valued clients say about working with us and the impact of our solutions.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="testimonial-card glow-border bg-gray-900/40 p-8 rounded-xl relative" role="article" aria-label="Client Testimonial">
                            <p className="testimonial-content text-gray-300 text-lg mb-6 leading-relaxed">Noor Digital Solution transformed our business operations with their custom ERP solution. The team was professional, responsive, and delivered beyond our expectations. Our productivity has increased by 40% since implementation.</p>
                            <div className="flex items-center">
                                <img src="https://placehold.co/70x70/6A0DAD/FFFFFF?text=A" alt="Avatar of Ahmed Al-Mansoori" className="w-16 h-16 rounded-full mr-4 border-2 border-[#00BFFF]" />
                                <div>
                                    <h4 className="text-xl font-bold text-white">Ahmed Al-Mansoori</h4>
                                    <p className="text-[#00BFFF] text-md">CEO, Tech Innovations Inc.</p>
                                    <div className="text-[#00BFFF] text-lg mt-1" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card glow-border bg-gray-900/40 p-8 rounded-xl relative" role="article" aria-label="Client Testimonial">
                            <p className="testimonial-content text-gray-300 text-lg mb-6 leading-relaxed">The web development team at Noor Digital delivered an exceptional platform that perfectly captures our brand. Their expertise in UI/UX made our site not just beautiful, but incredibly user-friendly. Highly recommended!</p>
                            <div className="flex items-center">
                                <img src="https://placehold.co/70x70/007BFF/FFFFFF?text=B" alt="Avatar of Fatima Al-Hamad" className="w-16 h-16 rounded-full mr-4 border-2 border-[#00BFFF]" />
                                <div>
                                    <h4 className="text-xl font-bold text-white">Fatima Al-Hamad</h4>
                                    <p className="text-[#00BFFF] text-md">Marketing Director, Global Connect</p>
                                    <div className="text-[#00BFFF] text-lg mt-1" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // Contact Us Section Component
    const ContactSection = () => {
        return (
            <section id="contact" className="py-20 md:py-32 bg-black/50" aria-labelledby="contact-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="contact-heading" className="text-4xl md:text-5xl font-black text-white mb-4">Get in Touch</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Have a project in mind or want to learn more? Reach out to us directly or fill out the form below.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl">
                            <h3 className="text-3xl font-bold primary-gradient-text mb-8">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <span className="text-3xl primary-gradient-text mr-4" aria-hidden="true">📍</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Our Location</h4>
                                        <p className="text-gray-300">Noor Digital Solution Office, Innovation Hub, Doha, Qatar</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-3xl primary-gradient-text mr-4" aria-hidden="true">📧</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Email Us</h4>
                                        <p><a href="mailto:info@noordigitalsolution.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Email info@noordigitalsolution.com">info@noordigitalsolution.com</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-3xl primary-gradient-text mr-4" aria-hidden="true">📞</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Call Us</h4>
                                        <p><a href="tel:+9745551234" className="text-gray-300 hover:text-white transition-colors" aria-label="Call us at +974 555 1234">+974 555 1234</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-3xl primary-gradient-text mr-4" aria-hidden="true">🔗</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Connect with Us</h4>
                                        <div className="flex space-x-4 mt-2">
                                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on LinkedIn">LinkedIn</a>
                                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Twitter">Twitter</a>
                                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Facebook">Facebook</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="glow-border bg-gray-900/40 p-8 rounded-xl">
                            <h3 className="text-3xl font-bold primary-gradient-text mb-8">Send Us a Message</h3>
                            <form aria-label="Contact Form">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <input type="text" placeholder="Your Name" className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" aria-label="Your Name" required />
                                    <input type="email" placeholder="Your Email" className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" aria-label="Your Email" required />
                                </div>
                                <input type="text" placeholder="Subject" className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition mb-6" aria-label="Message Subject" />
                                <textarea placeholder="Your Message" rows="6" className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition mb-6" aria-label="Your Message" required></textarea>
                                <button type="submit" className="w-full px-8 py-4 primary-gradient-bg text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105" aria-label="Send your inquiry message">
                                    Send Message
                                </button>
                            </form>
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold primary-gradient-text mb-4">Subscribe to Our Newsletter</h3>
                                <form aria-label="Newsletter Signup">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input type="email" placeholder="Your Email for Newsletter" className="w-full sm:flex-grow bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" aria-label="Email for newsletter signup" required />
                                        <button type="submit" className="px-8 py-4 primary-gradient-bg text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105" aria-label="Subscribe to newsletter">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // Footer Component
    const Footer = () => {
        return (
            <footer className="bg-[#0a0a1a] py-8" role="contentinfo">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <div className="flex flex-col sm:flex-row justify-center items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="logo-mark h-8 w-8" role="img" aria-label="Noor Digital Solution Logo"></div>
                        <p>&copy; 2025 Noor Digital Solution. All Rights Reserved.</p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Privacy Policy">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Terms of Service">Terms of Service</a>
                        </div>
                        {/* Language Selector Placeholder */}
                        <div className="relative group">
                            <span className="text-gray-400 hover:text-white cursor-pointer" aria-label="Select Language">Language: English ▼</span>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-md shadow-lg py-1 z-20">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-700">Arabic</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-700">English</a>
                            </div>
                        </div>
                    </div>
                    <p className="mt-2">Empowering digital excellence.</p>
                </div>
            </footer>
        );
    };

    return (
        <>
            <Header navigateTo={navigateTo} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuMenuOpen={setIsMobileMenuMenuOpen} />
            <main>
                {/* Render sections based on currentPage state */}
                <HeroSection navigateTo={navigateTo} />
                <AboutSection />
                <SolutionsServicesSection navigateTo={navigateTo} />
                <CaseStudiesSection />
                <BlogSection />
                <TestimonialsSection />
                <ContactSection />
            </main>
            <Footer />

            {/* Global Styles */}
            <style>{`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0a0a1a; /* Fallback for image load failure */
                    color: #A9A9A9; /* Light gray for main body text */
                    background-image: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreebackground%2Fthe-art-of-human-machine-intelligence_15947786.html&psig=AOvVaw2PHJM-1sFKxkkc7BY6GMQs&ust=1750913387958000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLj08Onii44DFQAAAAAdAAAAABAE');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-attachment: fixed; /* Makes background scroll with page */
                }

                .primary-gradient-bg {
                    background: linear-gradient(135deg, #007BFF, #6A0DAD);
                }

                .primary-gradient-text {
                    background: linear-gradient(135deg, #00BFFF, #8A2BE2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .glow-border {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease-in-out;
                }

                .glow-border::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 0.75rem; 
                    border: 2px solid transparent;
                    background: linear-gradient(135deg, #00BFFF, #8A2BE2) border-box;
                    -webkit-mask:
                        linear-gradient(#fff 0 0) padding-box,
                        linear-gradient(#fff 0 0);
                    -webkit-mask-composite: destination-out;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }
                
                .glow-border:hover::before {
                    opacity: 1;
                }

                .nav-link.active {
                    color: #00BFFF;
                    font-weight: 700;
                }
                
                #hero-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    background-color: rgba(0,0,0,0); /* Make canvas background transparent to see body image */
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .fade-in {
                    animation: fadeIn 1s ease-out forwards;
                }

                .testimonial-card::before {
                    content: '“';
                    position: absolute;
                    top: 1.5rem;
                    left: 1.5rem;
                    font-size: 6rem;
                    color: #00BFFF;
                    opacity: 0.1;
                    font-family: 'Inter', sans-serif;
                    line-height: 1;
                    z-index: 0;
                }

                .testimonial-content {
                    position: relative;
                    z-index: 1;
                }

                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 99;
                    display: none;
                }

                .mobile-menu-overlay.active {
                    display: block;
                }

                .mobile-nav-menu {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 80%;
                    max-width: 300px;
                    height: 100%;
                    background: #1a1a2e; /* Dark background for mobile menu */
                    padding-top: 4rem;
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
                    transition: right 0.3s ease-in-out;
                    z-index: 100;
                }

                .mobile-nav-menu.active {
                    right: 0;
                }

                .mobile-nav-menu li {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #374151;
                }

                .mobile-nav-menu li:last-child {
                    border-bottom: none;
                }

                .mobile-nav-menu a {
                    display: block;
                    color: #A9A9A9;
                    font-size: 1.125rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }

                .mobile-nav-menu a:hover {
                    color: #00BFFF;
                }

                .mobile-toggle {
                    cursor: pointer;
                    z-index: 101;
                    font-size: 1.5rem;
                    color: #A9A9A9;
                    display: block;
                }
                
                .mobile-close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1.5rem;
                    font-size: 2rem;
                    color: #A9A9A9;
                    cursor: pointer;
                }

                .logo-mark {
                    border-radius: 9999px;
                    position: relative;
                    box-shadow: 0 0 10px rgba(0, 123, 255, 0.4);
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .logo-mark::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #007BFF, #6A0DAD);
                    opacity: 0.7;
                    filter: blur(4px);
                    border-radius: inherit;
                }

                .logo-mark::after {
                    content: '';
                    position: absolute;
                    width: 50%;
                    height: 50%;
                    background-color: #A9A9A9;
                    border-radius: 0.125rem;
                    transform: rotate(45deg);
                    z-index: 1;
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
                }

                .hero-graphic-head {
                    font-size: 10rem;
                    line-height: 1;
                    background: linear-gradient(135deg, #00BFFF, #8A2BE2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 0 15px rgba(0, 191, 255, 0.6));
                    transition: all 0.5s ease-in-out;
                    cursor: pointer;
                }
                .hero-graphic-head:hover {
                    transform: scale(1.05) rotateY(10deg);
                    filter: drop-shadow(0 0 25px rgba(0, 191, 255, 0.8));
                }

                @media (min-width: 1024px) {
                    .hero-content-desktop-left { text-align: left; }
                    .hero-content-desktop-center { text-align: left; }
                    .hero-content-desktop-right { text-align: right; }
                }
                @media (max-width: 1023px) and (min-width: 768px) {
                    .hero-content-tablet-centered { text-align: center; }
                    .hero-buttons-tablet-centered { justify-content: center; }
                }
                @media (max-width: 767px) {
                    .hero-content-mobile-centered { text-align: center; }
                    .hero-buttons-mobile-centered { justify-content: center; }
                }
            `}</style>
        </>
    );
}

export default App;
