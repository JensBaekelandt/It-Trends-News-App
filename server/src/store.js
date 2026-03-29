export const store = {
  users: [
    {
      id: 'u1',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      password: 'password123',
      bookmarks: [12, 9]
    },
  ],
  settings: {
    theme: 'light',
    language: 'en',
  },
  topics: [
    { id: 't1', name: 'Technology', description: 'AI, cloud and product innovation.' },
    { id: 't2', name: 'Cybersecurity', description: 'Threats, policy and zero-trust updates.' },
    { id: 't3', name: 'Startups', description: 'Funding, scale-ups and market movement.' },
  ],
  articles: [
    {
      id: 12,
      category: 'TECHNOLOGY',
      source: 'TechCrunch',
      savedAgo: '2 hours ago',
      readMinutes: 5,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      title: 'EU AI Act: What changes for product teams',
      summary: 'A practical view on compliance impact for software teams.',
      content:
        'The EU AI Act introduces a comprehensive, risk-based framework that will significantly impact how product teams design, build, and deploy AI systems. Applications are categorized into risk tiers—minimal, limited, high, and unacceptable—with each tier carrying specific compliance obligations.\n\nFor product teams, the first step is classification. Understanding whether your system falls into the high-risk category—such as AI used in hiring, healthcare, or critical infrastructure—is essential. High-risk systems require rigorous documentation, including dataset transparency, model explainability, and detailed risk assessments.\n\nTeams must also implement human oversight mechanisms to ensure that automated decisions can be monitored and overridden when necessary. This may require changes to UX design, internal workflows, and governance structures.\n\nAdditionally, data governance becomes a central concern. Teams need to document data sources, ensure quality and bias mitigation, and maintain audit trails. Non-compliance can result in significant penalties, making early alignment with legal and compliance teams critical.\n\nUltimately, the EU AI Act is not just a regulatory hurdle—it is an opportunity for organizations to build more trustworthy, transparent, and user-centric AI systems.'
    },
    {
      id: 11,
      category: 'FINANCE',
      source: 'Bloomberg',
      savedAgo: '6 hours ago',
      readMinutes: 8,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      title: 'How edge AI is moving into mainstream apps',
      summary: 'On-device models are becoming practical for modern products.',
      content:
        'Edge AI is rapidly transitioning from a niche capability to a mainstream feature in modern applications. By processing data locally on devices such as smartphones, laptops, and IoT hardware, edge AI reduces latency, enhances privacy, and enables real-time responsiveness.\n\nOne of the main drivers behind this shift is the improvement in hardware capabilities. Modern chips are now optimized for AI workloads, allowing even small devices to run complex machine learning models efficiently. At the same time, software tooling has matured, making it easier for developers to deploy and manage models on-device.\n\nFrom a user perspective, edge AI enables faster interactions and offline functionality. Features like voice recognition, image processing, and personalized recommendations can now operate without relying on cloud connectivity.\n\nPrivacy is another major advantage. Since data is processed locally, sensitive information does not need to be transmitted to external servers, reducing the risk of breaches and improving compliance with data protection regulations.\n\nHowever, challenges remain. Developers must balance model size, performance, and energy consumption. Updating models across distributed devices also requires robust deployment strategies.\n\nDespite these hurdles, the trajectory is clear: edge AI is becoming a foundational component of next-generation applications.'
    },
    {
      id: 10,
      category: 'LIFESTYLE',
      source: 'NY Times',
      savedAgo: 'yesterday',
      readMinutes: 12,
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop',
      title: '10 healthiest superfoods to add to your daily diet in 2024',
      summary: 'A practical list of nutrient-rich food choices.',
      content:
        'Incorporating nutrient-dense superfoods into your daily diet can have a lasting impact on overall health and well-being. Rather than focusing on restrictive eating, experts recommend building meals around whole, minimally processed ingredients.\n\nLeafy greens such as spinach and kale remain staples due to their high vitamin and antioxidant content. Berries, including blueberries and strawberries, are rich in fiber and support heart health. Fatty fish like salmon provide essential omega-3 fatty acids, which are linked to brain and cardiovascular benefits.\n\nOther standout superfoods include nuts and seeds, which offer healthy fats and protein, as well as legumes that provide plant-based protein and fiber. Whole grains like quinoa and oats contribute to sustained energy levels throughout the day.\n\nFermented foods such as yogurt and kimchi support gut health by promoting beneficial bacteria. Meanwhile, ingredients like turmeric and ginger offer anti-inflammatory properties.\n\nThe key to maintaining a healthy diet is consistency and simplicity. Planning meals ahead of time and incorporating a variety of these foods can make balanced nutrition both achievable and enjoyable.\n\nUltimately, small, sustainable changes to your daily routine can lead to significant long-term health benefits.'
    },
    {
      id: 9,
      category: 'SCIENCE',
      source: 'NASA News',
      savedAgo: '3 days ago',
      readMinutes: 4,
      imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop',
      title: 'Telescope reveals atmospheric water vapor on distant exoplanet',
      summary: 'New measurements improve understanding of exoplanet climates.',
      content:
        'Astronomers have detected water vapor in the atmosphere of a distant exoplanet, marking another milestone in the study of worlds beyond our solar system. Using advanced telescope instrumentation, researchers were able to analyze the chemical composition of the planet’s atmosphere with unprecedented precision.\n\nThe presence of water vapor does not necessarily indicate habitability, but it does provide critical insight into atmospheric processes and climate systems on distant planets. These findings help refine models used to predict temperature, weather patterns, and potential chemical interactions.\n\nModern telescopes are increasingly capable of capturing subtle variations in light as planets pass in front of their host stars. This technique, known as transit spectroscopy, allows scientists to identify specific molecules based on how they absorb light.\n\nAs observational technology continues to improve, researchers expect to detect a wider range of atmospheric components, including potential biosignatures. Each discovery contributes to a deeper understanding of planetary formation and the diversity of environments in the universe.\n\nThis latest finding underscores the rapid progress being made in exoplanet research and sets the stage for future missions aimed at identifying Earth-like worlds.'
    },
    {
      id: 8,
      category: 'TECHNOLOGY',
      source: 'The Verge',
      savedAgo: '5 days ago',
      readMinutes: 10,
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      title: 'Quantum computing and the next frontier in global security',
      summary: 'Why quantum policy is now a board-level topic.',
      content:
        'Quantum computing is rapidly evolving from a theoretical concept into a practical technology with far-reaching implications for global security. As quantum systems become more powerful, they have the potential to break widely used encryption methods that currently secure digital communications.\n\nThis has elevated quantum readiness to a strategic priority for governments and enterprises alike. Organizations are beginning to assess their exposure to quantum threats and develop migration plans toward post-quantum cryptography.\n\nSecurity teams are evaluating which systems rely on vulnerable encryption standards and identifying timelines for upgrading to quantum-resistant alternatives. At the same time, standards bodies and regulators are accelerating efforts to provide guidance and frameworks for secure transition.\n\nBeyond risks, quantum computing also presents opportunities. It could enable breakthroughs in fields such as materials science, drug discovery, and optimization problems that are currently intractable.\n\nHowever, the uncertainty around timelines and capabilities makes planning challenging. Businesses must balance investment with adaptability, ensuring they are prepared without overcommitting to immature technologies.\n\nAs awareness grows, quantum strategy is increasingly becoming a board-level discussion, reflecting its potential to reshape both security and innovation landscapes.'
    },
    {
      id: 7,
      category: 'FINANCE',
      source: 'Reuters',
      savedAgo: '1 week ago',
      readMinutes: 6,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      title: 'Central banks signal policy shifts as inflation cools',
      summary: 'Markets react to new guidance and rate expectations.',
      content:
        'Central banks around the world are signaling potential shifts in monetary policy as inflation shows signs of cooling. After a prolonged period of rate hikes aimed at curbing rising prices, policymakers are now adopting a more cautious and data-driven approach.\n\nRecent economic indicators suggest that inflation is gradually stabilizing, though it remains above target levels in many regions. This has led to increased speculation about when interest rates might plateau or begin to decline.\n\nFinancial markets have reacted quickly to new guidance, with bond yields, equity valuations, and currency markets adjusting to changing expectations. Investors are closely monitoring central bank communications for clues about future policy direction.\n\nDespite the improving outlook, uncertainty remains. Factors such as geopolitical tensions, energy prices, and labor market dynamics continue to influence inflation trajectories.\n\nCentral banks emphasize that decisions will remain dependent on incoming data, rather than fixed timelines. This flexible approach aims to balance the risks of tightening too much against the dangers of easing prematurely.\n\nAs the global economy navigates this transition, both policymakers and investors face a complex and evolving landscape.'
    },
  ],
};
