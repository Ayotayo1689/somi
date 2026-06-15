import BrandImg from "../asset/insta.jpg";
import { clients, imagePool, logoClients, photoProjects, serviceCards, videoProjects, zServices } from "./siteData";

const portfolio = [
  ...photoProjects.map((title, index) => ({
    id: `photo-${index}`,
    title,
    type: "photo",
    image: imagePool[index % imagePool.length],
    order: index + 1,
    isActive: true,
  })),
  ...videoProjects.map((title, index) => ({
    id: `video-${index}`,
    title,
    type: "video",
    thumbnail: imagePool[(index + 2) % imagePool.length],
    videoUrl: "",
    order: index + 1,
    isActive: true,
  })),
];

export const defaultContent = {
  siteSettings: {
    brandName: "somi",
    footerBrand: "somi the agency",
    primaryEmail: "hello@somiagency.com",
    footerEmail: "info@somiagency.co",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    theme: {
      palm: "#143503",
      flower: "#a7d1ae",
      sail: "#bcdbf0",
      serenade: "#fff2e6",
      ink: "#10220b",
      paper: "#ffffff",
      muted: "#52624d",
    },
  },
  navigation: {
    headerLinks: [
      { label: "Services", path: "/services", order: 1 },
      { label: "About", path: "/about", order: 2 },
      {
        label: "Portfolio",
        path: "#",
        order: 3,
        isDropdown: true,
        children: [
          { label: "Video Portfolio", path: "/video-portfolio" },
          { label: "Photo Portfolio", path: "/photo-portfolio" },
          { label: "Our Clients", path: "/our-clients" },
        ],
      },
      { label: "Our Clients", path: "/our-clients", order: 4 },
      { label: "Contact", path: "/contact", order: 5 },
    ],
  },
  pages: {
    home: {
      hero: {
        title: "Brands made",
        highlightedTitle: "unforgettable.",
        description: "We create strategic, scroll-stopping brand identities and content systems that transform your digital presence and turn attention into growth.",
        buttonText: "Learn more",
        buttonUrl: "/about",
        image: BrandImg,
      },
      servicesMarqueeTitle: "Our Services",
      servicePreviewItems: [
        { label: "The brand subscription", image: imagePool[0] },
        { label: "Content Days", image: imagePool[4] },
        { label: "Social media management", image: imagePool[2] },
        { label: "Strategy Deck", image: imagePool[1] },
      ],
      aboutPreview: {
        title: "Meet SOMI,",
        highlightedTitle: "the founders of sticky brands.",
        paragraphs: [
          "SOMI was born from a desire to help brands move from being seen to being remembered. With strategy, content, and creative direction, we shape digital presence that lands where it matters most.",
          "Whether it is a visual identity, a campaign, or social media built for consistency, every choice is intentional and every touchpoint has a role.",
        ],
        image: imagePool[2],
        buttonText: "Learn more",
        buttonUrl: "/about",
      },
      trustedSection: { title: "Trusted by", highlightedWord: "brands", suffix: "globally." },
      portfolioPreview: {
        backgroundImage: imagePool[0],
        buttonText: "View our portfolio",
        buttonUrl: "/photo-portfolio",
      },
    },
    services: {
      hero: {
        title: "Our Services",
        subtitle: "Strategic content creation & social media management",
        description: "Ready to take your content to the next level & grow on socials? Whether you need captivating photo and video content, strategic social media management, or a combination of both, we are here to help you achieve your goals and start seeing real results!",
      },
      enquireCta: { text: "Enquire to work with us", url: "/contact" },
      contentPortfolioBlock: {
        marqueeText: "Content Creation Portfolio",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
        description: "Our content creation packages are ideal for clients seeking fresh, high-quality content for their social channels. From relatable short-form videos to aesthetic, professional stills, we offer both photo and video options to fit your content needs.",
        buttonText: "Content Creation Portfolio",
        buttonUrl: "/photo-portfolio",
      },
      socialResultsBlock: {
        marqueeText: "Social Management Results",
        description: "For businesses looking to elevate their social media presence and hand over the daily task of running their socials. If you're struggling with your strategy or not seeing sales through social media, this is for you!",
        buttonText: "Work with us!",
        buttonUrl: "/contact",
      },
      finalCta: { title: "Got something else in mind?", image: imagePool[2], buttonText: "get in touch!", buttonUrl: "/contact" },
    },
    about: {
      hero: {
        titlePrefix: "Say",
        emphasizedWord: "hello",
        brandName: "SOMI",
        paragraphs: [
          "Hello! We are the creative founders behind SOMI Agency.",
          "Here is a little backstory: we have always been drawn to helping people and brands communicate better. From making films for friends to documenting ideas, campaigns, launches, and everyday moments, creating content is second nature to us.",
          "As we began offering brand strategy and social media management services independently, we noticed the same thing with many clients: they were overwhelmed by creating content that really sticks and speaks to their audience.",
          "After a few strategy sessions and late-night chats, we knew it was time to build something that delivered exactly what brands needed: creative direction, content, and systems that attract the right people and build real connections.",
          "And so, SOMI was born. An agency run by passionate creatives dedicated to helping brands produce authentic, engaging content that sparks conversations and builds trust.",
          "We are so excited to have you here. Here is to making brands stick!",
        ],
        image: imagePool[0],
      },
      story: {
        paragraphs: [
          "SOMI was created by two creatives naturally drawn to helping brands grow. We do not just execute tasks. We partner at a strategic level so every visual, caption, campaign, and touchpoint has a clear job.",
          "Our mission is to provide creative vision, strategic clarity, and execution excellence for ambitious brands at every stage of their journey.",
        ],
      },
      values: ["Bold & Decisive", "Warm & Collaborative", "Creative & Intentional", "Sharp & Professional"].map((title) => ({
        title,
        description: "Strong ideas, human communication, polished delivery, and creative choices backed by strategy.",
      })),
    },
    "photo-portfolio": {
      hero: {
        eyebrow: "Portfolio",
        title: "Photo examples",
        description: "A visual wall for brand shoots, campaigns, social content, launch assets, and editorial direction.",
      },
      marqueeTitle: "Photo Examples",
      nextPageCta: { title: "View our video portfolio", buttonText: "Explore videos", buttonUrl: "/video-portfolio" },
    },
    "video-portfolio": {
      hero: {
        eyebrow: "Portfolio",
        title: "Video examples",
        description: "Short-form, campaign, launch, and story-led video concepts for brands that need movement with meaning.",
      },
      marqueeTitle: "Video Portfolio",
      nextPageCta: { title: "View our photo portfolio", buttonText: "Explore photos", buttonUrl: "/photo-portfolio" },
    },
    clients: {
      hero: {
        eyebrow: "Our clients",
        title: "Built for brands that are ready to grow.",
        description: "SOMI works with founders, SMEs, lifestyle brands, established businesses, personal brands, and launch teams.",
        image: imagePool[4],
      },
    },
    contact: {
      hero: {
        eyebrow: "Want to work with us?",
        title: "Let's chat.",
        description: "Drop your details below and we will shape the next step with you.",
        image: imagePool[5],
      },
      contactSection: {
        eyebrow: "Contact",
        title: "Tell us what you want to make stick.",
        description: "Whether you need identity, content, ads, PR, campaign direction, or a long-term creative partner, start here.",
        email: "hello@somiagency.com",
        instagramUrl: "https://instagram.com",
        submitButtonText: "Send enquiry",
        projectTypes: ["Brand strategy", "Social media management", "Content creation", "Campaign execution"],
      },
    },
  },
  services: zServices.map((service, index) => ({
    id: `service-${index}`,
    title: service.title,
    image: service.image,
    description: service.copy,
    included: service.included,
    linkText: service.link,
    linkUrl: "/contact",
    order: index + 1,
    isActive: true,
  })),
  serviceCards,
  portfolio,
  clients: [
    ...clients.map((client, index) => ({
      id: `client-${index}`,
      ...client,
      image: imagePool[index % imagePool.length],
      showOnClientsPage: true,
      isActive: true,
    })),
    ...logoClients.map((name, index) => ({
      id: `logo-${index}`,
      name,
      showInTrustedStrip: true,
      showOnClientsPage: false,
      isActive: true,
    })),
  ],
  stats: [
    { id: "stat-1", label: "Profile activity", value: 9305, isActive: true },
    { id: "stat-2", label: "Accounts reached", value: 103644, isActive: true },
    { id: "stat-3", label: "Profile activity", value: 42151, isActive: true },
    { id: "stat-4", label: "Accounts reached", value: 7564, isActive: true },
  ],
};
