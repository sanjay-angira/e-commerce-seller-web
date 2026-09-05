export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#benefits", label: "Benefits" },
  { href: "#pricing", label: "Pricing" },
  { href: "#success-stories", label: "Success Stories" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const HERO_PERKS = [
  { icon: "badge-check", label: "Zero Setup Fee" },
  { icon: "shield", label: "Secure Payments" },
  { icon: "headset", label: "Dedicated Support" },
  { icon: "trending-up", label: "Grow Your Brand" },
] as const;

export const WHY_CARDS = [
  {
    icon: "users",
    title: "Reach Millions",
    text: "Get access to our large and growing customer base across India.",
  },
  {
    icon: "indian-rupee",
    title: "Secure & Fast Payments",
    text: "Receive payments quickly with a trusted and transparent system.",
  },
  {
    icon: "truck",
    title: "Easy Shipping",
    text: "We work with trusted logistics partners to deliver your products.",
  },
  {
    icon: "headset",
    title: "Dedicated Support",
    text: "Our seller support team is here to help you at every step.",
  },
] as const;

export const HOW_STEPS = [
  {
    step: "1",
    icon: "user-plus",
    title: "Register",
    text: "Create your seller account in minutes.",
  },
  {
    step: "2",
    icon: "package",
    title: "List Your Products",
    text: "Add product details, pricing and inventory.",
  },
  {
    step: "3",
    icon: "store",
    title: "Start Selling",
    text: "Reach customers and receive orders.",
  },
  {
    step: "4",
    icon: "line-chart",
    title: "Grow Your Business",
    text: "Track performance and expand your brand.",
  },
] as const;

export const STATS = [
  { value: "1,00,000+", label: "Active Sellers" },
  { value: "10M+", label: "Products Listed" },
  { value: "50M+", label: "Happy Customers" },
  { value: "4.8/5", label: "Seller Satisfaction", starred: true },
] as const;

export const TESTIMONIALS = [
  {
    name: "Rahul Mehta",
    role: "Home Decor Seller",
    quote:
      "Vrindavan Rasa helped me take my small business online. Sales have grown every month.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Fashion Seller",
    quote:
      "The platform is easy to use and the support team is always available when I need help.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Amit Verma",
    role: "Electronics Seller",
    quote:
      "Payments are on time and shipping is handled smoothly. Highly recommended.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
  },
] as const;

export const FAQS = [
  {
    q: "Who can become a seller?",
    a: "Anyone with products to sell in India can register — individuals, brands, and small businesses.",
  },
  {
    q: "Is there any registration fee?",
    a: "No. Creating a seller account is free. There is no setup or listing fee to get started.",
  },
  {
    q: "How will I receive payments?",
    a: "Payments are settled to your registered bank account on a regular cycle after orders are delivered.",
  },
  {
    q: "What products can I sell?",
    a: "You can list groceries, spices, puja items, home goods, and other categories approved on the marketplace.",
  },
  {
    q: "How does shipping work?",
    a: "We partner with logistics providers so you can ship across India without managing courier accounts yourself.",
  },
  {
    q: "Where can I get support?",
    a: "Our seller support team is available from the dashboard, email, and the contact section on this page.",
  },
] as const;

export const PRICING = [
  {
    name: "Start Free",
    price: "₹0",
    detail: "No registration or listing fees",
  },
  {
    name: "Sell",
    price: "Commission",
    detail: "Pay only when you make a sale",
  },
  {
    name: "Grow",
    price: "Tools included",
    detail: "Analytics, support, and logistics",
  },
] as const;

export const FOOTER_LINKS = [
  { href: "#contact", label: "About Us" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Seller Policy" },
  { href: "#contact", label: "Contact Us" },
] as const;
