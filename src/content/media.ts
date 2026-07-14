/** Curated premium photography for CPS — exhibition craft, architecture, industrial. */

const u = (id: string, w = 1600, q = 85) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const media = {
  /** Full-bleed home hero — international trade show, luxury booth presence */
  homeHero: u("photo-1540575467063-178a50c2df87", 2400, 90),

  /** Full production lifecycle — workshop / show-floor craft */
  lifecycle: u("photo-1581092160562-40aa08e78837", 1800),

  /** Why CPS bento — workshop, install, show-floor presence */
  whyCps: u("photo-1505373877841-8d25f7d46678", 1800),
  whyCpsWide: u("photo-1540575467063-178a50c2df87", 2000),
  whyCpsLeft: u("photo-1565043589221-1a6fd9ae45c7", 1400),
  whyCpsRight: u("photo-1591115765373-5207764f72e7", 1400),

  /** Before / after comparison — plain vs finished booth */
  beforeAfter: {
    before: u("photo-1475721027785-f74eccf877e2", 2000),
    after: u("photo-1591115765373-5207764f72e7", 2000),
  },

  about: {
    /** Team in workshop / production context */
    hero: u("photo-1581092160562-40aa08e78837", 2000),
    /** Mission — collaboration in a bright modern workspace */
    mission: u("photo-1522071820081-009f0129c71c", 1600),
    /** Studio / atelier atmosphere */
    studio: u("photo-1565043589221-1a6fd9ae45c7", 1800),
  },

  contact: {
    /** Headquarters / reception */
    hero: u("photo-1497366811353-6870744d04b2", 2000),
  },

  news: {
    hall: u("photo-1475721027785-f74eccf877e2", 1600),
    keynote: u("photo-1540575467063-178a50c2df87", 1600),
    networking: u("photo-1511578314322-379afb476865", 1600),
  },

  services: {
    /** Full booth management — coordination on the show floor */
    management: u("photo-1504307651254-35680f356dfd", 1600),
    /** Booth design — creative studio / concept work */
    design: u("photo-1581291518633-83b4ebd1d83e", 1600),
    /** Custom fabrication — modern factory / CNC craft */
    fabrication: u("photo-1565043589221-1a6fd9ae45c7", 1600),
    /** Installation & dismantling — assembly in convention hall */
    installation: u("photo-1541888946425-d81bb19240f5", 1600),
    /** Storage & reinstallation — clean warehouse logistics */
    storage: u("photo-1553413077-190dd305871c", 1600),
    /** Visual branding & print — large-format graphics */
    branding: u("photo-1561070791-2526d30994b5", 1600),
    /** Lightbox / retail display — illuminated premium signage */
    lightbox: u("photo-1441986300917-64674bd600d8", 1600),
  },

  boothTypes: {
    /** Custom — unique architectural stand */
    custom: u("photo-1591115765373-5207764f72e7", 1600),
    /** Modular — clean system booth */
    modular: u("photo-1475721027785-f74eccf877e2", 1600),
    /** Double-deck — large multi-level presence */
    doubleDeck: u("photo-1464366400600-7168b8af9bc3", 1600),
    /** Portable / pop-up — compact display systems */
    portable: u("photo-1556761175-5973dc0f32e7", 1600),
    /** Kiosks — branded compact stand */
    kiosk: u("photo-1555529669-e69e7aa0ba9a", 1600),
    /** Outdoor activations */
    outdoor: u("photo-1511578314322-379afb476865", 1600),
    /** National pavilions — large expo architecture */
    pavilion: u("photo-1492684223066-81342ee5ff30", 1600),
    /** Sustainable / eco — natural materials, greenery */
    sustainable: u("photo-1518531933037-91b2f5f229cc", 1600),
  },

  industries: {
    technology: u("photo-1518770660439-4636190af475", 1600),
    healthcare: u("photo-1576091160399-112ba8d25d1d", 1600),
    energy: u("photo-1473341304170-971dccb5ac1e", 1600),
    fmcg: u("photo-1441984904996-e0b6ba687e04", 1600),
  },

  locations: {
    riyadh: u("photo-1580674684081-7617fbf3d745", 1600),
    jeddah: u("photo-1512453979798-5ea266f8880c", 1600),
    dammam: u("photo-1486406146926-c627a92ad1ab", 1600),
    khobar: u("photo-1449824913935-59a10b8d2000", 1600),
    makkah: u("photo-1469854523086-cc02fe5d8800", 1600),
    madinah: u("photo-1518684079-3c830dcef090", 1600),
    neom: u("photo-1555881400-74d7acaacd8b", 1600),
  },

  /** Portfolio — real exhibition / built-environment photography (not abstract art) */
  projects: {
    northline: {
      hero: u("photo-1591115765373-5207764f72e7", 1800),
      gallery: [
        u("photo-1540575467063-178a50c2df87", 1800),
        u("photo-1475721027785-f74eccf877e2", 1600),
        u("photo-1505373877841-8d25f7d46678", 1600),
        u("photo-1511578314322-379afb476865", 1600),
        u("photo-1492684223066-81342ee5ff30", 1600),
        u("photo-1565043589221-1a6fd9ae45c7", 1600),
      ],
    },
    aetherLabs: {
      hero: u("photo-1576091160550-2173dba999ef", 1800),
      gallery: [
        u("photo-1582719471384-894fbb16e074", 1600),
        u("photo-1579684385127-1ef15d508118", 1600),
        u("photo-1581092160562-40aa08e78837", 1600),
        u("photo-1581094794329-c8112a89af12", 1600),
        u("photo-1576091160399-112ba8d25d1d", 1600),
        u("photo-1631217868264-e5b90bb7e629", 1600),
      ],
    },
    qamar: {
      hero: u("photo-1555529669-e69e7aa0ba9a", 1800),
      gallery: [
        u("photo-1441986300917-64674bd600d8", 1600),
        u("photo-1567401893414-76b7b1e5a7a5", 1600),
        u("photo-1441984904996-e0b6ba687e04", 1600),
        u("photo-1604719312566-8912e9227c6a", 1600),
        u("photo-1556742049-0cfed4f6a45d", 1600),
        u("photo-1472851294608-062f824d29cc", 1600),
      ],
    },
    harborCo: {
      hero: u("photo-1464366400600-7168b8af9bc3", 1800),
      gallery: [
        u("photo-1492684223066-81342ee5ff30", 1600),
        u("photo-1511578314322-379afb476865", 1600),
        u("photo-1541888946425-d81bb19240f5", 1600),
        u("photo-1503387762-592deb58ef4e", 1600),
        u("photo-1486406149826-c456e5f3ff6e", 1600),
        u("photo-1497366216548-37526070297c", 1600),
      ],
    },
    pulseRetail: {
      hero: u("photo-1441986300917-64674bd600d8", 1800),
      gallery: [
        u("photo-1555529669-e69e7aa0ba9a", 1600),
        u("photo-1567401893414-76b7b1e5a7a5", 1600),
        u("photo-1604719312566-8912e9227c6a", 1600),
        u("photo-1441984904996-e0b6ba687e04", 1600),
        u("photo-1556740738-b6a63e27c4df", 1600),
        u("photo-1528698827591-e19ccd7bc23d", 1600),
      ],
    },
  },
} as const;
