export interface Character {
  id: string
  name: string
  emoji: string
  role: string
  color: string
}

export interface DialogueEntry {
  characterId: string
  text: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
}

export const CHARACTERS: Record<string, Character> = {
  margaret: {
    id: 'margaret',
    name: 'Margaret Chen',
    emoji: '👩‍💼',
    role: 'PLM Manager',
    color: 'blue'
  },
  devon: {
    id: 'devon',
    name: 'Devon Williams',
    emoji: '👨‍🔧',
    role: 'Senior Design Engineer',
    color: 'orange'
  },
  alex: {
    id: 'alex',
    name: 'Alex Kim',
    emoji: '🔍',
    role: 'Quality Engineer',
    color: 'green'
  },
  rosa: {
    id: 'rosa',
    name: 'Rosa Martinez',
    emoji: '🏭',
    role: 'Production Manager',
    color: 'red'
  },
  tom: {
    id: 'tom',
    name: 'Tom Bradley',
    emoji: '📊',
    role: 'ERP Lead',
    color: 'purple'
  },
  you: {
    id: 'you',
    name: 'You',
    emoji: '🙂',
    role: 'PLM Coordinator',
    color: 'indigo'
  },
  jordan: {
    id: 'jordan',
    name: 'Jordan Reeves',
    emoji: '🤝',
    role: 'HeliCare Rep',
    color: 'teal'
  }
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_part: {
    id: 'first_part',
    name: 'First Part',
    description: 'Create your first part in the system',
    icon: '📝'
  },
  specification_master: {
    id: 'specification_master',
    name: 'Specification Master',
    description: 'Link specifications to a part',
    icon: '📋'
  },
  bom_builder: {
    id: 'bom_builder',
    name: 'BOM Builder',
    description: 'Build your first Bill of Materials',
    icon: '🏗️'
  },
  quantity_roller: {
    id: 'quantity_roller',
    name: 'Quantity Roller',
    description: 'Complete a quantity rollup',
    icon: '🔢'
  },
  revision_tracker: {
    id: 'revision_tracker',
    name: 'Revision Tracker',
    description: 'Create a new revision',
    icon: '📚'
  },
  team_player: {
    id: 'team_player',
    name: 'Team Player',
    description: 'Complete Act 2: Collaboration',
    icon: '🤝'
  },
  change_champion: {
    id: 'change_champion',
    name: 'Change Champion',
    description: 'Complete Act 3: Crisis',
    icon: '🔄'
  },
  configuration_pro: {
    id: 'configuration_pro',
    name: 'Configuration Pro',
    description: 'Complete Act 4: Configuration',
    icon: '⚙️'
  },
  production_veteran: {
    id: 'production_veteran',
    name: 'Production Veteran',
    description: 'Complete Act 5: MES',
    icon: '🏭'
  },
  business_minded: {
    id: 'business_minded',
    name: 'Business Minded',
    description: 'Complete Act 6: ERP',
    icon: '💼'
  },
  digital_thread_hero: {
    id: 'digital_thread_hero',
    name: 'Digital Thread Hero',
    description: 'Complete Act 7: Digital Thread',
    icon: '🧵'
  },
  helicopter_hero: {
    id: 'helicopter_hero',
    name: 'Helicopter Hero',
    description: 'Complete all 20 missions',
    icon: '🚁'
  }
}

export const DIALOGUE: Record<string, DialogueEntry[]> = {
  // Act 1 - Mission 1_1
  margaret_intro: [
    { characterId: 'margaret', text: "Welcome to SkyForge! I've been waiting for this day." },
    { characterId: 'margaret', text: "I'll be honest - I fought for your promotion. Some people thought you were too quiet." },
    { characterId: 'margaret', text: "But I know you pay attention. That's what this job needs." },
    { characterId: 'you', text: "Thank you, Margaret. I won't let you down." },
    { characterId: 'margaret', text: "Let's start simple. Create your first part - a Main Rotor Blade. This helicopter won't fly without it!" }
  ],

  // Act 1 - Mission 1_2
  devon_specs: [
    { characterId: 'devon', text: "Hey, I sent you specs yesterday. Did you get them?" },
    { characterId: 'devon', text: "I don't have time for this computer nonsense. Just tell me what fields to fill out." },
    { characterId: 'alex', text: "*whispers* Good luck. He's been like this since the '90s." },
    { characterId: 'margaret', text: "Devon, please use the system. It's there to help everyone." },
    { characterId: 'devon', text: "Fine, fine. Just... make it quick." }
  ],

  // Act 1 - Mission 1_3
  bom_building: [
    { characterId: 'margaret', text: "A helicopter has thousands of parts. If we don't track them properly, we'll never deliver on time." },
    { characterId: 'margaret', text: "This is the Bill of Materials - the backbone of everything we do." },
    { characterId: 'you', text: "So I just add child parts to the parent?" },
    { characterId: 'margaret', text: "Exactly! Think of it like a family tree. One parent, many children." }
  ],

  // Act 1 - Mission 1_4
  quantity_rollup: [
    { characterId: 'margaret', text: "Now that we have our Bill of Materials, we need to understand the quantities." },
    { characterId: 'margaret', text: "Each parent part can have multiple child parts, and we need to calculate the total quantity needed." },
    { characterId: 'you', text: "So if I have 2 Main Rotor Blades and each needs 4 attachments, that's 8 attachments total?" },
    { characterId: 'margaret', text: "Exactly! That's called quantity rollup. Let's calculate it for our BOM." },
    { characterId: 'tom', text: "This will help me with the production planning and cost estimates." }
  ],

  // Act 1 - Mission 1_5
  revision_problem: [
    { characterId: 'margaret', text: "We have a problem. We accidentally shipped the wrong revision to a supplier." },
    { characterId: 'devon', text: "How did that happen? I thought I updated everything." },
    { characterId: 'alex', text: "This is exactly what I've been documenting for months..." },
    { characterId: 'margaret', text: "This happens more than you'd think. We need better revision control." },
    { characterId: 'you', text: "I'll create a new revision and track it properly." },
    { characterId: 'margaret', text: "Good. *checks email* Oh no..." },
    { characterId: 'margaret', text: "HeliCare is coming for a site visit in 2 weeks. We need to be ready." }
  ],

  // Act 2 - Mission 2_1
  team_communication: [
    { characterId: 'margaret', text: "You know everyone here. That's your strength. Use it." },
    { characterId: 'margaret', text: "Teams are working in silos. We need better communication." },
    { characterId: 'devon', text: "I don't have time for this. Just tell me what parts changed." },
    { characterId: 'alex', text: "Actually, that would be helpful..." },
    { characterId: 'rosa', text: "Finally, someone gets it." }
  ],

  // Act 2 - Mission 2_2
  review_3d: [
    { characterId: 'jordan', text: "I'll be reviewing the preliminary design next week. I expect to see proper configuration management." },
    { characterId: 'margaret', text: "This is important. Jordan is deciding between us and Vance Aerospace." },
    { characterId: 'devon', text: "Vance? Their systems are fancy, but they don't have our experience." },
    { characterId: 'rosa', text: "Let them talk. We know how to build helicopters." }
  ],

  // Act 2 - Mission 2_3
  finding_data: [
    { characterId: 'rosa', text: "I know we have that spec somewhere. Can you find it?" },
    { characterId: 'rosa', text: "Devon designed it three years ago. Before the system upgrade." },
    { characterId: 'devon', text: "Oh, that old thing? I thought we deleted it." },
    { characterId: 'you', text: "Found it! It was archived under a different name." },
    { characterId: 'margaret', text: "See? This is why we need better search." }
  ],

  // Act 2 - Mission 2_4
  approval_gate: [
    { characterId: 'alex', text: "I've been flagging these for months. Maybe now someone will listen." },
    { characterId: 'alex', text: "Every part needs proper approval before use. It's basic quality." },
    { characterId: 'margaret', text: "Alex is right. Let's get these approved properly." },
    { characterId: 'devon', text: "Fine, I'll approve it. But I don't agree with all these rules." },
    { characterId: 'jordan', text: "*email* Impressed by the progress so far. Meeting Vance tomorrow though..." }
  ],

  // Act 3 - Mission 3_1
  problem_report: [
    { characterId: 'alex', text: "I have something to show you." },
    { characterId: 'alex', text: "*opens folder* I've been documenting this for months. The connection was wrong all along." },
    { characterId: 'you', text: "This is serious. We need to create a formal problem report." },
    { characterId: 'devon', text: "Wait, it's not that big a deal..." },
    { characterId: 'rosa', text: "Not a big deal? This could have killed someone!" }
  ],

  // Act 3 - Mission 3_2
  change_request: [
    { characterId: 'devon', text: "Can't we just fix it and move on? I have three other projects." },
    { characterId: 'margaret', text: "Devon, if we don't document this properly, it'll happen again." },
    { characterId: 'tom', text: "And I need to update the cost estimates. This affects 47 parts." },
    { characterId: 'rosa', text: "Finally, maybe people will listen to production concerns." }
  ],

  // Act 3 - Mission 3_3
  impact_analysis: [
    { characterId: 'tom', text: "This affects 47 parts and changes our cost estimate by $200K." },
    { characterId: 'tom', text: "I need accurate impact analysis to update HeliCare." },
    { characterId: 'alex', text: "And we need to document quality impacts too." },
    { characterId: 'rosa', text: "Production schedule will need to shift by two weeks minimum." }
  ],

  // Act 3 - Mission 3_4
  change_approval: [
    { characterId: 'margaret', text: "This change order needs everyone to sign off." },
    { characterId: 'devon', text: "Fine. But I still don't agree with this." },
    { characterId: 'rosa', text: "About time someone listened to quality." },
    { characterId: 'tom', text: "I need updated numbers before I sign. Come find me." },
    { characterId: 'margaret', text: "All approvals received. Now let's implement this." }
  ],

  // Act 3 - Mission 3_5
  disposition: [
    { characterId: 'rosa', text: "We can't scrap them - budget's already stretched." },
    { characterId: 'rosa', text: "But we can't use them either without risking quality." },
    { characterId: 'tom', text: "Let's see... rework would cost $50K. Use-as-is saves money but has risk." },
    { characterId: 'alex', text: "I can do extra inspections if we use-as-is. But it needs to be documented." }
  ],

  // Act 3 - Mission 3_6
  closing_loop: [
    { characterId: 'margaret', text: "This is what PLM is about - closing the loop." },
    { characterId: 'margaret', text: "Not just making changes, but making sure they actually happen." },
    { characterId: 'alex', text: "All verification steps complete. The change is implemented." },
    { characterId: 'margaret', text: "*checks phone* Oh no. Jordan wants to meet. Tomorrow." },
    { characterId: 'you', text: "What happened?" },
    { characterId: 'margaret', text: "They're meeting with Vance Aerospace tomorrow." }
  ],

  // Act 4 - Mission 4_1
  configure_helicopter: [
    { characterId: 'margaret', text: "We did it! Now the real work begins." },
    { characterId: 'margaret', text: "We need to configure the helicopter for HeliCare's requirements." },
    { characterId: 'devon', text: "Finally, something I can work with!" },
    { characterId: 'rosa', text: "Let's get this built. I've been ready for months." },
    { characterId: 'tom', text: "Just make sure the configurations work with our inventory." }
  ],

  // Act 4 - Mission 4_5
  release_config: [
    { characterId: 'jordan', text: "This looks professional. I'm impressed." },
    { characterId: 'jordan', text: "You've earned your promotion. See you at the helicopter unveiling." },
    { characterId: 'margaret', text: "You did it. You actually did it." },
    { characterId: 'devon', text: "Not bad for someone from 'the system.'" },
    { characterId: 'rosa', text: "Welcome to the team. Properly, this time." },
    { characterId: 'tom', text: "Maybe AI won't replace us after all." }
  ]
}

export const getDialogue = (key: string): DialogueEntry[] => {
  return DIALOGUE[key] || []
}

export const getCharacter = (id: string): Character | undefined => {
  return CHARACTERS[id]
}

export const getAchievement = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS[id]
}
