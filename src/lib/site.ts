export const siteConfig = {
  brand: {
    ar: "إتقان",
    en: "Etkaan"
  },
  phoneDisplay: "01022566857",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201022566857",
  address:
    "368 العصافره بحري، شارع ملك حفني، مكتب رقم 1، الدور الأول، الإسكندرية",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "etkaan2012@outlook.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://etkaan.com",
  mapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    "https://www.google.com/maps/search/?api=1&query=368%20%D8%A7%D9%84%D8%B9%D8%B5%D8%A7%D9%81%D8%B1%D9%87%20%D8%A8%D8%AD%D8%B1%D9%8A%20%D8%B4%D8%A7%D8%B1%D8%B9%20%D9%85%D9%84%D9%83%20%D8%AD%D9%81%D9%86%D9%8A%20%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9",
  socials: {
    facebook: "https://www.facebook.com/share/1Gbgyzuic7/",
    linkedin:
      "https://www.linkedin.com/in/ahmed-osman-a47810404?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    youtube: "https://youtube.com/channel/UCfawLQiKTCpDfj4pgUC3dCw?si=uKyMUYuExs9SZkeg"
  }
};

export const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
  { href: "/privacy-policy", key: "privacy" }
] as const;
