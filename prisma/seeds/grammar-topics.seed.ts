/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedGrammarTopics() {
  console.log('Seeding Grammar Topics...');
  const grammarTopics = await prisma.grammarTopic.createMany({
    data: [
      // A1 Verbs & tenses
      {
        name: "Present Simple of 'Be'",
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          "Master the present simple form of 'be' to describe states and facts in English.",
      },
      {
        name: 'There Is/Are',
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          "Describe existence in the present clearly using 'there is' and 'there are'.",
      },
      {
        name: 'Present Simple',
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          'Form and use the present simple tense accurately to talk about habits and facts.',
      },
      {
        name: 'Present Continuous',
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          'Describe actions happening now and in the near future using the present continuous tense.',
      },
      {
        name: "Past Simple of 'Be'",
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          "Master the past simple form of 'be' to talk about past states and situations in English.",
      },
      {
        name: 'Past Simple for Regular Verbs',
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          'Learn to form and correctly use the past simple tense with regular verbs for past actions.',
      },
      {
        name: 'Past Simple for Irregular Verbs',
        cefrLevel: 'A1',
        category: 'VerbsAndTenses',
        description:
          'Learn to form and correctly use the past simple tense with irregular verbs for past actions.',
      },

      // A1 Clauses & questions
      {
        name: 'Questions - Closed',
        cefrLevel: 'A1',
        category: 'ClausesAndQuestions',
        description:
          'Formulate and answer closed questions (yes/no questions) in English confidently.',
      },
      {
        name: 'Questions - Open',
        cefrLevel: 'A1',
        category: 'ClausesAndQuestions',
        description:
          'Formulate and answer open questions (wh- questions) to gather information in English.',
      },
      {
        name: 'Because Clauses',
        cefrLevel: 'A1',
        category: 'ClausesAndQuestions',
        description:
          "Express reasons and explanations clearly using 'because' clauses.",
      },

      // A1 Modal verbs
      {
        name: 'Would Like',
        cefrLevel: 'A1',
        category: 'ModalVerbs',
        description:
          "Make polite requests and express desires using 'would like' effectively.",
      },
      {
        name: "Ability - Can/Can't/Could/Couldn't",
        cefrLevel: 'A1',
        category: 'ModalVerbs',
        description:
          "Express present and past abilities and inabilities using 'can', 'can't', 'could', and 'couldn't'.",
      },

      // A1 Nonfinite verbs
      {
        name: 'Like/Hate/Love + Gerund',
        cefrLevel: 'A1',
        category: 'NonfiniteVerbs',
        description:
          "Express preferences and feelings using gerunds after verbs like 'like', 'hate', and 'love'.",
      },

      // A1 Nouns
      {
        name: 'Subject & Object Pronouns',
        cefrLevel: 'A1',
        category: 'Nouns',
        description:
          'Use subject and object pronouns correctly in sentences to avoid repetition and ensure clarity.',
      },
      {
        name: 'Demonstrative Pronouns - This/That/These/Those',
        cefrLevel: 'A1',
        category: 'Nouns',
        description:
          "Point to specific things and people effectively using demonstrative pronouns 'this', 'that', 'these', 'those'.",
      },
      {
        name: "Possessive Case - 'S",
        cefrLevel: 'A1',
        category: 'Nouns',
        description:
          "Show ownership and possession clearly using the possessive 's.",
      },
      {
        name: 'Irregular Plural Nouns',
        cefrLevel: 'A1',
        category: 'Nouns',
        description:
          'Identify and use common irregular plural nouns correctly in your speech and writing.',
      },
      {
        name: 'How Much/Many + Noun',
        cefrLevel: 'A1',
        category: 'Nouns',
        description:
          "Ask about quantities correctly using 'how much' with uncountable nouns and 'how many' with countable nouns.",
      },

      // A1 Adjectives
      {
        name: 'Demonstrative Adjectives - This/That/These/Those',
        cefrLevel: 'A1',
        category: 'Adjectives',
        description:
          "Describe nouns effectively using demonstrative adjectives 'this', 'that', 'these', 'those' to indicate proximity and number.",
      },
      {
        name: "Adjectives as Complements of 'Be'",
        cefrLevel: 'A1',
        category: 'Adjectives',
        description:
          "Use adjectives confidently as complements after the verb 'be' to describe subjects.",
      },
      {
        name: 'Adjectives Before Nouns',
        cefrLevel: 'A1',
        category: 'Adjectives',
        description:
          'Apply the typical position of adjectives before nouns to create natural-sounding English phrases.',
      },
      {
        name: 'Possessive Adjectives',
        cefrLevel: 'A1',
        category: 'Adjectives',
        description:
          'Use possessive adjectives (my, your, his, her, its, our, their) to show possession and relationships.',
      },

      // A1 Adverbs
      {
        name: 'Adverbs of Time & Indefinite Frequency',
        cefrLevel: 'A1',
        category: 'Adverbs',
        description:
          'Understand and use adverbs of time and indefinite frequency to specify when and how often actions occur.',
      },
      {
        name: 'Adverbs of Frequency',
        cefrLevel: 'A1',
        category: 'Adverbs',
        description:
          'Use adverbs of frequency (always, often, sometimes, etc.) accurately to describe how often actions happen.',
      },
      {
        name: 'Adverbs of Degree - Very/Really/Too',
        cefrLevel: 'A1',
        category: 'Adverbs',
        description:
          "Modify adjectives and adverbs effectively with adverbs of degree like 'very', 'really', and 'too'.",
      },

      // A1 Other parts of speech
      {
        name: 'Parts of Speech',
        cefrLevel: 'A1',
        category: 'OtherPartsOfSpeech',
        description:
          'Gain a basic understanding of the different parts of speech in English grammar and their roles.',
      },
      {
        name: 'Coordinating Conjunctions',
        cefrLevel: 'A1',
        category: 'OtherPartsOfSpeech',
        description:
          'Join words and phrases smoothly using coordinating conjunctions (and, but, or).',
      },
      {
        name: 'Indefinite Article - A/An',
        cefrLevel: 'A1',
        category: 'OtherPartsOfSpeech',
        description:
          "Choose between the indefinite articles 'a' and 'an' correctly based on pronunciation rules.",
      },
      {
        name: 'Definite Article - The',
        cefrLevel: 'A1',
        category: 'OtherPartsOfSpeech',
        description:
          "Apply the definite article 'the' appropriately in various contexts to specify nouns.",
      },
      {
        name: 'Prepositions of Time',
        cefrLevel: 'A1',
        category: 'OtherPartsOfSpeech',
        description:
          'Use common prepositions of time (in, on, at) accurately to indicate when events happen.',
      },
      {
        name: 'Prepositions of Place',
        cefrLevel: 'A1',
        category: 'OtherPartsOfSpeech',
        description:
          'Use common prepositions of place (in, on, at, under, next to, etc.) to describe locations precisely.',
      },

      // A2 Verbs & tenses
      {
        name: 'Past Continuous',
        cefrLevel: 'A2',
        category: 'VerbsAndTenses',
        description:
          'Understand and use the past continuous tense to describe ongoing actions in the past.',
      },
      {
        name: 'Future - Will vs Going To',
        cefrLevel: 'A2',
        category: 'VerbsAndTenses',
        description:
          "Distinguish and use 'will' and 'going to' to express future intentions, predictions, and plans.",
      },
      {
        name: 'Future - Present Tenses for the Future',
        cefrLevel: 'A2',
        category: 'VerbsAndTenses',
        description:
          'Use present tenses (present simple and present continuous) to talk about scheduled and arranged future events.',
      },
      {
        name: 'Present Perfect',
        cefrLevel: 'A2',
        category: 'VerbsAndTenses',
        description:
          'Learn to form and use the present perfect tense to describe experiences, changes, and unfinished actions with present relevance.',
      },
      {
        name: 'Imperative',
        cefrLevel: 'A2',
        category: 'VerbsAndTenses',
        description:
          'Give commands, instructions, and make requests using the imperative form.',
      },
      {
        name: 'Stative Verbs',
        cefrLevel: 'A2',
        category: 'VerbsAndTenses',
        description:
          'Identify and understand stative verbs that describe states rather than actions and are not typically used in continuous tenses.',
      },

      // A2 Clauses & questions
      {
        name: 'Conditionals - Zero',
        cefrLevel: 'A2',
        category: 'ClausesAndQuestions',
        description:
          'Form and use zero conditional sentences to talk about general truths and real situations.',
      },
      {
        name: 'Conditionals - 1st',
        cefrLevel: 'A2',
        category: 'ClausesAndQuestions',
        description:
          'Form and use first conditional sentences to talk about possible future events and their consequences.',
      },
      {
        name: 'Adverb Clauses of Time - When/While',
        cefrLevel: 'A2',
        category: 'ClausesAndQuestions',
        description:
          "Use adverb clauses of time with 'when' and 'while' to indicate the timing of actions and events.",
      },
      {
        name: 'Questions - Subject',
        cefrLevel: 'A2',
        category: 'ClausesAndQuestions',
        description:
          'Formulate subject questions to ask about the subject of a verb, especially when the subject is unknown.',
      },

      // A2 Modal verbs
      {
        name: 'Ability - Be Able To',
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          "Use 'be able to' as an alternative to 'can' and 'could' to express ability, especially in future and perfect tenses.",
      },
      {
        name: 'Advice - Should',
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description: "Give and ask for advice using the modal verb 'should'.",
      },
      {
        name: 'Possibility - Might/May/Could',
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          "Express possibility and uncertainty using modal verbs 'might', 'may', and 'could'.",
      },
      {
        name: "Obligation & Prohibition - Must/Have To/Don't Have To",
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          "Express obligation and prohibition using 'must', 'have to', and 'don't have to' to talk about rules and necessities.",
      },
      {
        name: 'Requests - Can/Could/Will/Would',
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          "Make requests in different levels of formality using 'can', 'could', 'will', and 'would'.",
      },
      {
        name: 'Imagined Situations - Would',
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          "Talk about hypothetical and imagined situations using 'would'.",
      },
      {
        name: "Permission - Can/Can't",
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description: "Ask for and give permission using 'can' and 'can't'.",
      },
      {
        name: "Suggestion - Could/Let's/Shall",
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          "Make suggestions using 'could', 'let's', and 'shall' to propose actions.",
      },
      {
        name: 'General Truths & Facts',
        cefrLevel: 'A2',
        category: 'ModalVerbs',
        description:
          'Express general truths and facts using modal verbs in a variety of contexts.', //  Возможно, эта тема лучше подходит для Present Simple, нужно проверить и уточнить, если есть расхождения с CEFR A2
      },

      // A2 Nonfinite verbs
      {
        name: 'Want/Need + To-Infinitive',
        cefrLevel: 'A2',
        category: 'NonfiniteVerbs',
        description:
          "Express desires and necessities using 'want' and 'need' followed by the to-infinitive form of verbs.",
      },

      // A2 Nouns
      {
        name: 'Countable & Uncountable Nouns',
        cefrLevel: 'A2',
        category: 'Nouns',
        description:
          'Distinguish between countable and uncountable nouns and use them correctly in sentences.',
      },
      {
        name: 'Someone/Anyone/No One/Everyone',
        cefrLevel: 'A2',
        category: 'Nouns',
        description:
          "Use indefinite pronouns 'someone', 'anyone', 'no one', and 'everyone' to refer to people in general.",
      },
      {
        name: 'Something/Anything/Nothing/Everything',
        cefrLevel: 'A2',
        category: 'Nouns',
        description:
          "Use indefinite pronouns 'something', 'anything', 'nothing', and 'everything' to refer to things in general.",
      },

      // A2 Adjectives
      {
        name: 'Adjective Order',
        cefrLevel: 'A2',
        category: 'Adjectives',
        description:
          'Understand and apply the typical order of adjectives before nouns in English phrases.',
      },
      {
        name: 'Comparatives & Superlatives',
        cefrLevel: 'A2',
        category: 'Adjectives',
        description:
          'Form and use comparative and superlative adjectives to compare qualities and indicate extremes.',
      },
      {
        name: 'Comparatives for Equality',
        cefrLevel: 'A2',
        category: 'Adjectives',
        description:
          "Express equality in comparisons using structures like 'as...as' with adjectives.",
      },
      {
        name: 'Expressing Similarity - Same/Like/Alike',
        cefrLevel: 'A2',
        category: 'Adjectives',
        description:
          "Describe similarities and resemblances using 'same', 'like', and 'alike' correctly.",
      },
      {
        name: 'Irregular Adjectives',
        cefrLevel: 'A2',
        category: 'Adjectives',
        description:
          'Learn to recognize and use common irregular adjectives (like good/better/best, bad/worse/worst) correctly in comparisons.',
      },

      // A2 Adverbs
      {
        name: 'Adverb Placement',
        cefrLevel: 'A2',
        category: 'Adverbs',
        description:
          'Understand typical adverb placement in sentences to modify verbs, adjectives, or other adverbs effectively.',
      },
      {
        name: 'Adverbs of Degree & Intensity',
        cefrLevel: 'A2',
        category: 'Adverbs',
        description:
          'Use adverbs of degree and intensity to strengthen or weaken the meaning of adjectives, verbs, and other adverbs.',
      },
      {
        name: 'Adverbs of Manner',
        cefrLevel: 'A2',
        category: 'Adverbs',
        description:
          'Describe how actions are performed using adverbs of manner.',
      },
      {
        name: 'Comparative Adverbs',
        cefrLevel: 'A2',
        category: 'Adverbs',
        description:
          'Form and use comparative adverbs to compare how actions are performed.',
      },

      // A2 Other parts of speech
      {
        name: 'No Article',
        cefrLevel: 'A2',
        category: 'OtherPartsOfSpeech',
        description:
          'Understand when to omit articles (zero article) with plural and uncountable nouns in general statements.',
      },
      {
        name: 'Some/Any/None/Every/All Quantifiers',
        cefrLevel: 'A2',
        category: 'OtherPartsOfSpeech',
        description:
          "Use quantifiers 'some', 'any', 'none', 'every', and 'all' to express quantity and number of nouns.",
      },

      // B1 Verbs & tenses
      {
        name: 'Subject-verb agreement',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Ensure verbs agree with their subjects in number and person for grammatically correct sentences.',
      },
      {
        name: 'Past habits',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Describe actions that were habitual or repeated in the past using appropriate verb forms.',
      },
      {
        name: 'Used to / be used to / get used to',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          "Differentiate and use 'used to', 'be used to', and 'get used to' to talk about past habits, present states of being accustomed, and the process of adaptation.",
      },
      {
        name: 'Present perfect continuous',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Form and use the present perfect continuous tense to emphasize the duration of actions that started in the past and continue to the present.',
      },
      {
        name: 'Past perfect',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Form and use the past perfect tense to describe actions that happened before a specific point in the past.',
      },
      {
        name: 'Past perfect continuous',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Form and use the past perfect continuous tense to emphasize the duration of actions that were ongoing before a specific point in the past.',
      },
      {
        name: 'Passive voice - simple tenses',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Understand and construct passive voice sentences in simple tenses (present simple, past simple, future simple) to shift focus from the actor to the action.',
      },
      {
        name: 'Phrasal verbs',
        cefrLevel: 'B1',
        category: 'VerbsAndTenses',
        description:
          'Expand your vocabulary and comprehension by learning and using common phrasal verbs in context.',
      },

      // B1 Clauses & questions
      {
        name: 'Relative clauses',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          'Use relative clauses to add extra information to nouns and combine sentences effectively.',
      },
      {
        name: 'Adverb clauses of time',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          "Use adverb clauses of time to specify when actions happen, using conjunctions like 'when', 'while', 'as soon as', etc.",
      },
      {
        name: 'Adverb clauses of reason/ purpose/ contrast',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          "Express reasons, purposes, and contrasts using adverb clauses with conjunctions like 'because', 'although', 'in order to', etc.",
      },
      {
        name: 'Conditionals - 2nd',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          'Form and use second conditional sentences to talk about hypothetical and unreal situations in the present or future.',
      },
      {
        name: 'Conditionals - 3rd',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          'Form and use third conditional sentences to talk about unreal past situations and their imagined consequences.',
      },
      {
        name: 'Reported speech - say & tell',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          "Master reported speech using 'say' and 'tell' for statements, focusing on changes in tense, pronouns, and time expressions.",
      },
      {
        name: "Noun clauses - 'that' vs 'WH' clauses",
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          "Distinguish between 'that'-clauses and 'WH'-clauses and use noun clauses effectively as subjects, objects, or complements in sentences.",
      },
      {
        name: 'Questions - tag',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          'Form and use tag questions to confirm information or encourage agreement in conversation.',
      },
      {
        name: 'Questions - indirect / embedded',
        cefrLevel: 'B1',
        category: 'ClausesAndQuestions',
        description:
          'Form and use indirect or embedded questions to make questions more polite or to report them as part of a statement.',
      },

      // B1 Modal verbs
      {
        name: 'Permission & requests - might / may',
        cefrLevel: 'B1',
        category: 'ModalVerbs',
        description:
          "Use 'might' and 'may' to express polite requests and ask for permission in formal and less direct ways.",
      },
      {
        name: 'Possibility & deduction (in the present)',
        cefrLevel: 'B1',
        category: 'ModalVerbs',
        description:
          'Use modal verbs to express varying degrees of possibility and make deductions about present situations based on evidence.',
      },
      {
        name: 'Suggestion expressions',
        cefrLevel: 'B1',
        category: 'ModalVerbs',
        description:
          'Learn a range of expressions including modal verbs to make suggestions and recommendations effectively.',
      },

      // B1 Nonfinite verbs
      {
        name: 'Gerunds & infinitives as subjects',
        cefrLevel: 'B1',
        category: 'NonfiniteVerbs',
        description:
          'Use gerunds and infinitives as subjects of sentences to introduce actions or states as the topic of discussion.',
      },
      {
        name: 'Gerunds & infinitives as objects',
        cefrLevel: 'B1',
        category: 'NonfiniteVerbs',
        description:
          'Use gerunds and infinitives as objects of verbs, understanding which verbs are followed by gerunds, infinitives, or both.',
      },
      {
        name: 'Gerunds & infinitives as objects (different meanings)',
        cefrLevel: 'B1',
        category: 'NonfiniteVerbs',
        description:
          'Explore verbs that can be followed by either gerunds or infinitives but with a change in meaning, and learn to distinguish these nuances.',
      },
      {
        name: 'Gerunds & infinitives for purpose',
        cefrLevel: 'B1',
        category: 'NonfiniteVerbs',
        description:
          "Use infinitives of purpose (e.g., 'to learn') and gerunds in certain constructions to express the purpose or reason for an action.",
      },

      // B1 Nouns
      {
        name: 'Reflexive & reciprocal pronouns',
        cefrLevel: 'B1',
        category: 'Nouns',
        description:
          'Master reflexive pronouns (myself, yourself, etc.) for actions directed back to the subject and reciprocal pronouns (each other, one another) for actions between two or more people.',
      },

      // B1 Adjectives
      {
        name: "Adjectives ending in '-ing' and '-ed'",
        cefrLevel: 'B1',
        category: 'Adjectives',
        description:
          "Distinguish and use adjectives ending in '-ing' (describing what causes a feeling) and '-ed' (describing how someone feels).",
      },

      // B1 Adverbs
      {
        name: 'Conjunctive adverbs',
        cefrLevel: 'B1',
        category: 'Adverbs',
        description:
          'Use conjunctive adverbs (e.g., however, therefore, moreover) to connect independent clauses and show relationships between ideas.',
      },
      {
        name: 'Adverbs of time for perfect tenses',
        cefrLevel: 'B1',
        category: 'Adverbs',
        description:
          "Utilize adverbs of time appropriately with perfect tenses to specify when an action occurred or for how long, such as 'already', 'yet', 'still', 'since', 'for'.",
      },

      // B1 Other parts of speech
      {
        name: 'Dependent prepositions',
        cefrLevel: 'B1',
        category: 'OtherPartsOfSpeech',
        description:
          "Learn and correctly use dependent prepositions that are fixed with certain verbs, nouns, and adjectives to complete their meaning (e.g., 'depend on', 'interested in', 'responsible for').",
      },

      // B2 Verbs & tenses
      {
        name: "Future time expressions with 'be'",
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          "Explore advanced ways to talk about the future using different forms of 'be' with time expressions, focusing on nuance and context.",
      },
      {
        name: 'Future in the past',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          "Understand and use 'future in the past' tenses to talk about past intentions, predictions, or arrangements that were set in the past but looked forward to a future time from that past perspective.",
      },
      {
        name: 'Future continuous',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Master the future continuous tense to describe actions that will be in progress at a specific time in the future.',
      },
      {
        name: 'Future perfect',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Learn to form and use the future perfect tense to describe actions that will be completed before a specific time in the future.',
      },
      {
        name: 'Future perfect continuous',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Understand and utilize the future perfect continuous tense to emphasize the duration of actions that will be ongoing up to a specific point in the future.',
      },
      {
        name: 'Passive voice - other tenses & modals',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Extend your understanding of passive voice to include more complex tenses (beyond simple tenses) and modal verbs, allowing for sophisticated passive constructions.',
      },
      {
        name: 'Passive voice - gerunds & infinitives',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Learn to form passive gerunds and infinitives, enabling you to use passive voice in more nuanced grammatical structures.',
      },
      {
        name: 'Causative verbs',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Master causative verbs (have, get, make, let, etc.) to express arrangements for someone else to do something or to cause something to be done.',
      },
      {
        name: 'Verbs of the senses',
        cefrLevel: 'B2',
        category: 'VerbsAndTenses',
        description:
          'Explore verbs of the senses (look, sound, smell, taste, feel) and how they are used with adjectives and adverbs to describe sensory experiences.',
      },

      // B2 Clauses & questions
      {
        name: 'Relative clauses - possessive (whose)',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          "Use possessive relative clauses with 'whose' to show possession and further describe nouns in complex sentences.",
      },
      {
        name: 'Relative clauses - relative adverbs',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Utilize relative adverbs (where, when, why) to introduce relative clauses that modify nouns by providing adverbial information about place, time, or reason.',
      },
      {
        name: 'Relative clauses - prepositions',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Construct relative clauses ending with prepositions and understand when and how to move prepositions to the beginning of relative clauses for formality.',
      },
      {
        name: 'Relative clauses - sentential',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Learn about sentential relative clauses which modify a whole clause or sentence, often used in more formal writing.',
      },
      {
        name: 'Relative clauses - reduced',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Simplify relative clauses by using reduced forms (e.g., participle clauses and infinitive clauses) to make sentences more concise.',
      },
      {
        name: "Conditionals - 'if' alternatives",
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          "Explore alternatives to 'if' in conditional sentences, such as 'unless', 'provided that', 'as long as', to add variety and precision to conditional expressions.",
      },
      {
        name: "Conditionals - 'would' alternatives",
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          "Discover alternatives to 'would' in conditional sentences, such as 'could', 'might', to express different degrees of possibility and hypothetical outcomes.",
      },
      {
        name: 'Conditionals - mixed',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Understand and form mixed conditional sentences, combining different types of conditional clauses to talk about complex time relationships and hypothetical scenarios.',
      },
      {
        name: 'Participle clauses',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Use participle clauses (present, past, and perfect participles) to shorten sentences and describe simultaneous actions, reasons, or results in a more concise way.',
      },
      {
        name: 'Reported speech - questions / requests / commands',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Learn to report questions, requests, and commands in indirect speech, focusing on the necessary changes in verb forms, pronouns, and question word order.',
      },
      {
        name: 'Questions - past for politeness',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Use past tenses in questions to make requests and inquiries more polite and less direct.',
      },
      {
        name: 'Questions - negative (including uncontracted)',
        cefrLevel: 'B2',
        category: 'ClausesAndQuestions',
        description:
          'Master negative questions, including both contracted and uncontracted forms, to express surprise, seek confirmation, or make polite suggestions.',
      },

      // B2 Modal verbs
      {
        name: 'Certainty expressions',
        cefrLevel: 'B2',
        category: 'ModalVerbs',
        description:
          'Explore modal verbs and expressions to convey different levels of certainty and conviction.',
      },
      {
        name: 'Obligation expressions',
        cefrLevel: 'B2',
        category: 'ModalVerbs',
        description:
          'Utilize a wider range of modal verbs and expressions to talk about obligations, duties, and necessities with greater nuance.',
      },
      {
        name: 'Possibility & deduction (in the past)',
        cefrLevel: 'B2',
        category: 'ModalVerbs',
        description:
          'Extend your ability to express possibility and make deductions to past events using appropriate modal verbs and structures.',
      },
      {
        name: 'Regret & unreality',
        cefrLevel: 'B2',
        category: 'ModalVerbs',
        description:
          'Use modal verbs to express regret about past actions or situations and to talk about unreal or hypothetical scenarios.',
      },
      {
        name: 'Ideal situations',
        cefrLevel: 'B2',
        category: 'ModalVerbs',
        description:
          'Employ modal verbs to describe ideal or preferred situations and to express wishes about the present and future.',
      },
      {
        name: 'Expectations - should / might / may + be + continuous',
        cefrLevel: 'B2',
        category: 'ModalVerbs',
        description:
          "Use 'should', 'might', and 'may' with the continuous infinitive ('be + -ing') to talk about expectations and ongoing actions at the moment of expectation.",
      },

      // B2 Verbs & tenses (продолжение)
      {
        name: 'To-infinitives as adverbs & adjectives',
        cefrLevel: 'B2',
        category: 'NonfiniteVerbs',
        description:
          'Explore the use of to-infinitives as adverbs to modify verbs and adjectives, adding detail about purpose, result, or manner.',
      },

      // B2 Other parts of speech
      {
        name: 'Emphasis - do / did',
        cefrLevel: 'B2',
        category: 'OtherPartsOfSpeech',
        description:
          "Use auxiliary verbs 'do' and 'did' for emphasis in affirmative sentences, commands, and requests to strengthen the force of a verb.",
      },

      // C1+ Verbs & tenses
      {
        name: 'Subjunctive mood',
        cefrLevel: 'C1Plus',
        category: 'VerbsAndTenses',
        description:
          'Master the subjunctive mood to express wishes, hypotheses, suggestions, and demands in formal contexts.',
      },
      {
        name: "Imperative – 3rd person (let) / don't you / pointing",
        cefrLevel: 'C1Plus',
        category: 'VerbsAndTenses',
        description:
          "Explore sophisticated imperative forms including 3rd person imperatives using 'let', imperatives with 'don't you', and imperatives used for pointing out or criticizing.",
      },

      // C1+ Clauses & questions
      {
        name: 'Cleft sentences',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Utilize cleft sentences (e.g., 'It is/was…that…', 'What…is/was…') to emphasize specific parts of a sentence and create focus.",
      },
      {
        name: 'Conditionals – imperatives',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          'Combine conditional clauses with imperatives to give advice or instructions that are dependent on certain conditions.',
      },
      {
        name: 'Conditionals – reduced & inverted',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Use reduced conditional clauses to make sentences more concise and employ inverted conditionals for formal or literary effect, omitting 'if'.",
      },
      {
        name: 'Inversion – structure',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          'Understand and construct inverted sentence structures for emphasis, focusing on subject-verb inversion after certain adverbials.',
      },
      {
        name: 'Inversion – negative adverbials',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Master inversion with negative adverbials (e.g., 'never', 'rarely', 'hardly ever') at the beginning of sentences for stylistic effect.",
      },
      {
        name: 'Inversion – restrictive adverbials',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Employ inversion with restrictive adverbials (e.g., 'only then', 'not until', 'scarcely') to emphasize conditions or limitations.",
      },
      {
        name: 'Relative clauses some of which/many of which',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Use relative clauses with quantifiers like 'some of which' and 'many of which' to refer to a part of a larger group within relative clauses.",
      },
      {
        name: 'Adverb clauses for focus – whatever / wherever / however',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Construct adverb clauses using 'whatever', 'wherever', and 'however' to add emphasis and create broad, inclusive conditions or results.",
      },
      {
        name: 'Nonfinite clauses (advanced)',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          'Explore advanced nonfinite clauses (infinitive, gerund, participle clauses) for sentence reduction and stylistic variation in complex sentences.',
      },
      {
        name: 'Passive voice clauses for sentence focus',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          'Strategically use passive voice clauses to shift the focus in sentences and emphasize the action or recipient rather than the actor, particularly for formal and impersonal styles.',
      },
      {
        name: 'Wide range of reporting verbs - academic use',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Expand your repertoire of reporting verbs beyond 'say' and 'tell' to include verbs like 'assert', 'contend', 'postulate', especially in academic writing and formal speech.",
      },
      {
        name: 'Emphasis expressions',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          "Employ various expressions (e.g., 'What…is/was…', 'The thing is…') to add emphasis to certain parts of your sentences and make your communication more impactful.",
      },
      {
        name: 'Fronting for emphasis',
        cefrLevel: 'C1Plus',
        category: 'ClausesAndQuestions',
        description:
          'Use fronting techniques to place sentence elements (objects, complements, adverbials) at the beginning of sentences for emphasis and stylistic variation.',
      },

      // C1+ Modal verbs
      {
        name: 'Dare',
        cefrLevel: 'C1Plus',
        category: 'ModalVerbs',
        description:
          "Master the nuanced uses of 'dare' as a modal verb and a main verb, particularly in negative and interrogative forms, to express courage or impudence.",
      },
      {
        name: 'Expressions to give opinions',
        cefrLevel: 'C1Plus',
        category: 'ModalVerbs',
        description:
          'Use a wide range of expressions with modal verbs to give opinions with varying degrees of certainty, politeness, and formality.',
      },
      {
        name: 'Criticism & disapproval',
        cefrLevel: 'C1Plus',
        category: 'ModalVerbs',
        description:
          'Employ modal verbs and related expressions to express criticism and disapproval in nuanced and context-appropriate ways.',
      },

      // C1+ Adjectives
      {
        name: 'Comparatives & superlatives with intensifiers',
        cefrLevel: 'C1Plus',
        category: 'Adjectives',
        description:
          "Enhance comparative and superlative adjectives with intensifiers (e.g., 'far', 'much', 'significantly') to express stronger degrees of comparison.",
      },
      {
        name: 'Superlatives with postmodifiers',
        cefrLevel: 'C1Plus',
        category: 'Adjectives',
        description:
          'Use postmodifiers (phrases or clauses after superlatives) to provide additional context and specificity to superlative descriptions.',
      },
      {
        name: 'Compound adjectives',
        cefrLevel: 'C1Plus',
        category: 'Adjectives',
        description:
          "Form and use compound adjectives (e.g., 'well-known', 'state-of-the-art', 'thought-provoking') to create concise and descriptive phrases.",
      },
      {
        name: 'Adjectives after nouns',
        cefrLevel: 'C1Plus',
        category: 'Adjectives',
        description:
          "Recognize and use adjectives placed after nouns in specific constructions for stylistic or grammatical reasons (e.g., 'something important', adjectives with linking verbs).",
      },

      // C1+ Adverbs
      {
        name: 'Adverbs with prepositional phrases',
        cefrLevel: 'C1Plus',
        category: 'Adverbs',
        description:
          'Use adverbs effectively with prepositional phrases to add detailed and nuanced adverbial modification to verbs and clauses.',
      },
      {
        name: 'Extreme adverbs to modify non-gradable adjectives',
        cefrLevel: 'C1Plus',
        category: 'Adverbs',
        description:
          "Utilize extreme adverbs (e.g., 'absolutely', 'utterly', 'completely') specifically to modify non-gradable adjectives (adjectives that cannot be graded or used in comparative/superlative forms).",
      },

      // C1+ Other parts of speech
      {
        name: 'Conjunctions and yet / in that / either...or / neither...nor',
        cefrLevel: 'C1Plus',
        category: 'OtherPartsOfSpeech',
        description:
          "Master the use of advanced conjunctions like 'and yet', 'in that', 'either...or', and 'neither...nor' to express complex relationships between clauses and ideas.",
      },
      {
        name: 'Distancing',
        cefrLevel: 'C1Plus',
        category: 'OtherPartsOfSpeech',
        description:
          'Employ linguistic devices for distancing (e.g., passive voice, tentative language) to create objectivity, politeness, or formality in communication.',
      },
      {
        name: 'Discourse markers',
        cefrLevel: 'C1Plus',
        category: 'OtherPartsOfSpeech',
        description:
          "Effectively use a wide range of discourse markers to manage conversations, structure text, and signal relationships between ideas (e.g., 'furthermore', 'in conclusion', 'anyway').",
      },
      {
        name: 'Hedging',
        cefrLevel: 'C1Plus',
        category: 'OtherPartsOfSpeech',
        description:
          "Use hedging language (e.g., 'might', 'could', 'sort of', 'to some extent') to express uncertainty, politeness, or to soften statements, especially in academic and professional contexts.",
      },
      {
        name: 'Ellipsis & substitution',
        cefrLevel: 'C1Plus',
        category: 'OtherPartsOfSpeech',
        description:
          "Employ ellipsis (omission of words) and substitution (using words like 'so', 'do', 'one') to avoid repetition, make speech more natural, and create concise and efficient communication.",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${grammarTopics.count} Grammar Topics`);
}
