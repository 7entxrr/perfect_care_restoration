"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (!db) {
        console.error("❌ Contact form disabled: no database configured.");
        setSubmitStatus("error");
        return;
      }
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      setSubmitStatus("success");
      console.log("✅ Contact form submitted");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("❌ Error adding document: ", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {submitStatus === "success" && (
        <div className="bg-green-50 text-green-800 p-4 text-sm mb-6 border border-green-100">
          ✅ Thank you for your message! We will get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="bg-red-50 text-red-800 p-4 text-sm mb-6 border border-red-100">
          ❌ Something went wrong. Please try again later or contact us directly.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group">
          <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full pb-3 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors font-serif text-lg placeholder-gray-300 disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
        <div className="group">
          <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full pb-3 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors font-serif text-lg placeholder-gray-300 disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="group">
        <label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full pb-3 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors font-serif text-lg placeholder-gray-300 disabled:opacity-50"
          placeholder="+91 98765 43210"
        />
      </div>

      <div className="group">
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full pb-3 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors font-serif text-lg resize-none placeholder-gray-300 disabled:opacity-50"
          placeholder="I'm interested in..."
        />
      </div>

      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="w-full md:w-auto px-12 py-6 text-sm uppercase tracking-widest rounded-none bg-black text-white hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={16} /> Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
