type SiteLink = {
  label: string;
  href: string;
  display: string;
};

type Site = {
  name: string;
  oneLiner: string;
  about: string[];
  links: SiteLink[];
};

export const site: Site = {
  name: "Mahir Ahmed",
  oneLiner: "Builder and closer. CS @ UNSW.",
  about: [
    "I'm a 20 y/o 3rd year CS student at UNSW. Ex-Founding CTO at Ashhadu, a matchmaking app I built and shipped end-to-end as the sole dev.",
    "Also run FM Agency, a marketing agency I've been running for the past 2 years'.",
  ],
  links: [
    {
      label: "email",
      href: "mailto:mahirahmed072006@gmail.com",
      display: "mahirahmed072006@gmail.com",
    },
    {
      label: "linkedin",
      href: "https://linkedin.com/in/mahir-ahmedd",
      display: "linkedin.com/in/mahir-ahmedd",
    },
    {
      label: "github",
      href: "https://github.com/mahirahmed07",
      display: "github.com/mahirahmed07",
    },
  ],
};
