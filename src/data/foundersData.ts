export interface CoFounder {
  id: string;
  name: string;
  role: string;
  qualification: string;
  institution: string;
  bio: string;
  signatureType: 'abhishek' | 'ajay';
  image: string;
  specialization: string[];
}

export const CO_FOUNDERS: CoFounder[] = [
  {
    id: 'abhishek-kumar',
    name: 'Abhishek Kumar',
    role: 'Co-Founder & Chief Technology Officer',
    qualification: 'M.Tech, IIT Patna',
    institution: 'Indian Institute of Technology Patna',
    bio: 'Pioneering autonomous multi-agent orchestration, neural distributed architectures, and ultra-low latency AI inference. Postgraduate alumnus of IIT Patna specializing in advanced computational paradigms and scalable deep-tech systems.',
    signatureType: 'abhishek',
    image: '/assets/123Abhi.jpeg?v=2',
    specialization: [
      'Multi-Agent Swarm Orchestration',
      'Distributed Deep Learning Architecture',
      'LLM Low-Latency Inference Systems',
      'Model Context Protocol (MCP) Standards'
    ]
  },
  {
    id: 'ajay-singh-chauhan',
    name: 'Ajay Singh Chauhan',
    role: 'Co-Founder & Chief Operating Officer',
    qualification: 'M.Tech, IIT Patna',
    institution: 'Indian Institute of Technology Patna',
    bio: 'Architecting enterprise scale operations, technology commercialization, and deep-tech engineering pipelines. Postgraduate alumnus of IIT Patna with extensive domain mastery in high-throughput enterprise infrastructure and systems engineering.',
    signatureType: 'ajay',
    image: '/assets/1704560023243.jpg?v=2',
    specialization: [
      'Enterprise Systems Commercialization',
      'Deep-Tech Talent & Fellowship Programs',
      'High-Throughput Operational Infrastructure',
      'Strategic Corporate Alliances & Growth'
    ]
  },
];
