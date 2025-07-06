"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, Mail, Phone, MapPin, Clock, Briefcase } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import FadeInSection from '@/components/FadeInSection';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Autoplay video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay Blocked", error);
        });
      }
    }
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    preferredTime: "",
    agree: false,
  });


  //comntact form data and error handling
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.message.trim()) newErrors.message = "Please tell us what brings you here.";
    if (!formData.preferredTime.trim()) newErrors.preferredTime = "Preferred time is required.";
    if (!formData.agree) newErrors.agree = "You must agree to be contacted.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit form
      console.log("Form submitted:", formData);
      alert("Submitted successfully!");
      setErrors({});
    }
  };


  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full h-[16vh] bg-[#f3f1e9] flex items-center justify-between px-4 sm:px-6 md:px-10 relative z-50">
        {/* Logo + Text */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Image src="/logo.jpg" width={80} height={40} alt="logo" className="w-14 sm:w-16 md:w-24" />
          <div className="text-[#264634] leading-tight">
            <h1 className="text-sm sm:text-lg md:text-2xl">Dr. Serena Blake, PsyD</h1>
            <p className="text-xs sm:text-base md:text-xl">Psychological Services</p>
          </div>
        </div>

        {/* Hamburger / Cross */}
        <button
          className="lg:hidden p-2 text-[#264634] focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* layout for smaller screens */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#f3f1e9] z-40 transition-all duration-300 ease-in-out" />
      )}

      {/* Hero FadeInSection */}
      <FadeInSection className="relative w-full h-[110vh] overflow-hidden bg-[#f3f1e9]">

        <div className="w-full h-[100vh] px-4 md:px-10">
          <video
            ref={videoRef}
            src="/calm2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
        </div>


        <div className="absolute h-[100vh] inset-0 bg-black bg-opacity-40 z-0 mx-4 md:mx-10" />

        {/* content */}
        <FadeInSection delay={150} className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-10 z-10 gap-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Compassionate Psychological Support for
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Well-Being, Clarity, and Inner Peace
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl">
            Offering individual psychotherapy for adults at her Maplewood Drive office in Los Angeles, CA, and globally through secure virtual sessions.
          </p>
          <button className="bg-[#97bdbb] sm:w-44 md:w-56 lg:w-96 lg:px-6 lg:py-10 text-white px-5 py-3 md:px-6 md:py-4 rounded-[100%] font-semibold text-sm sm:text-base md:text-lg hover:opacity-70 transition">
            SCHEDULE A CONSULTATION
          </button>
        </FadeInSection>

      </FadeInSection>
      {/* about */}
      <FadeInSection className="py-16 px-6 sm:px-10">
        <div className="max-w-7xl lg:ml-56 flex flex-col lg:flex-row items-center gap-20">
          {/* Text Column */}
          <div className="flex-1 text-[#7f7e6a]">
            <FadeInSection delay={0} className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 text-[#41412e]">
              About Dr. Serena Blake
            </FadeInSection>
            <FadeInSection delay={150} className="text-base sm:text-lg md:text-xl leading-relaxed mb-10">
              Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA,
              with eight years of experience and over 500 client sessions. <br /><br />
              She blends evidence-based approaches—like cognitive-behavioral therapy and mindfulness—with compassionate,
              personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma. <br /><br />
              Whether you meet in her Maplewood Drive office or connect virtually via Zoom, Dr. Blake is committed
              to creating a safe, supportive space for you to thrive.
            </FadeInSection>

            {/* Details Box */}
            <FadeInSection delay={300} className="space-y-4 text-[#4f4c4b] text-base sm:text-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-[#4f4c4b]" />
                <span>
                  <strong>Location:</strong>{" "}
                  <a
                    href="https://www.google.com/maps?q=1287+Maplewood+Drive,+Los+Angeles,+CA+90026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#2e2e1f]"
                  >
                    1287 Maplewood Drive, Los Angeles, CA 90026
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 text-[#4f4c4b]" />
                <span>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+13235550192" className="underline hover:text-[#2e2e1f]">
                    (323) 555-0192
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-[#4f4c4b]" />
                <span>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:serena@blakepsychology.com" className="underline hover:text-[#2e2e1f]">
                    serena@blakepsychology.com
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 text-[#4f4c4b]" />
                <span>
                  <strong>Office Hours:</strong><br />
                  In-person: Tue & Thu, 10 AM–6 PM <br />
                  Virtual (Zoom): Mon, Wed & Fri, 1 PM–5 PM
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 mt-1 text-[#4f4c4b]" />
                <span>
                  <strong>Experience:</strong> 8 years in practice, 500+ sessions
                </span>
              </div>
            </FadeInSection>
          </div>

          {/* Image Column */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[300px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/profile-pic.jpg"
                alt="Dr. Serena Blake"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </FadeInSection>
      {/* divider */}
      <div className="w-[90vw] mx-[5vw] h-[2px] bg-black mt-40 mb-20"></div>
      <FadeInSection className="bg-[#f2f1e8] w-full h-full text-[#4f4c4b] text-center px-4 sm:px-8 md:px-48 lg:px-32 xl:px-72 py-20">
        <FadeInSection delay={0} className="text-3xl md:text-5xl lg:text-5xl leading-snug">
          Therapy is you looking after you — one of the most meaningful acts of self-care.
        </FadeInSection>
        <FadeInSection delay={150} className="mt-10 sm:mt-12 md:mt-20 text-xl md:text-2xl lg:text-2xl leading-loose">
          Whether you&apos;re navigating anxiety, depression, relationship challenges, trauma, grief, low self-worth, or family and parenting dynamics, therapy provides a supportive space to explore, heal, and grow. You don&apos;t have to carry it all alone. Together, we&apos;ll work toward lasting clarity, resilience, and emotional well-being.
        </FadeInSection>
      </FadeInSection>

      {/* divider */}
      <div className="w-full h-full bg-[#f3f1e9] pt-40 pb-20">
        <div className="w-[90vw] mx-[5vw] h-[2px] bg-black "></div>
      </div>

      <FadeInSection className="bg-[#f3f1e9] py-20 px-6 md:px-12 lg:px-24 text-[#4f4c4b] leading-10">
        <div className="max-w-7xl mx-auto">
          <FadeInSection delay={0} className="text-2xl md:text-4xl text-center mb-16">
            How I Support Your Journey
          </FadeInSection>

          <FadeInSection delay={150} className="grid gap-16 md:gap-12 lg:gap-20 grid-cols-1 md:grid-cols-1 lg:grid-cols-3">

            {/* Anxiety & Stress Management */}
            <div className="flex flex-col items-center text-center">
              <FadeInSection delay={300} className="w-96 h-96 rounded-full overflow-hidden mb-6">
                <img
                  src="/s-1.png"
                  alt="Anxiety and Stress Management"
                  className="w-full h-full object-cover"
                />
              </FadeInSection>
              <FadeInSection delay={300} className="text-xl md:text-3xl mb-4">
                Anxiety & Stress Management
              </FadeInSection>
              <FadeInSection delay={450} className="text-lg md:text-xl leading-relaxed">
                Learn how to manage overwhelming thoughts, regulate your nervous system,
                and build resilience in the face of daily pressures. Together, we&apos;ll create practical tools and deeper insight to help you feel more grounded and in control.
              </FadeInSection>
            </div>

            {/* Relationship Counseling */}
            <div className="flex flex-col items-center text-center">
              <FadeInSection delay={300} className="w-96 h-96 rounded-full overflow-hidden mb-6">
                <img
                  src="/s-3.jpg"
                  alt="Relationship Counseling"
                  className="w-full h-full object-cover"
                />
              </FadeInSection>
              <FadeInSection delay={300} className="text-xl md:text-3xl mb-4">
                Relationship Counseling
              </FadeInSection>
              <FadeInSection delay={450} className="text-lg md:text-xl leading-relaxed">
                Whether you&apos;re navigating romantic relationships, friendships, or family dynamics,
                therapy can help you improve communication, set boundaries, and foster meaningful, supportive connections.
              </FadeInSection>
            </div>

            {/* Trauma Recovery */}
            <div className="flex flex-col items-center text-center">
              <FadeInSection delay={300} className="w-96 h-96 rounded-full overflow-hidden mb-6">
                <img
                  src="/s-2.jpg"
                  alt="Trauma Recovery"
                  className="w-full h-full object-cover"
                />
              </FadeInSection>
              <FadeInSection delay={300} className="text-xl md:text-3xl mb-4">
                Trauma Recovery
              </FadeInSection>
              <FadeInSection delay={450} className="text-lg md:text-xl leading-relaxed">
                If you&apos;ve experienced trauma—past or recent—therapy offers a compassionate space
                to begin healing. We&apos;ll work together to rebuild safety, process difficult emotions, and restore a sense of empowerment and peace.
              </FadeInSection>
            </div>

          </FadeInSection>
        </div>
      </FadeInSection>


      {/* session details */}
      <FadeInSection className="w-full h-full bg-[#95b0b1] text-center">
        <h1 className="text-center text-4xl pb-10 pt-20">
          Session Rates
        </h1>
        <FadeInSection delay={150} className="py-5 text-xl">
          For Every Individual Session : $200
        </FadeInSection>
        <FadeInSection delay={300} className="pt-5 pb-10 text-xl">
          For Every Couples&apos; Session : $240
        </FadeInSection>


      </FadeInSection>

      {/* FAQ */}
      <FadeInSection className="px-4 sm:px-10 md:px-20 py-16 bg-[#f2f1e8] text-[#4f4c4b]">
        <h2 className="text-3xl sm:text-4xl text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion variant="splitted" className="max-w-3xl mx-auto">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Do you accept insurance?"
            className="text-lg text-black"
          >
            No, I do not accept insurance directly, but I provide a superbill for you to submit to your provider for potential reimbursement.
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Are online sessions available?"
            className="text-lg"
          >
            Yes, all sessions are conducted virtually via secure Zoom video calls, ensuring flexibility and comfort.
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="What is your cancellation policy?"
            className="text-lg"
          >
            I require at least 24 hours&apos; notice for cancellations. Late cancellations or missed appointments may result in a cancellation fee.
          </AccordionItem>
        </Accordion>
      </FadeInSection>

      <div className="w-full h-full bg-[#f3f1e9] pt-40 pb-20">
        <div className="w-[90vw] mx-[5vw] h-[2px] bg-black "></div>
      </div>

      {/* contact */}

      <FadeInSection className="bg-[#f2f1e8] py-16 px-4 md:px-10 lg:px-40 text-[#4f4c4b]">
        <h2 className="text-center text-4xl font-bold mb-10">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-medium">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-medium">What brings you here? *</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="preferredTime" className="block font-medium">Preferred time to reach you *</label>
            <input
              id="preferredTime"
              name="preferredTime"
              type="text"
              value={formData.preferredTime}
              onChange={handleChange}
              placeholder="e.g., Mornings, Evenings, Weekends"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
          </div>

          {/* Agreement */}
          <div className="flex items-center space-x-2">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="h-5 w-5 text-green-600"
            />
            <label htmlFor="agree" className="text-sm">
              I agree to be contacted *
            </label>
          </div>
          {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#264634] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#3c6553] transition"
          >
            Submit
          </button>
        </form>

      </FadeInSection>



    </main>
  );
}
